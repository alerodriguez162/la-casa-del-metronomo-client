import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UsersContext from "../../Context/UsersContext/UsersContext";

const ProfileMenu = () => {
  const userCtx = useContext(UsersContext);

  const { logOut, currentUser } = userCtx;

  if (!currentUser)
    return (
      <Link to="/login" className="ml-5 p-2 block font-medium text-gray-900">
        Iniciar sesion
      </Link>
    );

  return (
    <div className="ml-4 flex items-center md:ml-6 z-10">
      <Menu as="div" className="ml-3 relative">
        <div>
          <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span className="sr-only">Open user menu</span>
            <img className="h-8 w-8 rounded-full object-contain" src={currentUser.picture} alt="" />
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
          <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {currentUser.roles === "admin" && (
              <Menu.Item>
                <NavLink to="/admin/users" activeClassName="bg-gray-100" className="block px-4 py-2 text-sm text-gray-700">
                  Dashboard
                </NavLink>
              </Menu.Item>
            )}
            {currentUser.roles === "admin" && (
              <Menu.Item>
                <NavLink to="/orders" activeClassName="bg-gray-100" className="block px-4 py-2 text-sm text-gray-700">
                  Historial de ordenes
                </NavLink>
              </Menu.Item>
            )}

            <Menu.Item>
              <button onClick={() => logOut()} className="block px-4 py-2 text-sm text-gray-700">
                Cerrar sesion
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
