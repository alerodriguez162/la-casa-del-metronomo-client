import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <main className="flex-grow mx-auto max-w-7xl w-full flex flex-col px-4 sm:px-6 lg:px-8">
      <div className="flex-shrink-0 my-auto py-16 sm:py-32">
        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">404 error</p>
        <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Pagina no encontrada</h1>
        <p className="mt-2 text-base text-gray-500">Lo sentimos, no hemos podido encontrar la página que busca.</p>
        <div className="mt-6">
          <Link to="/" className="text-base font-medium text-indigo-600 hover:text-indigo-500">
            Ir a la pagina principal<span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
