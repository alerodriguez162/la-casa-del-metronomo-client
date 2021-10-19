import { Route, Switch, withRouter } from "react-router-dom";
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
import UsersProvider from "./Context/UsersContext/UsersProvider";
import AdminRoute from "./Routes/AdminRoute";
import AuthRoute from "./Routes/AuthRoute";
import PrivateRoute from "./Routes/PrivatedRoute";

function App({ location }) {
  return (
    <>
      <UsersProvider>
        {location.pathname.includes("admin") || location.pathname.includes("login") ? null : <Header />}

        <Switch>
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={SignUp} />

          <Route exact path="/" component={Home} />

          <Route exact path="/products" component={PLP} />
          <Route exact path="/product/:id" component={PDP} />

          <PrivateRoute exact path="/cart" component={Cart} />

          <PrivateRoute exact path="/checkout" component={Checkout} />
          <PrivateRoute exact path="/checkout/summary" component={Summary} />

          <AdminRoute path="/admin" />

          {/* <Route
            path="/admin"
            render={(props) => {
              return (
                <>
                  <Admin>
                    <Route exact path={`${props.match.url}/users`} component={Users} />
                    <Route exact path={`${props.match.url}/categories`} component={Categories} />
                    <Route exact path={`${props.match.url}/products`} component={Products} />
                  </Admin>
                </>
              );
            }}
          /> */}
        </Switch>
        {location.pathname.includes("admin") || location.pathname.includes("login") ? null : <Footer />}
      </UsersProvider>
    </>
  );
}

export default withRouter(App);
