import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import Products from "./pages/Products";
import SignIn from "./pages/SignIn";
import Admin from "./pages/Admin";
import SignUp from "./pages/SignUp";
import AddProducts from "./pages/AddProducts";
import Moisturizers from "./pages/Moisturizers";
import Toners from "./pages/Toners";
import Cleansers from "./pages/Cleansers";
import Serums from "./pages/Serums";
import Suncreens from "./pages/Sunscreens";
import Cart from "./pages/Cart";
import AboutUs from "./pages/AboutUs";
import Better from "./pages/BetterForEarth";
import AdminLogin from "./pages/AdminLogin";
import Product from "./pages/Product";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import ProfileForm from "./pages/ProfileForm";
import FAQ from "./pages/FAQ";
import Experts from "./pages/Experts";
import Dermat from "./pages/Dermat";
import VideoCall from "./pages/VideoCall";
import store, { persistor } from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/admin/add-products",
    element: <AddProducts />,
  },
  {
    path: "/moisturizers",
    element: <Moisturizers />,
  },
  {
    path: "/toners",
    element: <Toners />,
  },
  {
    path: "/cleansers&mists",
    element: <Cleansers />,
  },
  {
    path: "/serums&essences",
    element: <Serums />,
  },
  {
    path: "/sunscreens",
    element: <Suncreens />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/betterforearth",
    element: <Better />,
  },
  {
    path: "/AdminLogin",
    element: <AdminLogin />,
  },
  {
    path: "/product/:itemNumber",
    element: <Product />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profileform",
    element: <ProfileForm />,
  },
  {
    path: "/faq",
    element: <FAQ />,
  },
  {
    path: "/experts",
    element: <Experts />,
  },
  {
    path: "/dermat/:callId",
    element: <Dermat />,
  },
  {
    path: "/video/:callId",
    element: <VideoCall />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
