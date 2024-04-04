import { fetchIconsFirebase } from "@/lib/service/api/icons";
import { useQuery } from "@tanstack/react-query";

export const useIcons = () => {
  return useQuery({
    queryKey: ["icons"],
    queryFn: () => fetchIconsFirebase(),
  });
};
