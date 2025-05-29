import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isLoading,
    mutate: login,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: async () => {
      const user = await getCurrentUser();
      queryClient.setQueryData(["user"], user);
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error("Giriş yapılamadı: " + err.message);
    },
  });

  return { isLoading, login, error };
};
