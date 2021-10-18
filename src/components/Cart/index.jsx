import { CheckIcon, ClockIcon } from "@heroicons/react/solid";
import React from "react";
const policies = [
  {
    name: "Free returns",
    imageUrl: "https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg",
    description: "Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.",
  },
  {
    name: "Same day delivery",
    imageUrl: "https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg",
    description: "We offer a delivery service that has never been done before. Checkout today and receive your products within hours.",
  },
  {
    name: "All year discount",
    imageUrl: "https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg",
    description: 'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
  },
  {
    name: "For the planet",
    imageUrl: "https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg",
    description: "We’ve pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
];
const products = [
  {
    id: 1,
    name: "Artwork Tee",
    href: "#",
    price: "$32.00",
    color: "Mint",
    size: "Medium",
    inStock: true,
    imageSrc: "https://tailwindui.com/img/ecommerce-images/checkout-page-03-product-04.jpg",
    imageAlt: "Front of mint cotton t-shirt with wavey lines pattern.",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Charcoal",
    inStock: false,
    leadTime: "7-8 years",
    size: "Large",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
    imageAlt: "Front of charcoal cotton t-shirt.",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Sienna",
    inStock: true,
    size: "Large",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
    imageAlt: "Front of sienna cotton t-shirt.",
  },
];
const Cart = () => {
  return (
    <main>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-0">
        <h1 className="text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

        <form className="mt-12">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
              {products.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="flex-shrink-0">
                    <img src={product.imageSrc} alt={product.imageAlt} className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32" />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-sm">
                          <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                            {product.name}
                          </a>
                        </h4>
                        <p className="ml-4 text-sm font-medium text-gray-900">{product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                      <p className="mt-1 text-sm text-gray-500">{product.size}</p>
                    </div>

                    <div className="mt-4 flex-1 flex items-end justify-between">
                      <p className="flex items-center text-sm text-gray-700 space-x-2">
                        {product.inStock ? (
                          <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                        ) : (
                          <ClockIcon className="flex-shrink-0 h-5 w-5 text-gray-300" aria-hidden="true" />
                        )}

                        <span>{product.inStock ? "In stock" : `Will ship in ${product.leadTime}`}</span>
                      </p>
                      <div className="ml-4">
                        <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section aria-labelledby="summary-heading" className="mt-10">
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>

            <div>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">Subtotal</dt>
                  <dd className="ml-4 text-base font-medium text-gray-900">$96.00</dd>
                </div>
              </dl>
              <p className="mt-1 text-sm text-gray-500">Shipping and taxes will be calculated at checkout.</p>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                Checkout
              </button>
            </div>

            <div className="mt-6 text-sm text-center text-gray-500">
              <p>
                or{" "}
                <a href="/" className="text-indigo-600 font-medium hover:text-indigo-500">
                  Continue Shopping<span aria-hidden="true"> &rarr;</span>
                </a>
              </p>
            </div>
          </section>
        </form>
      </div>

      {/* Policy grid */}
      <section aria-labelledby="policies-heading" className="bg-gray-50 border-t border-gray-200">
        <h2 id="policies-heading" className="sr-only">
          Our policies
        </h2>

        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
            {policies.map((policy) => (
              <div key={policy.name} className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
                <div className="md:flex-shrink-0">
                  <div className="flow-root">
                    <img className="-my-1 h-24 w-auto mx-auto" src={policy.imageUrl} alt="" />
                  </div>
                </div>
                <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-900">{policy.name}</h3>
                  <p className="mt-3 text-sm text-gray-500">{policy.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;
