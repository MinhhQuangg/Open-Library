import { toast } from "react-toastify";

export const showToastSuccess = (message) => {
  message && toast.success(message);
};
export const showToastError = (message) => {
  message && toast.error(message);
};
export const showToastWarning = (message) => {
  message && toast.warning(message);
};
export const showToastInfo = (message) => {
  message && toast.info(message);
};
