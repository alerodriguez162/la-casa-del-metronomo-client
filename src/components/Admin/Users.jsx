/* eslint-disable react-hooks/exhaustive-deps */
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import React, { Fragment, useContext, useEffect, useState } from "react";
import UsersContext from "../../Context/UsersContext/UsersContext";
import DeleteUserModal from "./DeleteUserModal";

const Users = () => {
  const [open, setOpen] = useState(false);
  const usersContext = useContext(UsersContext);
  const { getAllUsers, users, currentUser, changeRole } = usersContext;
  const [currentPerson, setCurrentPerson] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, []);
  const openModal = (person) => {
    setCurrentPerson(person);
    setOpen(true);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:pb-8 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Usuarios</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col">
          <div className="-my-2  sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-show border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>

                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rol
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Eliminar</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((person) => (
                      <tr key={person.email}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{person.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {currentUser.email !== person.email ? (
                            <Menu as="div" className="relative inline-block text-left">
                              <div>
                                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                  {person.roles === "admin" ? "Administrador" : "Cliente"}
                                  <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
                                      <button
                                        onClick={() =>
                                          changeRole({
                                            ...person,
                                            roles: "admin",
                                          })
                                        }
                                        className="block px-4 py-2 text-sm text-gray-700"
                                      >
                                        Administrador
                                      </button>
                                    </Menu.Item>
                                    <Menu.Item>
                                      <button
                                        onClick={() =>
                                          changeRole({
                                            ...person,
                                            roles: "customer",
                                          })
                                        }
                                        className="block px-4 py-2 text-sm text-gray-700"
                                      >
                                        Cliente
                                      </button>
                                    </Menu.Item>
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          ) : (
                            <>{person.roles === "admin" ? "Administrador" : "Cliente"}</>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {currentUser.email !== person.email && (
                            <button onClick={() => openModal(person)} className="text-red-500 hover:text-red-900">
                              Eliminar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {currentPerson && <DeleteUserModal setOpen={setOpen} open={open} person={currentPerson} />}
    </>
  );
};

export default Users;
