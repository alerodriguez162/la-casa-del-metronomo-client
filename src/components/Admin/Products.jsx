/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import ProductsContext from "../../Context/ProductsContext/ProductsContext";
import CreateAndUpdateProduct from "./CreateAndUpdateProduct";
import DeleteProductModal from "./DeleteProductModal";

const Products = () => {
  const productsCtx = useContext(ProductsContext);

  const { allProducts, products } = productsCtx;
  const [open, setOpen] = useState(false);
  const [create, setCreate] = useState(true);

  const [currentProduct, setCurrentProduct] = useState();
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    allProducts();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 flex justify-between sm:px-6 md:px-8 md:pb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Productos</h1>
        <button
          onClick={(e) => setOpen(true)}
          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Nuevo producto
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-5 sm:px-6 md:px-8">
        {products && products.length ? (
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nombre
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Categorias
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Precio
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Editar</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products &&
                        products.map((product, index) => (
                          <tr key={product._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img className="h-10 w-10 rounded-full" src={product.image[0]} alt="" />
                                </div>
                                <div className="ml-4">{product.title}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {product.categories.map((category) => (
                                <div key={`${category._id}-${index}`} className="text-sm font-medium text-gray-900">
                                  {category.label}
                                </div>
                              ))}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{product.stock}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">${product.price}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={(e) => {
                                  setCurrentProduct(product);
                                  setOpenDelete(true);
                                }}
                                className="text-red-500 hover:text-red-900"
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">No existen productos</span>
            </h2>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <button
                  onClick={(e) => {
                    setCreate(true);
                    setOpen(true);
                  }}
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Nuevo producto
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <CreateAndUpdateProduct open={open} setOpen={setOpen} create={create} />
      {currentProduct && <DeleteProductModal setOpen={setOpenDelete} open={openDelete} product={currentProduct} />}
    </>
  );
};

export default Products;
