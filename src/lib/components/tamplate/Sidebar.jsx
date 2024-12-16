import React from "react";
import { Link, useLocation } from "react-router-dom";

// Icons
import { LuBox} from "react-icons/lu";
import { TbUsers } from "react-icons/tb";
import { AiFillProduct } from "react-icons/ai";

// Logo
import Logo from "../../../assets/Logo.png";
import { logout } from "../../api/authApi";


export const Sidebar = () => {
  const location = useLocation();

  // Sidebar Links
  const SIDEBAR_LINKS = [
    // { id: 1, path: "/dashboard/home", name: "Dashboard", icon: LuBox },
    { id: 2, path: "/dashboard/members", name: "Members", icon: TbUsers },
    { id: 3, path: "/dashboard/accessories", name: "Accessories", icon: AiFillProduct },
    // Uncomment below for additional links
    // { id: 4, path: '/project', name: 'Project', icon: FaSuitcase },
    // { id: 5, path: '/clients', name: 'Clients', icon: LuUser },
    // { id: 6, path: '/work', name: 'Work Plan', icon: LuCalendar },
  ];


    const handleLogout = async () => {
      await logout();
    };

    return (
      <div className="w-40 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-white">
        {/* Logo */}
        <div className="mb-8">
          <img src={Logo} alt="Logo" className="w-28 hidden md:flex mx-6" />
          <img src={Logo} alt="Logo" className="w-8 flex md:hidden" />
        </div>

        {/* Sidebar Links */}
        <ul className="mt-6 space-y-6">
          {SIDEBAR_LINKS.map((link) => (
            <li
              key={link.id}
              className={`font-medium rounded-md py-2 px-5 hover:bg-gray-100 hover:text-indigo-500 ${
                location.pathname === link.path ? "bg-indigo-100 text-indigo-500" : ""
              }`}
            >
              <Link to={link.path} className="flex items-center md:space-x-5">
                <span>{React.createElement(link.icon)}</span>
                <span className="text-sm text-gray-500 hidden md:flex">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Navigation */}
        <div
          className="w-full items-center absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center"
          onClick={handleLogout}
        >
          <h5 className="space-x-2 text-xs text-white py-2 px-5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full">
            Log Out
          </h5>
        </div>
      </div>
    );
};

export default Sidebar;
