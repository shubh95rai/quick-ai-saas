import { useEffect, useState } from "react";
import { dummyCreationData } from "../assets/assets.js";
import { Loader2, Sparkles } from "lucide-react";
import CreationItem from "../components/CreationItem.jsx";
import handleApiError from "../../utils/handleApiError.js";
import axiosInstance from "../../utils/axiosInstance.js";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const getDashboardData = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/user/get-creations");

      setCreations(res.data.creations);
    } catch (error) {
      handleApiError(error, "getting dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* Total creation card */}
        <div className="flex justify-between items-center max-xs:w-full w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="size-10 rounded-lg bg-linear-to-br from-[#3588f2] to-[#0bb0d7] text-white flex justify-center items-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-3/4">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-3">
          <p className="mt-6 mb-4">Recent Creations</p>
          {creations.map((item) => (
            <CreationItem
              key={item.id}
              item={item}
              expanded={expandedId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Dashboard;
