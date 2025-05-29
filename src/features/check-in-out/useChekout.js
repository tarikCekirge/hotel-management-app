import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export const useChekout = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ active: true });
      toast.success(`Booking #${data.id} çıkışı yapıldı`);
      onSuccessCallback?.();
    },
    onError: (err) => {
      toast.error("Çıkış yapılırken hata oldu");
      console.error(err);
    },
  });

  return { checkout, isCheckingOut };
};
