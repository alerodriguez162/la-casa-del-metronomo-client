import React from "react";
import { Link } from "react-router-dom";
import FeaturedProducts from "./FeaturedProducts";

const perks = [
  {
    name: "Free returns",
    imageUrl: "https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg",
    description: "¿No es lo que esperaba? Vuelva a introducirlo en el paquete y adjunte el sello de correos prepagado.",
  },
  {
    name: "Envío a domicilio",
    imageUrl: "https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg",
    description: "Recibe en la hora y fecha más conveniente para ti.",
  },
  {
    name: "Descuento todo el año",
    imageUrl: "https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg",
    description: "¿Buscas una oferta? Te haremos llegar ofertas personalizadas",
  },
  {
    name: "Por el planeta",
    imageUrl: "https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg",
    description: "Nos hemos comprometido a destinar el 1% de las ventas a la preservación y restauración del entorno natural.",
  },
];
const Home = () => {
  const collections = [
    {
      name: "Instrumentos",
      href: "/products",
      imageSrc: "http://www.blog.musicacreativa.com/wp-content/uploads/venta-instrumentos-musicales_web-1-1100x733.jpg",
      imageAlt: "Woman wearing a comfortable cotton t-shirt.",
    },
    {
      name: "Accesorios",
      href: "/products",
      imageSrc: "https://ae01.alicdn.com/kf/H66b268d6406e4faaa747ce013d63d142J.jpg?width=892&height=892&hash=1784",
      imageAlt: "Man wearing a comfortable and casual cotton t-shirt.",
    },
    {
      name: "Cuerdas",
      href: "/products",
      imageSrc: "https://guitarriego.com/wp-content/uploads/2020/07/Cuerdas-guitarra-electrica-acustica-Daddario-Rotosound-Elixir-Ernie-Ball-Dunlop-GHS-DR-Optima-Fender-Guitarriego-1024x435.jpg",
      imageAlt: "Person sitting at a wooden desk with paper note organizer, pencil and tablet.",
    },
  ];

  return (
    <main>
      {/* Hero section */}
      <div className="relative">
        {/* Background image and overlap */}
        <div aria-hidden="true" className="hidden absolute inset-0 sm:flex sm:flex-col">
          <div className="flex-1 relative w-full bg-gray-800">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://res.cloudinary.com/di9gjsobh/image/upload/v1634803400/wallpapertip_musical-instruments-wallpaper_246618_jayaph.jpg"
                alt=""
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gray-900 opacity-50" />
          </div>
          <div className="w-full bg-white h-32 md:h-40 lg:h-48" />
        </div>

        <div className="relative max-w-3xl mx-auto pb-96 px-4 text-center sm:pb-0 sm:px-6 lg:px-8">
          {/* Background image and overlap */}
          <div aria-hidden="true" className="absolute inset-0 flex flex-col sm:hidden">
            <div className="flex-1 relative w-full bg-gray-800">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/di9gjsobh/image/upload/v1634803400/wallpapertip_musical-instruments-wallpaper_246618_jayaph.jpg"
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gray-900 opacity-50" />
            </div>
            <div className="w-full bg-white h-48" />
          </div>
          <div className="relative py-32">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">Venta De Fin De Año</h1>
            <div className="mt-4 sm:mt-6">
              <Link to="/products" className="inline-block bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700">
                Ver Tienda
              </Link>
            </div>
          </div>
        </div>

        <section aria-labelledby="collection-heading" className="-mt-96 relative sm:mt-0">
          <h2 id="collection-heading" className="sr-only">
            Collections
          </h2>
          <div className="max-w-md mx-auto grid grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:px-6 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:px-8 lg:gap-x-8">
            {collections.map((collection) => (
              <div key={collection.name} className="group relative h-96 bg-white rounded-lg shadow-xl sm:h-auto sm:aspect-w-4 sm:aspect-h-5">
                <div>
                  <div aria-hidden="true" className="absolute inset-0 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                      <img src={collection.imageSrc} alt={collection.imageAlt} className="w-full h-full object-center object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                  </div>
                  <div className="absolute inset-0 rounded-lg p-6 flex items-end">
                    <div>
                      <h3 className="mt-1 font-semibold text-white">
                        <Link to={collection.href}>
                          <span className="absolute inset-0" />
                          {collection.name}
                        </Link>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <FeaturedProducts />

      <section aria-labelledby="perks-heading" className="bg-gray-50 border-t border-gray-200">
        <h2 id="perks-heading" className="sr-only">
          Nuestros beneficios
        </h2>

        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div key={perk.name} className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
                <div className="md:flex-shrink-0">
                  <div className="flow-root">
                    <img className="-my-1 h-24 w-auto mx-auto" src={perk.imageUrl} alt="" />
                  </div>
                </div>
                <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-900">{perk.name}</h3>
                  <p className="mt-3 text-sm text-gray-500">{perk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
