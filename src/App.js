import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Summary from "./components/Checkout/Summary";
import Home from "./components/Home";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import PDP from "./components/PDP";
import PLP from "./components/PLP";

function App() {
  return (
    <>
      <Router>
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={SignUp} />

          <Route exact path="/products" component={PLP} />
          <Route exact path="/product/:id" component={PDP} />

          <Route exact path="/cart" component={Cart} />

          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/checkout/summary" component={Summary} />
        </Switch>

        <Footer />
      </Router>
    </>
  );
}

export default App;
