// import { StrictMode } from 'react';
import './styles/index.css';
import { createRoot } from 'react-dom/client';
// import App from './App.tsx';
import { ContextProvider } from '@context/index.tsx';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({ routeTree });

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.querySelector('#root')!).render(
  // <StrictMode>
  <ContextProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    {/* <App /> */}
  </ContextProvider>
  /* </StrictMode> */
);
