/* eslint-disable react-hooks/exhaustive-deps */
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import React, { Fragment, useContext, useEffect, useState } from "react";
import ProductsContext from "../../Context/ProductsContext/ProductsContext";
import NewCategoryModal from "./NewCategoryModal";

const Categories = () => {
  const productsCtx = useContext(ProductsContext);

  const { allCategories, categories, deleteCategory } = productsCtx;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    allCategories();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 flex justify-between sm:px-6 md:px-8 md:pb-8">
        <h1 className="text-2xl font-semibold  text-gray-900">Categorias</h1>{" "}
        <button
          onClick={(e) => setOpen(true)}
          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Nueva categoria
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {categories && categories.length ? (
          <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <li key={category.label} className="col-span-1 flex shadow-sm rounded-md relative">
                <div className="flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md bg-pink-600">{category.label.slice(0, 2)}</div>
                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                  <div className="flex-1 px-4 py-2 text-sm truncate">
                    <span className="text-gray-900 font-medium hover:text-gray-600">{category.label}</span>
                    <p className="text-gray-500">{category.products.length} Productos</p>
                  </div>
                  <div className="flex-shrink-0 pr-2">
                    <Menu as="div" className=" inline-block text-left">
                      <div>
                        <Menu.Button className=" flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                          <span className="sr-only">Open options</span>
                          <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              <button onClick={() => deleteCategory(category._id)} className="block px-4 py-2 text-sm text-gray-700">
                                Eliminar
                              </button>
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">No existen categorias</span>
            </h2>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <button
                  onClick={(e) => setOpen(true)}
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Nueva categoria
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <NewCategoryModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Categories;
