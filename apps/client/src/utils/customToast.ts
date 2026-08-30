import toast from "react-hot-toast";

export const Toast = {
  err: (err: string) => {
    toast.error(err ?? "Something went wrong", {
      className:
        "!bg-white  dark:!bg-[#141821] !text-slate-900 dark:!text-[#F1F3F7] !border !border-red-200 dark:!border-rose-400/20 !rounded-xl !shadow-lg",
    });
  },

  success: (message: string) => {
    toast.success(message, {
      className:
        "!bg-white dark:!bg-[#141821] !text-slate-900 dark:!text-[#F1F3F7] !border !border-emerald-200 dark:!border-emerald-400/20 !rounded-xl !shadow-lg",
    });
  },
};
