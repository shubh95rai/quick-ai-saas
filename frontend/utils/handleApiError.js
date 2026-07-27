import { toast } from "react-hot-toast";

const handleApiError = (error, operationName) => {
  const message =
    error?.response?.data?.message || error?.message || "Something went wrong";

  console.log(`Error in ${operationName}:`, message);

  toast.error(message);

  return message;
};

export default handleApiError;
