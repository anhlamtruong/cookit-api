import {
  Chef,
  ProfilePictures,
} from "@/generated/cookit-ecommerce-service/@prisma-client-cookit-ecommerce-service";
import axios from "axios";

export const fetchChef = async (): Promise<
  Chef & { profilePictures: ProfilePictures[] }
> => {
  const { data } = await axios.get<
    Chef & { profilePictures: ProfilePictures[] }
  >("/api/admin/chef");

  return data;
};

export const createNewChef = async ({
  newChef,
}: {
  newChef: Chef & { profilePictures: ProfilePictures[] };
}): Promise<Chef & { profilePictures: ProfilePictures[] }> => {
  return newChef;
};
