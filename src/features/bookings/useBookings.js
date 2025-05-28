import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useBookings = () => {
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" };

  //Sort

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //Pagination

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: async () => {
      const response = await getBookings({ filter, sortBy, page, pageSize });

      if (response.data.length === 0 && response.count > 0 && page > 1) {
        throw new Error("Sayfa bulunamadı, sayfa numarası çok büyük.");
      }

      return response;
    },
  });
  return {
    isLoading,
    bookings: data?.data,
    count: data?.count,
    error,
  };
};
