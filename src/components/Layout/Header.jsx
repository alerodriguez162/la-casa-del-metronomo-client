/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog, Popover, Transition } from "@headlessui/react";
import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from "@heroicons/react/outline";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CartContext from "../../Context/CartContext/CartContext";
import useAuth from "../../Hooks/isLoggedIn";
import ProfileMenu from "./ProfileMenu";

const navigation = {
  // categories: [
  //   {
  //     name: "Instrumentos",
  //     featured: [
  //       {
  //         name: "New Arrivals",
  //         href: "#",
  //         imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
  //         imageAlt: "Models sitting back to back, wearing Basic Tee in black and bone.",
  //       },
  //       {
  //         name: "Basic Tees",
  //         href: "#",
  //         imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
  //         imageAlt: "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
  //       },
  //       {
  //         name: "Accessories",
  //         href: "#",
  //         imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg",
  //         imageAlt: "Model wearing minimalist watch with black wristband and white watch face.",
  //       },
  //       {
  //         name: "Carry",
  //         href: "#",
  //         imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg",
  //         imageAlt: "Model opening tan leather long wallet with credit card pockets and cash pouch.",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Accesorios",
  //     featured: [
  //       {
  //         name: "New Arrivals",
  //         href: "#",
  //         imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg",
  //         imageAlt: "Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.",
  //       },
  //       {
  //         name: "Basic Tees",
  //         href: "#",
  //         imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg",
  //         imageAlt: "Model wearing light heather gray t-shirt.",
  //       },
  //       {
  //         name: "Accessories",
  //         href: "#",
  //         imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg",
  //         imageAlt: "Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.",
  //       },
  //       {
  //         name: "Carry",
  //         href: "#",
  //         imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg",
  //         imageAlt: "Model putting folded cash into slim card holder olive leather wallet with hand stitching.",
  //       },
  //     ],
  //   },
  // ],
  pages: [
    { name: "Instrumentos", href: "/products" },
    { name: "Accesorios", href: "/products" },
    { name: "Empresa", href: "/who-whe-are" },
  ],
};

