import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export const useEditSettings = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  const { mutate: editSettings, isPending: isEditing } = useMutation({
    mutationFn: ({ newSettingsData }) => updateSetting(newSettingsData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Ayarlar güncellendi!");
      onSuccessCallback?.();
    },
    onError: (err) => {
      toast.error("Ayarlar güncellenirken hata oluştu.");
      console.error(err);
    },
  });

  return { editSettings, isEditing };
};
