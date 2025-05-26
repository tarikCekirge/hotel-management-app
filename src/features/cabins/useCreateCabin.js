import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin(onSuccessCallback) {
  const queryClient = useQueryClient();

  const { mutate: addNewCabin, isPending: isCreating } = useMutation({
    mutationFn: ({ newCabinData, cabinId }) =>
      createEditCabin(newCabinData, cabinId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });

      if (variables.cabinId) {
        toast.success("Oda güncellendi!");
      } else {
        toast.success("Yeni oda eklendi!");
      }

      onSuccessCallback?.();
    },
    onError: (err) => {
      toast.error("Eklerken hata oldu.");
      console.error(err);
    },
  });

  return { addNewCabin, isCreating };
}
