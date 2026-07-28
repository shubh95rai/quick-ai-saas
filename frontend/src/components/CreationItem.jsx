import { ChevronDown } from "lucide-react";
import Markdown from "react-markdown";

const CreationItem = ({ item, expanded, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className="p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2>{item.prompt}</h2>
          <p className="text-gray-500">
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button className="bg-[#eff6ff] border border-[#bfdbfe] text-[#1e40af] px-4 py-1 rounded-full text-xs sm:text-sm">
            {item.type}
          </button>

          <ChevronDown
            className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {expanded && (
        <div>
          {item.type === "image" ? (
            <div>
              <img
                src={item.content}
                alt="image"
                className="mt-3 w-full max-w-md rounded-md"
              />
            </div>
          ) : (
            <div className="mt-3 max-h-96 overflow-y-auto text-sm text-slate-700">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default CreationItem;
