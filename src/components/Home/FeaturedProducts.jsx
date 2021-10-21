/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductsContext from "../../Context/ProductsContext/ProductsContext";

const FeaturedProducts = () => {
  const productsCtx = useContext(ProductsContext);

  const { featuredProducts, getFeaturedProducts } = productsCtx;

  useEffect(() => {
    if (!featuredProducts.length) getFeaturedProducts();
  }, [featuredProducts]);

  return (
    <section aria-labelledby="trending-heading">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 sm:py-32 lg:pt-32 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 id="favorites-heading" className="text-2xl font-extrabold tracking-tight text-gray-900">
            Productos Destacados
          </h2>
          <Link to={"/products?featured=true"} className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block">
            Ver mas<span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {featuredProducts.map((product) => (
            <div key={product._id} className="group relative">
              <div className="w-full h-56 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
                <img src={product.image[0]} alt="" className="w-full h-full object-center object-cover" />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">
                <Link to={{ pathname: `/product/${product._id}`, state: { product } }}>
                  <span className="absolute inset-0" />
                  {product.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.description}</p>
              <p className="mt-1 text-sm font-medium text-gray-900">${product.price}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm md:hidden">
          <Link to={"/products?featured=true"} className="font-medium text-indigo-600 hover:text-indigo-500">
            Ver mas<span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
