import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Output.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Welcome from './pages/welcome/index.tsx'
import { Movies } from './pages/movies/index.tsx'
import { Serials } from './pages/serials/index.tsx'
import { App } from './App.tsx'
import { Home } from './pages/home/index.tsx'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: 'home',
        element: <Home />,

      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "serials",
        element: <Serials />,
      },
    ],
  },
]);

export const Client = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={Client}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