const Header = () => {
  const [open, setOpen] = useState(false);

  let history = useHistory();

  const { isLoggedIn } = useAuth();

  const [search, setSearch] = useState("");

  const { getCart, cart } = useContext(CartContext);

  useEffect(() => {
    if (isLoggedIn) {
      if (!Object.keys(cart).length) getCart();
    }
  }, [cart, isLoggedIn]);

  const handleForm = (event) => {
    event.preventDefault();

    setSearch({
      ...search,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/products?search=${search.search}`);
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
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
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex justify-between">
                <button type="button" className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400" onClick={() => setOpen(false)}>
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                {isLoggedIn && <ProfileMenu />}
              </div>

              {/* <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex px-4 space-x-8">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(selected ? "text-indigo-600 border-indigo-600" : "text-gray-900 border-transparent", "flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium")
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {navigation.categories.map((category) => (
                    <Tab.Panel key={category.name} className="px-4 py-6 space-y-12">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                        {category.featured.map((item) => (
                          <div key={item.name} className="group relative">
                            <div className="aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden group-hover:opacity-75">
                              <img src={item.imageSrc} alt={item.imageAlt} className="object-center object-cover" />
                            </div>
                            <a href={item.href} className="mt-6 block text-sm font-medium text-gray-900">
                              <span className="absolute z-10 inset-0" aria-hidden="true" />
                              {item.name}
                            </a>
                            <p aria-hidden="true" className="mt-1 text-sm text-gray-500">
                              Shop now
                            </p>
                          </div>
                        ))}
                      </div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group> */}

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <Link to={page.href} className="-m-2 p-2 block font-medium text-gray-900">
                      {page.name}
                    </Link>
                  </div>
                ))}
              </div>

              {!isLoggedIn && (
                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  <div className="flow-root">
                    <Link to="/register" className="-m-2 p-2 block font-medium text-gray-900">
                      Crear Cuenta
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link to="/login" className="-m-2 p-2 block font-medium text-gray-900">
                      Iniciar Sesion
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <header className="relative">
        <nav aria-label="Top">
          <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-16 flex items-center justify-between">
                <div className="hidden lg:flex-1 lg:flex lg:items-center">
                  <Link to="/">
                    <img className="h-10 w-auto" src="https://res.cloudinary.com/di9gjsobh/image/upload/v1634804968/metronome_icon-icons.com_60037_uc309z.png" alt="" />
                  </Link>
                </div>

                <div className="hidden h-full lg:flex">
                  <Popover.Group className="px-4 bottom-0 inset-x-0">
                    <div className="h-full flex justify-center space-x-8">
                      {/* {navigation.categories.map((category) => (
                        <Popover key={category.name} className="flex">
                          {({ open }) => (
                            <>
                              <div className="relative flex">
                                <Popover.Button
                                  className={classNames(
                                    open ? "text-indigo-600" : "text-gray-700 hover:text-gray-800",
                                    "relative flex items-center justify-center transition-colors ease-out duration-200 text-sm font-medium"
                                  )}
                                >
                                  {category.name}
                                  <span className={classNames(open ? "bg-indigo-600" : "", "absolute z-20 -bottom-px inset-x-0 h-0.5 transition ease-out duration-200")} aria-hidden="true" />
                                </Popover.Button>
                              </div>

                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Popover.Panel className="absolute z-10 top-full inset-x-0 bg-white text-sm text-gray-500">
                                  <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                                  <div className="absolute inset-0 top-0 h-px max-w-7xl mx-auto px-8" aria-hidden="true">
                                    <div className={classNames(open ? "bg-gray-200" : "bg-transparent", "w-full h-px transition-colors ease-out duration-200")} />
                                  </div>

                                  <div className="relative">
                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                      <div className="grid grid-cols-4 gap-y-10 gap-x-8 py-16">
                                        {category.featured.map((item) => (
                                          <div key={item.name} className="group relative">
                                            <div className="aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden group-hover:opacity-75">
                                              <img src={item.imageSrc} alt={item.imageAlt} className="object-center object-cover" />
                                            </div>
                                            <a href={item.href} className="mt-4 block font-medium text-gray-900">
                                              <span className="absolute z-10 inset-0" aria-hidden="true" />
                                              {item.name}
                                            </a>
                                            <p aria-hidden="true" className="mt-1">
                                              Shop now
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      ))} */}

                      {navigation.pages.map((page) => (
                        <Link key={page.name} to={page.href} className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                          {page.name}
                        </Link>
                      ))}
                    </div>
                  </Popover.Group>
                </div>

                {/* Mobile menu and search (lg-) */}
                <div className="flex-1 flex items-center lg:hidden">
                  <button type="button" className="-ml-2 bg-white p-2 rounded-md text-gray-400" onClick={() => setOpen(true)}>
                    <span className="sr-only">Open menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Search */}
                  {/* <button href="/" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <SearchIcon className="w-6 h-6" aria-hidden="true" />
                  </button> */}
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="search"
                      onChange={(e) => {
                        handleForm(e);
                      }}
                      id="search"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Busqueda..."
                    />
                  </form>
                </div>

                {/* Logo (lg-) */}
                <Link to="/" className="lg:hidden">
                  <img src="https://res.cloudinary.com/di9gjsobh/image/upload/v1634804968/metronome_icon-icons.com_60037_uc309z.png" alt="" className="h-8 w-auto" />
                </Link>

                <div className="flex-1 flex items-center justify-end">
                  <div className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          name="search"
                          onChange={(e) => {
                            handleForm(e);
                          }}
                          id="search"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          placeholder="Busqueda..."
                        />
                      </form>
                    </div>
                  </div>

                  <div className="flex items-center lg:ml-8">
                    <div className="ml-4 flow-root lg:ml-8">
                      <Link to="/cart" className="group -m-2 p-2 flex items-center">
                        <ShoppingBagIcon className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cart.totalProducts}</span>
                        <span className="sr-only">items in cart, view bag</span>
                      </Link>
                    </div>
                    <div className="hidden lg:block">
                      <ProfileMenu />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
