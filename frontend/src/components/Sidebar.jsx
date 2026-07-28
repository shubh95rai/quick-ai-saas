import {
  Edit,
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  Scissors,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    to: "/ai",
    label: "Dashboard",
    Icon: House,
  },
  {
    to: "/ai/write-article",
    label: "Write Article",
    Icon: Edit,
  },
  {
    to: "/ai/blog-titles",
    label: "Blog Titles",
    Icon: Hash,
  },
  {
    to: "/ai/generate-images",
    label: "Generate Images",
    Icon: Image,
  },
  {
    to: "/ai/remove-background",
    label: "Remove Background",
    Icon: Eraser,
  },
  {
    to: "/ai/remove-object",
    label: "Remove Objects",
    Icon: Scissors,
  },
  {
    to: "/ai/review-resume",
    label: "Review Resume",
    Icon: FileText,
  },
  {
    to: "/ai/community",
    label: "Community",
    Icon: Users,
  },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col items-center justify-between max-sm:absolute top-14 bottom-0 ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"} transition-all duration-300 ease-in-out z-10`}
    >
      <div className="w-full">
        <div className="px-6 mt-5 text-sm text-gray-600 font-medium">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded ${isActive ? "bg-linear-to-r from-[#3c81f6] to-[#9234e4] text-white" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`h-4 w-4 ${isActive ? "text-white" : ""}`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
