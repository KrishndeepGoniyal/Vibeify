import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import Logoutbtn from "./Logoutbtn";

function Nav() {
  const authStatus = useSelector((state) => state.auth.status);
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/", active: true },
    { name: "Discover", path: "/discover", active: true },
    { name: "Playlist", path: "/playlist", active: authStatus },
    { name: "Profile", path: "/profile", active: authStatus },
    { name: "Login", path: "/login", active: !authStatus },
    { name: "Signup", path: "/signup", active: !authStatus },
  ];

  return (
    <nav className="bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 shadow-md text-gray-800 z-99">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 md:hidden">
        <h1 className="text-lg font-bold text-gray-900">🎵 Vibeify</h1>
        <button
          className="p-2 focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between px-8 py-4">
        <h1 className="text-xl font-bold text-gray-900">🎵 Vibeify</h1>
        <div className="flex space-x-6">
          {navItems.map(
            (item, inx) =>
              item.active && (
                <NavLink
                  key={inx}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-transparent text-white font-bold text-lg text-shadow-2xs"
                        : "hover:bg-white  text-gray-900 transition-all duration-300"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              )
          )}
          {authStatus ? <Logoutbtn /> : null}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`z-99 fixed top-0 left-0 h-full w-64 bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center p-6 space-y-4">
          {navItems.map(
            (item, inx) =>
            item.active && (
                <NavLink
                  key={inx}
                  to={item.path}
                  className={({ isActive }) =>
                    `block w-full text-center p-3 rounded-xl transition-colors duration-200 ${
                      isActive
                        ? "bg-blue-500 text-white font-semibold"
                        : "hover:bg-blue-600 text-gray-900"
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </NavLink>
              )
          )}
          {authStatus ? <Logoutbtn /> : null}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
