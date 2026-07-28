import { Loader2, Scissors, Sparkles } from "lucide-react";
import { useState } from "react";
import handleApiError from "../../utils/handleApiError.js";
import axiosInstance from "../../utils/axiosInstance.js";
import toast from "react-hot-toast";

const RemoveObject = () => {
  const [image, setImage] = useState("");
  const [object, setObject] = useState("");

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const trimmedObject = object.trim();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    if (!trimmedObject) {
      toast.error("Please enter an object name");
      return;
    }

    if (/\s/.test(trimmedObject)) {
      toast.error("Please enter only a single object name");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);
      formData.append("object", trimmedObject);

      const res = await axiosInstance.post("/ai/remove-image-object", formData);

      setContent(res.data.content);
    } catch (error) {
      handleApiError(error, "Remove Object");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left col */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#4a7aff]" />
          <h1 className="text-xl font-semibold">Object Removal</h1>
        </div>

        <p className="mt-6 text-sm font-semibold">Upload Image</p>

        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          accept="image/*"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
        />

        <p className="mt-6 text-sm font-semibold">
          Describe object name to remove
        </p>

        <textarea
          value={object}
          onChange={(e) => setObject(e.target.value)}
          rows={4}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="e.g. watch or person etc. Only single object name"
        />

        <button
          disabled={loading}
          className="w-full flex items-center gap-2 justify-center bg-linear-to-r from-[#417df6] to-[#8e37eb] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <Loader2 className="animate-spin w-5" />
          ) : (
            <Scissors className="w-5" />
          )}
          Remove Object
        </button>
      </form>

      {/* Right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-[#4a7aff]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Scissors className="w-9 h-9" />
              <p>Upload an image and click "Remove Object" to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 flex-1 flex items-center justify-center overflow-hidden rounded-lg bg-slate-50">
            <img
              src={content}
              alt="processed-image"
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default RemoveObject;
