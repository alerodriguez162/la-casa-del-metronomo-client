import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import CartProvider from "./Context/CartContext/CartProvider";
import ProductsProvider from "./Context/ProductsContext/ProductsProvider";
import UsersProvider from "./Context/UsersContext/UsersProvider";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CartProvider>
        <ProductsProvider>
          <UsersProvider>
            <App />
          </UsersProvider>
        </ProductsProvider>
      </CartProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
