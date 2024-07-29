import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Chef,
  ProfilePictures,
} from "@/generated/cookit-ecommerce-service/@prisma-client-cookit-ecommerce-service";
import { fetchChef } from "@/lib/service/api/chef";
export const useChef = () => {
  return useQuery({
    queryKey: ["chef"],
    queryFn: () => fetchChef(),
  });
};

export const useUpdateChef = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateChef,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chef"] });
    },
  });
};

export const updateChef = async ({
  chef,
}: {
  chef: Chef & { profilePictures: ProfilePictures[] };
}): Promise<Chef & { profilePictures: ProfilePictures[] }> => {
  return chef;
};
