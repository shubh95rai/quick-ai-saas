import { ArrowRight } from "lucide-react";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed z-50 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-32 sm:w-44" />
      </Link>

      <Link to="/ai">
        <button className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5">
          Get Started <ArrowRight className="size-5" />
        </button>
      </Link>
    </div>
  );
};
export default Navbar;
