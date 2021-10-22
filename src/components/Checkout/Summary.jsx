import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Summary = () => {
  const location = useLocation();
  const { summary } = location.state;
  return (
    <main className="bg-white relative lg:min-h-screen">
      <div className="h-80 overflow-hidden lg:absolute lg:w-1/2 lg:h-full lg:pr-4 xl:pr-12">
        <img
          src="https://res.cloudinary.com/di9gjsobh/image/upload/v1634897665/electric-guitars-guitars-musical-instruments-equipment-music_wkxpwe.jpg"
          alt="TODO"
          className="h-full w-full object-center object-cover"
        />
      </div>

      <div>
        <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:py-32 lg:grid lg:grid-cols-2 lg:gap-x-8 xl:gap-x-24">
          <div className="lg:col-start-2">
            <h1 className="text-sm font-medium text-indigo-600">Pago exitoso</h1>
            <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Gracias por ordenar</p>
            <p className="mt-2 text-base text-gray-500">Agradecemos tu pedido, actualmente lo estamos procesando. ¡Así que espere y le enviaremos la confirmación muy pronto!</p>

            <dl className="mt-16 text-sm font-medium">
              <dt className="text-gray-900">Número de seguimiento</dt>
              <dd className="mt-2 text-indigo-600">{summary.charge.id}</dd>
            </dl>

            <ul className="mt-6 text-sm font-medium text-gray-500 border-t border-gray-200 divide-y divide-gray-200">
              {summary.products.map((product) => (
                <li key={product.product._id} className="flex py-6 space-x-6">
                  <img src={product.product.image[0]} alt={product.product.image[0]} className="flex-none w-24 h-24 bg-gray-100 rounded-md object-center object-cover" />
                  <div className="flex-auto space-y-1">
                    <h3 className="text-gray-900 w-96 truncate">
                      <Link to={{ pathname: `/product/${product._id}`, state: { product: product.product } }}>{product.product.title}</Link>
                    </h3>
                    <p className="w-96 truncate">{product.product.description}</p>
                  </div>
                  <p className="flex-none font-medium text-gray-900">${product.product.price}</p>
                </li>
              ))}
            </ul>

            <dl className="text-sm font-medium text-gray-500 space-y-6 border-t border-gray-200 pt-6">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="text-gray-900">${summary.total}</dd>
              </div>

              <div className="flex justify-between">
                <dt>Envio</dt>
                <dd className="text-gray-900">$0.00</dd>
              </div>

              <div className="flex justify-between">
                <dt>Tarifas</dt>
                <dd className="text-gray-900">$0.00</dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">${summary.total}</dd>
              </div>
            </dl>

            <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
              <div>
                <dt className="font-medium text-gray-900">Direccion de envio</dt>
                <dd className="mt-2">
                  <address className="not-italic">
                    <span className="block">{summary.cart.address}</span>
                    <span className="block">{summary.cart.state}</span>
                    <span className="block">Mexico</span>
                  </address>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Informacion de pago</dt>
                <dd className="mt-2 space-y-2 sm:flex sm:space-y-0 sm:space-x-4">
                  <div className="flex-none">
                    <svg aria-hidden="true" width={36} height={24} viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
                      <rect width={36} height={24} rx={4} fill="#224DBA" />
                      <path
                        d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                        fill="#fff"
                      />
                    </svg>
                    <p className="sr-only">Visa</p>
                  </div>
                  <div className="flex-auto">
                    <p className="text-gray-900">Terminacion en {summary.charge.payment_method_details.card.last4}</p>
                    <p>
                      Expiracion {summary.charge.payment_method_details.card.exp_month}/{summary.charge.payment_method_details.card.exp_year}
                    </p>
                  </div>
                </dd>
              </div>
            </dl>

            <div className="mt-16 border-t border-gray-200 py-6 text-right">
              <Link to="/products" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Continuar comprando<span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Summary;
