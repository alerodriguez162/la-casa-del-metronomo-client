import React from "react";
import { Link } from "react-router-dom";
const footerNavigation = {
  company: [
    { name: "Quiénes somos", href: "/who-whe-are" },
    { name: "Términos y condiciones", href: "/terms-conditions" },
    { name: "Privacidad", href: "/privacy" },
  ],
  connect: [{ name: "Facebook", href: "https://www.facebook.com/La-casa-del-metr%C3%B3nomo-984900288299007" }],
};

const Footer = (props) => {
  return (
    <footer aria-labelledby="footer-heading" className="bg-white border-t border-gray-200">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 grid grid-cols-2 gap-8 sm:gap-y-0 sm:grid-cols-2 lg:grid-cols-4">
          {/* <div className="grid grid-cols-1 gap-y-10 lg:col-span-2 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-8">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Account</h3>
              <ul className="mt-6 space-y-6">
                {footerNavigation.account.map((item) => (
                  <li key={item.name} className="text-sm">
                    <a href={item.href} className="text-gray-500 hover:text-gray-600">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Service</h3>
              <ul className="mt-6 space-y-6">
                {footerNavigation.service.map((item) => (
                  <li key={item.name} className="text-sm">
                    <a href={item.href} className="text-gray-500 hover:text-gray-600">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}
          <div className="grid grid-cols-1 gap-y-10 lg:col-span-2 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-8">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Empresa</h3>
              <ul className="mt-6 space-y-6">
                {footerNavigation.company.map((item) => (
                  <li key={item.name} className="text-sm">
                    <Link to={item.href} className="text-gray-500 hover:text-gray-600">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Redes Sociales</h3>
              <ul className="mt-6 space-y-6">
                {footerNavigation.connect.map((item) => (
                  <li key={item.name} className="text-sm">
                    <a href={item.href} rel="noreferrer noopener" target="_blank" className="text-gray-500 hover:text-gray-600">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 py-10 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center justify-center text-sm text-gray-500">
            <p>Envío a Mexico ($MXN)</p>
            <p className="ml-3 border-l border-gray-200 pl-3">Español</p>
          </div>
          <p className="mt-6 text-sm text-gray-500 text-center sm:mt-0">&copy; 2021 La Casa Del Metronomo</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
