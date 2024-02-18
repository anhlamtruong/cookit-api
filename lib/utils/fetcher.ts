import axios from "axios";

export const fetcher = (url: string) => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_APP_URL}${url}`)
    .then((res) => res.data);
};
