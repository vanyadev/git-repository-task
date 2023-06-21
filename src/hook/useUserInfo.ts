import axios from "axios";
import { useQuery } from "react-query";

export const useUserInfo = (name: string) =>
  useQuery({
    queryKey: ["userInfo", name],
    queryFn: () =>
      axios.get(`https://api.github.com/users/${name}`).then((res) => res.data),
  });
