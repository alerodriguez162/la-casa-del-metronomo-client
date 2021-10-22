/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { ChevronDownIcon, PlusSmIcon } from "@heroicons/react/solid";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductsContext from "../../Context/ProductsContext/ProductsContext";
import FeaturedProducts from "../Home/FeaturedProducts";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PLP = () => {
  // let location = useLocation();
  const search = useLocation().search;
  const isFeatured = new URLSearchParams(search).get("featured");
  const searchParam = new URLSearchParams(search).get("search");

  const { categories, allCategories, allProducts, products } = useContext(ProductsContext);

  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [categoriesSelectedMobile, setCategoriesSelectedMobile] = useState([]);

  useEffect(() => {
    if (!categories.length) allCategories();
  }, [categories]);

  useEffect(() => {
    if (!products.length) {
      initialState();
    }
  }, []);

  const initialState = () => {
    if (isFeatured) {
      allProducts({ featured: true });
    }
    if (searchParam) {
      allProducts({ search: searchParam });
    } else {
      allProducts();
    }
  };

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (categoriesSelected.length > 0 || categoriesSelectedMobile.length > 0) allProducts({ categories: categoriesSelected });
    else initialState();
  }, [categoriesSelected, categoriesSelectedMobile]);

  return (
    <>
      {categories.length && (
        <>
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto">
                  <div className="px-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button type="button" className="-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-500" onClick={() => setMobileFiltersOpen(false)}>
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4">
                    <Disclosure as="div" className="border-t border-gray-200 pt-4 pb-4">
                      {({ open }) => (
                        <fieldset>
                          <legend className="w-full px-2">
                            <Disclosure.Button className="w-full p-2 flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="text-sm font-medium text-gray-900">Categorias</span>
                              <span className="ml-6 h-7 flex items-center">
                                <ChevronDownIcon className={classNames(open ? "-rotate-180" : "rotate-0", "h-5 w-5 transform")} aria-hidden="true" />
                              </span>
                            </Disclosure.Button>
                          </legend>
                          <Disclosure.Panel className="pt-4 pb-2 px-4">
                            <div className="space-y-6">
                              {categories.map((category, optionIdx) => (
                                <div key={category._id} className="flex items-center">
                                  <input
                                    id={`${category._id}-${optionIdx}-mobile`}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setCategoriesSelectedMobile([
                                          ...categoriesSelectedMobile,
                                          {
                                            categories: category._id,
                                          },
                                        ]);
                                      } else {
                                        let newCategories = categoriesSelectedMobile.filter((e) => {
                                          if (e.categories !== category._id) return e;
                                        });
                                        setCategoriesSelectedMobile([...newCategories]);
                                      }
                                    }}
                                    name={`${category._id}`}
                                    type="checkbox"
                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label htmlFor={`${optionIdx}-mobile`} className="ml-3 text-sm text-gray-500">
                                    {category.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </fieldset>
                      )}
                    </Disclosure>
                  </form>
                </div>
              </Transition.Child>
            </Dialog>
          </Transition.Root>

          <main className="max-w-2xl mx-auto px-4 lg:max-w-7xl lg:px-8">
            <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
              <aside>
                <h2 className="sr-only">Filters</h2>

                <button type="button" className="inline-flex items-center lg:hidden" onClick={() => setMobileFiltersOpen(true)}>
                  <span className="text-sm font-medium text-gray-700">Filters</span>
                  <PlusSmIcon className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </button>

                <div className="hidden lg:block">
                  <div className="divide-y divide-gray-200 space-y-10">
                    <fieldset>
                      <legend className="block text-sm font-medium text-gray-900">Categorias</legend>
                      <div className="pt-6 space-y-3">
                        {categories.map((category, index) => (
                          <div key={category._id} className="flex items-center">
                            <input
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setCategoriesSelected([
                                    ...categoriesSelected,
                                    {
                                      categories: category._id,
                                    },
                                  ]);
                                } else {
                                  let newCategories = categoriesSelected.filter((e) => {
                                    if (e.categories !== category._id) return e;
                                  });
                                  setCategoriesSelected([...newCategories]);
                                }
                              }}
                              id={`${category._id}-${category}`}
                              name={`${category._id}`}
                              type="checkbox"
                              className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor={`${category.id}-${category}`} className="ml-3 text-sm text-gray-600">
                              {category.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                </div>
              </aside>

              <section aria-labelledby="product-heading" className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3">
                <h2 id="product-heading" className="sr-only">
                  Productos
                </h2>

                {products.length ? (
                  <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                    {products.map((product) => (
                      <div key={product._id} className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden">
                        <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                          <img src={product.image[0]} alt="" className="w-full h-full object-center object-cover sm:w-full sm:h-full" />
                        </div>
                        <div className="flex-1 p-4 space-y-2 flex flex-col">
                          <h3 className="text-sm font-medium text-gray-900">
                            <Link to={{ pathname: `/product/${product._id}`, state: { product } }}>
                              <span aria-hidden="true" className="absolute inset-0" />
                              {product.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-500 h-50 truncate ">{product.description}</p>
                          <div className="flex-1 flex flex-col justify-end">
                            <p className="text-sm italic text-gray-500">{product.options}</p>
                            <p className="text-base font-medium text-gray-900">${product.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                      <span className="block">Sin resultados</span>
                    </h2>
                  </div>
                )}
              </section>
            </div>
          </main>
          <FeaturedProducts />
        </>
      )}
    </>
  );
};

export default PLP;
