import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useResetPageOnFilterChange() {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sortBy") || "startDate-desc";

  useEffect(() => {
    if (Number(searchParams.get("page")) > 1) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", "1");
      setSearchParams(newParams);
    }
  }, [status, sortBy, searchParams, setSearchParams]);
}
