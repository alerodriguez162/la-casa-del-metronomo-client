/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import UsersContext from "../../Context/UsersContext/UsersContext";
import DeleteUserModal from "./DeleteUserModal";
const people = [
  { name: "Jane Cooper", title: "Regional Paradigm Technician", role: "Admin", email: "jane.cooper@example.com" },
  // More people...
];
const Users = () => {
  const [open, setOpen] = useState(false);
  const usersContext = useContext(UsersContext);
  const { getAllUsers, users } = usersContext;
  const [currentPerson, setCurrentPerson] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, []);
  console.log(users);
  const openModal = (person) => {
    setCurrentPerson(person);
    setOpen(true);
  };
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:p-8">
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>

                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((person) => (
                      <tr key={person.email}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{person.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.roles}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => openModal(people)} className="text-red-500 hover:text-red-900">
                            Delete
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
      </div>
      {currentPerson && <DeleteUserModal setOpen={setOpen} open={open} person={currentPerson} />}
    </>
  );
};

export default Users;
