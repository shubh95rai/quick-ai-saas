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
      <div className="bg-white h-full w-full rounded-xl overflow-y-auto p-3">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3">
          {creations.map((creation, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg"
            >
              <img
                src={creation.content}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />

              <div className="absolute inset-0 flex items-end p-3 bg-linear-to-b from-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <p className="text-sm text-white">{creation.prompt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-3/4">
      <Loader2 className="size-8 animate-spin text-primary" />
    </div>
  );
};
export default Community;
