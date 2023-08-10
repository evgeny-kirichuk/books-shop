const { response } = require("express");
const { setCache } = require("../utils/cache");

const getBooks = async (req, res = response) => {
  const { stringToSearch } = req.query;

  let books = [];

  try {
    const booksResponse = await fetch(
      `https://www.googleapis.com/books/v1/volumes?maxResults=20&orderBy=relevance&maxAllowedMaturityRating=not-mature&q=${
        stringToSearch ?? ""
      }&key=${process.env.GOOGLE_BOOKS_API_KEY}`
    );

    if (!booksResponse.ok) {
      console.log(
        "error happend. we could use a custom error handler here",
        booksResponse.status
      );
      return res.status(422).json("Unable to fetch books");
    }

    const booksData = await booksResponse.json();

    // if we don't have books, we don't need to fetch the open lib details and we can return an empty array
    if (!booksData || booksData.totalItems === 0) {
      return res.status(200).json([]);
    }

    const rawBooks = booksData.items;
    books = normalizeBooks(rawBooks);
  } catch (err) {
    console.log("error happend. we could use a custom error handler here", err);
    return res.status(422).json("Unable to fetch books");
  }

  try {
    const isbns = books.reduce((acc, book) => {
      if (book.ISBN) {
        acc.push(book.ISBN);
      }
      return acc;
    }, []);

    const openLibDetailsResponse = await fetch(
      `https://openlibrary.org/api/books?bibkeys=${isbns.toString()}&jscmd=details&format=json`
    );

    if (!openLibDetailsResponse.ok) {
      console.log("error happend. we could use a custom error handler here");

      // if we can't fetch the open lib details, we still want to return the books
      setCache(req, books);
      return res.json(books);
    }

    const openLibDetails = await openLibDetailsResponse.json();

    if (openLibDetails) {
      const booksWithRevisions = books.map((book) => {
        const bookDetails = openLibDetails[book.ISBN];
        const bookRevision = bookDetails?.details.revision;

        if (bookRevision > 1) {
          return {
            ...book,
            revision: bookRevision,
          };
        }
        return book;
      });

      setCache(req, booksWithRevisions);
      return res.json(booksWithRevisions);
    }
  } catch (err) {
    console.log("error happend. we could use a custom error handler here", err);
  }

  // if we can't fetch the open lib details, we still want to return the books
  setCache(req, books);
  res.json(books);
};

const normalizeBooks = (rawBooks) => {
  return rawBooks.map((book) => ({
    id: book.id,
    title: book.volumeInfo.title,
    description: book.volumeInfo.description,
    image:
      book.volumeInfo.imageLinks?.thumbnail ||
      book.volumeInfo.imageLinks?.smallThumbnail,
    pages: book.volumeInfo.pageCount,
    price: book.saleInfo.retailPrice?.amount,
    currency: book.saleInfo.retailPrice?.currencyCode,
    ISBN: book.volumeInfo.industryIdentifiers?.find((identifier) =>
      identifier.type.startsWith("ISBN")
    )?.identifier,
  }));
};

module.exports = {
  getBooks,
};
