/* eslint-disable react-hooks/exhaustive-deps */
import { TrashIcon } from "@heroicons/react/solid";
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import CartContext from "../../Context/CartContext/CartContext";
import useAuth from "../../Hooks/isLoggedIn";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { currentUser } = useAuth();

  const { submitCheckout, cart, removeToCart, addToCart } = useContext(CartContext);

  let history = useHistory();

  const iframeStyles = {
    base: {
      fontSize: "0.875rem",
    },
  };

  const cardElementOpts = {
    style: iframeStyles,
    placeholder: "",
  };

  const formik = useFormik({
    initialValues: {
      email: currentUser.email,
      firstName: currentUser.name,
      lastName: currentUser.lastName,
      address: "",
      state: "",
      country: "Mexico",
      zip: "",
      cardName: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Requerido";
      }
      if (!values.firstName) {
        errors.firstName = "Requerido";
      }
      if (!values.lastName) {
        errors.lastName = "Requerido";
      }
      if (!values.address) {
        errors.address = "Requerido";
      }
      if (!values.state) {
        errors.state = "Requerido";
      }
      if (!values.zip) {
        errors.zip = "Requerido";
      }
      return errors;
    },
    onSubmit: async (values) => {
      const cardNumber = elements.getElement("cardNumber");

      try {
        const { token } = await stripe.createToken(cardNumber);
        const formData = { ...values, stripeToken: token.id };
        const result = await submitCheckout(formData);
        history.push({
          pathname: "/checkout/summary",
          state: { summary: result },
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    if (cart.totalProducts === 0) history.push(`/cart`);
  }, [cart]);

  return (
    <div className="bg-gray-50">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

        <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16" onSubmit={formik.handleSubmit}>
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">Informacion de contacto</h2>

              <div className="mt-4">
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email-address"
                    name="email"
                    {...formik.getFieldProps("email")}
                    disabled
                    autoComplete="email"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {formik.errors.email}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Informacion de envio</h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="first-name"
                      name="firstName"
                      {...formik.getFieldProps("firstName")}
                      autoComplete="given-name"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.firstName}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Apellido
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="last-name"
                      name="lastName"
                      {...formik.getFieldProps("lastName")}
                      autoComplete="family-name"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.lastName}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Direccion
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address"
                      {...formik.getFieldProps("address")}
                      id="address"
                      autoComplete="street-address"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {formik.touched.address && formik.errors.address ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.address}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                    Estado
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="state"
                      {...formik.getFieldProps("state")}
                      id="province"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {formik.touched.state && formik.errors.state ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.state}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Pais
                  </label>
                  <div className="mt-1">
                    <select
                      id="country"
                      name="country"
                      disabled
                      {...formik.getFieldProps("country")}
                      autoComplete="country"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>Mexico</option>
                    </select>
                    {formik.touched.country && formik.errors.country ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.country}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                    Codigo Postal
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="zip"
                      {...formik.getFieldProps("zip")}
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {formik.touched.zip && formik.errors.zip ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.zip}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Informacion de pago</h2>

              <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
                <div className="col-span-4">
                  <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                    Numero de la tarjeta
                  </label>
                  <div className="mt-1">
                    <CardNumberElement options={cardElementOpts} />
                  </div>
                </div>

                <div className="col-span-4">
                  <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                    Nombre de la tarjeta
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name-on-card"
                      name="cardName"
                      {...formik.getFieldProps("cardName")}
                      autoComplete="cc-name"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-3">
                  <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                    Fecha de expiracion (MM/YY)
                  </label>
                  <div className="mt-1">
                    <CardExpiryElement options={cardElementOpts} />
                  </div>
                </div>

                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                    CVC
                  </label>
                  <div className="mt-1">
                    <CardCvcElement options={cardElementOpts} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul className="divide-y divide-gray-200">
                {cart.products.map((product) => {
                  let arr = Array.from({ length: product.product.stock }, (_, i) => i + 1);

                  return (
                    <li key={product.id} className="flex py-6 px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        <img src={product.product.image[0]} alt="" className="w-20 rounded-md" />
                      </div>

                      <div className="ml-6 flex-1 flex flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm w-96  truncate ">
                              <Link to={{ pathname: `/product/${product._id}`, state: { product: product.product } }}>
                                <span className="font-medium text-gray-700 hover:text-gray-800 ">{product.product.title}</span>
                              </Link>
                            </h4>
                            <p className="mt-1 text-sm text-gray-500 w-96 truncate">{product.product.description}</p>
                          </div>

                          <div className="ml-4 flex-shrink-0 flow-root">
                            <button
                              onClick={(e) => removeToCart({ productId: product.product._id })}
                              type="button"
                              className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Eliminar</span>
                              <TrashIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="flex-1 pt-2 flex items-end justify-between">
                          <p className="mt-1 text-sm font-medium text-gray-900">{product.product.price}</p>

                          <div className="ml-4">
                            <label htmlFor="quantity" className="sr-only">
                              Quantity
                            </label>
                            <select
                              id="quantity"
                              name="quantity"
                              value={product.quantity}
                              onChange={(e) => {
                                addToCart({
                                  productId: product.product._id,
                                  quantity: e.target.value,
                                });
                              }}
                              className="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                              {arr.map((item, i) => {
                                return (
                                  <option key={i} value={item}>
                                    {item}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">${cart.total}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Envio</dt>
                  <dd className="text-sm font-medium text-gray-900">$0.00</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Tarifas</dt>
                  <dd className="text-sm font-medium text-gray-900">$0.00</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">${cart.total}</dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  Confirm order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
