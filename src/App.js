import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ErrorPage from "./components/404";
import Admin from "./components/Admin";
import Categories from "./components/Admin/Categories";
import Products from "./components/Admin/Products";
import Users from "./components/Admin/Users";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Summary from "./components/Checkout/Summary";
import Privacy from "./components/Company/Privacy";
import TermsAndConditions from "./components/Company/TermsAndConditions";
import WhoWheAre from "./components/Company/WhoWheAre";
import Home from "./components/Home";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import PDP from "./components/PDP";
import PLP from "./components/PLP";
import OrderHistory from "./components/Profile/OrderHistory";
import useAuth from "./Hooks/isLoggedIn";
import AuthRoute from "./Routes/AuthRoute";
import PrivateRoute from "./Routes/PrivatedRoute";
import ScrollToTop from "./Utils/ScrollToTop";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC);

function App({ location }) {
  const { currentUser } = useAuth();

  return (
    <>
      <Elements stripe={stripePromise}>
        {location.pathname.includes("admin") || location.pathname.includes("login") || location.pathname.includes("register") || location.pathname.includes("summary") ? null : <Header />}
        <ScrollToTop>
          <Switch>
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={SignUp} />

            <Route exact path="/" component={Home} />

            <Route exact path="/products" component={PLP} />
            <Route exact path="/product/:id" component={PDP} />

            <PrivateRoute exact path="/cart" component={Cart} />

            <PrivateRoute exact path="/checkout" component={Checkout} />
            <PrivateRoute exact path="/checkout/summary" component={Summary} />

            <PrivateRoute exact path="/orders" component={OrderHistory} />

            {/* <AdminRoute path="/admin" /> */}

            <Route exact path="/who-whe-are" component={WhoWheAre} />
            <Route
              path="/admin"
              render={(props) => {
                if (currentUser.roles !== "admin") return <Redirect to="/" />;
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
            />
            <Route exact path="/terms-conditions" component={TermsAndConditions} />
            <Route exact path="/privacy" component={Privacy} />
            <Route path="*" component={ErrorPage} />
          </Switch>
        </ScrollToTop>

        <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        {location.pathname.includes("admin") || location.pathname.includes("login") || location.pathname.includes("register") || location.pathname.includes("summary") ? null : <Footer />}
      </Elements>
    </>
  );
}

export default withRouter(App);
