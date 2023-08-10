import React from 'react';

import { ThemeProvider } from '~theme';
import OnlineStatusProvider from '~utils/OnlineStatusProvider';
import CrashMessage from '~molecules/crashMessage/CrashMessage';
import ErrorBoundary from '~organisms/errorBoundary/errorBoundary';
import AppRoutes from '~routes/AppRouter';
import { CartProvider } from '~view/contexts/cart/CartProvider';

const ViewEntrypoint: React.FunctionComponent = () => {
	return (
		<OnlineStatusProvider>
			<ThemeProvider>
				<ErrorBoundary errorScreen={<CrashMessage />}>
					<CartProvider>
						<AppRoutes />
					</CartProvider>
				</ErrorBoundary>
			</ThemeProvider>
		</OnlineStatusProvider>
	);
};

export default ViewEntrypoint;
