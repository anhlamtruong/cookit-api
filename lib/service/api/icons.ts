import axios from "axios";

export const fetchIconsFirebase = async (): Promise<SVGIcons[]> => {
  const { data } = await axios.get<SVGIcons[]>("/api/icons");

  return data ?? [];
};
