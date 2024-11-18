import "./App.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./screens/home";
import Product from "./screens/product";
import Cart from "./screens/cart";
import Category from "./screens/category";
import Categorym from "./screens/categorym";
import Admin from "./screens/admin";
import Login from "./screens/login";
import Reg from "./screens/reg";
import Account from "./screens/account";
import Foodcart from "./screens/foodcart";
import Search from "./screens/search";
import Confirm from "./screens/confirm";

import Forgetpass from "./screens/forgetpass";

import Privacy from "./screens/privacy_policy.js";
import Return from "./screens/return.js";

import UserInfo from "./screens/mobileAccount/info.js";
import DeliveryInfo from "./screens/mobileAccount/delivery.js";
import OngoingOrder from "./screens/mobileAccount/Onorder.js";
import Order from "./screens/mobileAccount/Order.js";
import ScrollToTop from "./gotoTop.js";




const originalFetch = window.fetch;

  window.fetch = async (url, options = {}) => {
      // Clone existing headers or create a new object if none exist
      const customHeaders = new Headers(options.headers || {});

      // Add the 'Admin-Key' from environment variables only if it's not already present
      if (!customHeaders.has('Admin-Key')) {
          customHeaders.set('Admin-Key', process.env.REACT_APP_ADMIN_KEY);
      }

      // Include the modified headers in the options
      const newOptions = {
          ...options,
          headers: customHeaders,
      };

      // Call the original fetch with updated options
      return originalFetch(url, newOptions);
  };

function App() {

  

  return (
    <Router>

      <ScrollToTop />
      <Route path="/userinfo">
        <UserInfo />
      </Route>
      <Route path="/deliveryinfo">
        <DeliveryInfo />
      </Route>
      <Route path="/ongoingorder">
        <OngoingOrder />
      </Route>
      <Route path="/order">
        <Order />
      </Route>
      <Route path="/confirm">
        <Confirm />
      </Route>

      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/product/:id">
        <Product />
      </Route>

      <Route path="/cart/">
        <Cart />
      </Route>

      <Route path="/login/">
        <Login />
      </Route>

      <Route path="/forgetpass/">
        <Forgetpass />
      </Route>

      <Route path="/reg/">
        <Reg />
      </Route>

      <Route path="/admin/">
        <Admin />
      </Route>

      <Route path="/search/">
        <Search />
      </Route>

      <Route path="/account/">
        <Account />
      </Route>

      <Route path="/foodcart/">
        <Foodcart />
      </Route>

      <Route path="/privacy_policy/">
        <Privacy />
      </Route>

      <Route path="/return/">
        <Return />
      </Route>

      <Route path="/category/:cate">
        <Category />
      </Route>

      <Route path="/categorym/">
        <Categorym />
      </Route>
    </Router>
  );
}

export default App;
