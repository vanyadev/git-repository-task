import axios from "axios";
import { useInfiniteQuery } from "react-query";

interface Contributor {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  contributions: number;
}

interface ApiResponse {
  items: Contributor[];
  nextCursor: number;
  prevCursor: number;
}

const fetchContributors = async ({ pageParam = 1 }): Promise<ApiResponse> => {
  console.log("pageParam -", pageParam);
  const response = await axios.get(
    `https://api.github.com/repos/angular/angular/contributors?page=${pageParam}&per_page=25`
  );
  return {
    items: response.data,
    nextCursor: pageParam + 1,
    prevCursor: pageParam - 1,
  };
};

export const useContributors = () => {
  return useInfiniteQuery<ApiResponse, Error>({
    queryKey: "contributors",
    queryFn: ({ pageParam = 1 }) => fetchContributors({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
  });
};
