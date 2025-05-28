import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export const useBookings = () => {
  const queryClient = useQueryClient();
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
  const pageSize = Number(searchParams.get("pageSize")) || PAGE_SIZE;

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: async () => {
      const response = await getBookings({ filter, sortBy, page, pageSize });

      if (response.data.length === 0 && response.count > 0 && page > 1) {
        throw new Error("Sayfa bulunamadı, sayfa numarası çok büyük.");
      }

      return response;
    },
  });

  //Pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: async () => {
        const response = await getBookings({
          filter,
          sortBy,
          page: page + 1,
          pageSize,
        });

        if (response.data.length === 0 && response.count > 0 && page > 1) {
          throw new Error("Sayfa bulunamadı, sayfa numarası çok büyük.");
        }

        return response;
      },
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: async () => {
        const response = await getBookings({
          filter,
          sortBy,
          page: page - 1,
          pageSize,
        });

        if (response.data.length === 0 && response.count > 0 && page > 1) {
          throw new Error("Sayfa bulunamadı, sayfa numarası çok büyük.");
        }

        return response;
      },
    });
  return {
    isLoading,
    bookings,
    count,
    error,
  };
};
