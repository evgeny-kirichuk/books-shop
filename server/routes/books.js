const { Router } = require("express");
const router = Router();
const { verifyCache } = require("../utils/cache");

const { getBooks } = require("../controllers/books");

router.get("/", verifyCache, getBooks);

module.exports = router;
