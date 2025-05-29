import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useChecking = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ active: true });
      toast.success(`Booking #${data.id} girişi başarıyla yapıldı`);
      onSuccessCallback?.();
      navigate("/");
    },
    onError: (err) => {
      toast.error("Giriş yapılırken hata oldu");
      console.error(err);
    },
  });

  return { checkin, isCheckingIn };
};
