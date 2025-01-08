 // If you want to mock APIs with MSW (Mock Service Worker)
import { QueryClient, QueryClientProvider } from 'react-query';
import '@testing-library/jest-dom'; // Import jest-dom to enable additional matchers

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Global setup for the tests
globalThis.queryClient = queryClient;
