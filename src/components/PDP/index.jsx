/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Disclosure, Listbox, Tab, Transition } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Fragment, useContext, useEffect, useState } from "react";
import CartContext from "../../Context/CartContext/CartContext";
import FeaturedProducts from "../Home/FeaturedProducts";

const relatedProducts = [
  {
    id: 1,
    name: "Zip Tote Basket",
    color: "White and black",
    href: "#",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
    imageAlt: "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "$140",
  },
  // More products...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const PDP = (props) => {
  const [product, setProduct] = useState(props.location.state.product);
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    let arr = Array.from({ length: product.stock }, (_, i) => i + 1);
    setProduct({ ...product, stock: arr });
  }, []);

  const { addToCart } = useContext(CartContext);

  return (
    <main className="max-w-7xl mx-auto sm:pt-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto lg:max-w-none">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {product.image.map((image, i) => (
                  <Tab
                    key={i}
                    className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                  >
                    {({ selected }) => (
                      <>
                        <span className="absolute inset-0 rounded-md overflow-hidden">
                          <img src={image} alt="" className="w-full h-full object-center object-cover" />
                        </span>
                        <span className={classNames(selected ? "ring-indigo-500" : "ring-transparent", "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none")} aria-hidden="true" />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
              {product.image.map((image, i) => (
                <Tab.Panel key={i}>
                  <img src={image} alt="" className="w-full h-full object-center object-cover sm:rounded-lg" />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.title}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">${product.price}</p>
            </div>

            {/* Reviews */}
            {/* <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon key={rating} className={classNames(product.rating.rate > rating ? "text-indigo-500" : "text-gray-300", "h-5 w-5 flex-shrink-0")} aria-hidden="true" />
                  ))}
                  <span> ({product.rating.count})</span>
                </div>
                <p className="sr-only">{product.rating.rate} out of 5 stars</p>
              </div>
            </div> */}

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div className="text-base text-gray-700 space-y-6" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>

            <div className="mt-6">
              <div className="mt-10 flex sm:flex-col1">
                {product.stock.length > 0 && (
                  <Listbox value={selected} onChange={setSelected} disabled={product.stock === 0 ? true : false}>
                    <div className="mt-1 relative">
                      <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <span className="block truncate">{selected}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Listbox.Button>

                      <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                          {product.stock.map((stock, i) => (
                            <Listbox.Option
                              key={i}
                              className={({ active }) => classNames(active ? "text-white bg-indigo-600" : "text-gray-900", "cursor-default select-none relative py-2 pl-3 pr-9")}
                              value={stock}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>{stock}</span>

                                  {selected ? (
                                    <span className={classNames(active ? "text-white" : "text-indigo-600", "absolute inset-y-0 right-0 flex items-center pr-4")}>
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                )}
                {/* <button type="button" className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                  <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                  <span className="sr-only">Add to favorites</span>
                </button> */}

                {product.stock.length === 0 ? (
                  <button
                    disabled
                    type="button"
                    className="max-w-xs flex-1 bg-gray-600 border border-transparent rounded-md py-3 ml-5 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500 sm:w-full"
                  >
                    Sin stock
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      addToCart({
                        productId: product._id,
                        quantity: selected,
                      });
                    }}
                    className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 ml-5 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                  >
                    Agregar al carrito
                  </button>
                )}
              </div>
            </div>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="border-t divide-y divide-gray-200">
                {product.specifications.map((detail) => (
                  <Disclosure as="div" key={detail.specificationName}>
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                            <span className={classNames(open ? "text-indigo-600" : "text-gray-900", "text-sm font-medium")}>{detail.specificationName}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500" aria-hidden="true" />
                              ) : (
                                <PlusSmIcon className="block h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel as="div" className="pb-6 prose prose-sm">
                          <ul>
                            {detail.specificationList.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </section>
          </div>
        </div>

        <FeaturedProducts />
      </div>
    </main>
  );
};

export default PDP;
