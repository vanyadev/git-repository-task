import axios from "axios";
import { useInfiniteQuery } from "react-query";

type Contributor = {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
  contributions: number;
};

type Data = {
  login: string;
  id: number;
  avatar_url: string;
  contributions: number;
  user_info: User;
};

type ApiResponse = {
  items: Data[];
  nextCursor: number;
  prevCursor: number;
};
export type User = {
  login: string;
  id: number;
  url: string;
  name: string;
  avatar_url: string;
  location: string | null;
};

const fetchContributors = async ({ pageParam = 1 }): Promise<ApiResponse> => {
  const response = await axios.get(
    `https://api.github.com/repos/angular/angular/contributors?page=${pageParam}&per_page=25`
  );
  const allContributors = response.data;

  const contributorsWithUserInfo = await Promise.all(
    allContributors.map(async (contributor: Contributor) => {
      const userResponse = await axios.get(contributor.url);
      const userInfo: User = userResponse.data;
      return {
        ...contributor,
        user_info: userInfo,
      };
    })
  );

  return {
    items: contributorsWithUserInfo,
    nextCursor: pageParam + 1,
    prevCursor: pageParam - 1,
  };
};

// const fetchContributors = async ({ pageParam = 1 }): Promise<ApiResponse> => {
//   const response = await axios.get(
//     `https://api.github.com/repos/angular/angular/contributors?page=${pageParam}&per_page=25`
//   );
//   const allContributors = response.data;

//   return {
//     items: response.data,
//     nextCursor: pageParam + 1,
//     prevCursor: pageParam - 1,
//   };
// };

export const useContributors = () => {
  return useInfiniteQuery<ApiResponse, Error>({
    queryKey: "contributors",
    queryFn: ({ pageParam = 1 }) => fetchContributors({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
  });
};
