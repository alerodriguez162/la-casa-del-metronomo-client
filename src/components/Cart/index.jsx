import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import CartContext from "../../Context/CartContext/CartContext";

const Cart = () => {
  const { cart, removeToCart, addToCart } = useContext(CartContext);

  const { products } = cart;

  let history = useHistory();

  return (
    <main>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-0">
        <h1 className="text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl">Mi Carrito</h1>

        <div className="mt-12">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
              {!!products.length ? (
                products.map((product) => {
                  let arr = Array.from({ length: product.product.stock }, (_, i) => i + 1);

                  return (
                    <li key={product._id} className="flex py-6">
                      <div className="flex-shrink-0">
                        <img src={product.product.image[0] || ""} alt="" className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32" />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                        <div>
                          <div className="flex justify-between">
                            <h4 className="text-sm">
                              <Link to={{ pathname: `/product/${product._id}`, state: { product: product.product } }} className="font-medium text-gray-700 hover:text-gray-800">
                                {product.product.title}
                              </Link>
                            </h4>
                            <p className="ml-4 text-sm font-medium text-gray-900">${product.product.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{product.product.description}</p>
                        </div>

                        <div className="mt-4 flex-1 flex items-end justify-between">
                          <div className="ml-4">
                            <label htmlFor="quantity" className="sr-only">
                              Quantity
                            </label>
                            <select
                              onChange={(e) => {
                                addToCart({
                                  productId: product.product._id,
                                  quantity: e.target.value,
                                });
                              }}
                              value={product.quantity}
                              id="quantity"
                              name="quantity"
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
                          <div className="ml-4">
                            <button onClick={(e) => removeToCart({ productId: product.product._id })} type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                              <span>Eliminar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                  <h2 className="text-3xl font-extrabold tracking-tight text-indigo-600 sm:text-4xl">
                    <Link to="/products" className="block">
                      Continua comprando
                    </Link>
                  </h2>
                </div>
              )}
            </ul>
          </section>

          {/* Order summary */}
          {!!products.length && (
            <section aria-labelledby="summary-heading" className="mt-10">
              <h2 id="summary-heading" className="sr-only">
                Order summary
              </h2>

              <div>
                <dl className="space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">Subtotal</dt>
                    <dd className="ml-4 text-base font-medium text-gray-900">${cart.total}</dd>
                  </div>
                </dl>
                <p className="mt-1 text-sm text-gray-500">Los gastos de envío y los impuestos se calcularán en el momento de la compra.</p>
              </div>

              <div className="mt-10">
                <button
                  onClick={(e) => {
                    history.push(`/checkout`);
                  }}
                  className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  Realizar pedido
                </button>
              </div>

              <div className="mt-6 text-sm text-center text-gray-500">
                <p>
                  o{" "}
                  <Link to="/products" className="text-indigo-600 font-medium hover:text-indigo-500">
                    Continua comprando<span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
};

export default Cart;
