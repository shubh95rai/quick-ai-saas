import { useEffect, useState } from "react";
import { dummyPublishedCreationData } from "../assets/assets.js";

const Community = () => {
  const [creations, setCreations] = useState([]);

  const fetchCreations = async () => {
    setCreations(dummyPublishedCreationData);
  };

  useEffect(() => {
    fetchCreations();
  }, []);

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h1 className="text-xl font-semibold text-slate-700">
        Community Creations
      </h1>
      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll">
        {creations.map((creation, index) => (
          <div
            key={index}
            className="relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3"
          >
            <img
              src={creation.content}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />

            <div className="absolute bottom-0 top-0 left-3 flex items-end p-3 group-hover:bg-linear-to-b from-transparent to-black/80 text-white rounded-lg">
              <p className="text-sm hidden group-hover:block">
                {creation.prompt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Community;
