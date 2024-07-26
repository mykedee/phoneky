import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "../src/App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import store from "./store";
import "../src/index.css";
import Dashboard from "./screens/AdminScreen/Dashboard";
import SuccessPage from "./screens/SuccessPage";
import ErrorPage from "./components/Errors/ErrorPage";
import DashErrorPage from "./components/Errors/DashErrorPage";
import Login from "./screens/Login";
import Checkout from "./screens/Checkout";
import CategoryList from "./screens/AdminScreen/CategoryList";
import ProductList from "./screens/AdminScreen/ProductList";
import FeaturedList from "./screens/AdminScreen/FeaturedList";
import AdminRoute from "./components/Layouts/AdminRoute";
import Home from "./screens/Home";
import ProductDetails from "./screens/ProductDetails";
import Products from "./screens/Products";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} errorElement={<ErrorPage />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/search/:keyword" element={<Products />} />
        <Route path="/search/:keyword/page/:pageNumber" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/success" element={<SuccessPage />} />

      <Route element={<AdminRoute />} errorElement={<DashErrorPage />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="/dashboard/products" element={<ProductList />} />
        <Route path="/dashboard/featured" element={<FeaturedList />} />
        <Route path="/dashboard/categories" element={<CategoryList />} />
      </Route>
    </>,
  ),
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer autoClose={4000} />
    </Provider>
  </HelmetProvider>,
);
