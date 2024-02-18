import {
  Chef,
  ProfilePictures,
} from "@/generated/cookit-ecommerce-service/@prisma-client-cookit-ecommerce-service";
import axios from "axios";

export const fetchChef = async (): Promise<Chef & ProfilePictures[]> => {
  const { data } = await axios.get<Chef & ProfilePictures[]>("/api/admin/chef");

  return data;
};

export const createNewChef = async ({
  newChef,
}: {
  newChef: Chef & ProfilePictures[];
}): Promise<Chef & ProfilePictures[]> => {
  return newChef;
};
