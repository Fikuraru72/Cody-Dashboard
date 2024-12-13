import React from "react";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <div className="flex min-h-screen overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-56 p-4 md:p-8 bg-gray-50">
        <Header />
        <div className="mt-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
