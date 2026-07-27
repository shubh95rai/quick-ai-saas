import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar.jsx";

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className="flex flex-col items-start justify-start h-screen">
      <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200">
        <Link to="/">
          <img src={assets.logo} alt="logo" className="w-32 sm:w-40" />
        </Link>

        {sidebar ? (
          <X
            className="h-6 w-6 text-gray-600 cursor-pointer sm:hidden"
            onClick={() => setSidebar(false)}
          />
        ) : (
          <Menu
            className="h-6 w-6 text-gray-600 cursor-pointer sm:hidden"
            onClick={() => setSidebar(true)}
          />
        )}
      </nav>

      <div className="flex-1 w-full flex h-[calc(100vh-64px)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        <div className="flex-1 bg-[#f4f7fb]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Layout;
