import { MenuAlt2Icon } from "@heroicons/react/outline";
import { useState } from "react";
import ProfileMenu from "../Layout/ProfileMenu";
import Sidebar from "./Sidebar";

const Admin = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-end">
            <ProfileMenu />
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">{props.children}</div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
