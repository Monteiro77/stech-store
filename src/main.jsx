import { StrictMode } from 'react'
import Home from "./pages/Home/Home.jsx";
import Products from "./pages/Products/Products.jsx";
import PageNotFound from "./pages/PageNotFound/PageNotFound.jsx";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductDetails from './pages/ProductDetails/ProductDetails.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/produtos', element: <Products /> },
      { path: '/produto/:id', element: <ProductDetails /> },
      { path: '*', element: <PageNotFound /> }
    ]

  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

