import { useEffect, useState } from "react";
import handleApiError from "../../utils/handleApiError.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { Loader2 } from "lucide-react";

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCreations = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/user/get-published-creations");

      setCreations(res.data.creations);
    } catch (error) {
      handleApiError(error, "fetching creations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreations();
  }, []);

  return !loading ? (
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
  ) : (
    <div className="flex items-center justify-center h-3/4">
      <Loader2 className="size-8 animate-spin text-primary" />
    </div>
  );
};
export default Community;
