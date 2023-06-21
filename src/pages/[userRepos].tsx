import axios from "axios";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";

type Repo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  language: string;
};

const UserRepositories: FC = () => {
  const router = useRouter();
  const { userRepos } = router.query;

  const { data, error, isLoading } = useQuery<Repo[], Error>(
    "repositories",
    () =>
      fetch(`https://api.github.com/users/${userRepos}/repos`).then((res) =>
        res.json()
      )
  );

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  };

  if (error) return <>Error</>;

  return (
    <div className="px-[35px]  h-full w-full">
      <h1 className="font-bold text-[18px] pb-[12px] pt-[10px] border-b-[1px] border-[#C4C4C4] mb-[30px]">
        {userRepos} repositories
      </h1>
      {isLoading || data?.length === 0 ? (
        <>Loading...</>
      ) : (
        <div className="flex flex-col gap-y-[10px]">
          {data?.map((repo) => (
            <div className="bg-white px-2 flex flex-col gap-2" key={repo.id}>
              <div>Repository name: {repo.name}</div>
              <div>Repository fullName: {repo.full_name}</div>
              <div>
                Description:
                {repo.description ? ` ${repo.description}` : " No description"}
              </div>
              <div>
                Language:
                {repo.language ? ` ${repo.language}` : " No language"}
              </div>
              <div>Created at: {formatDate(repo.created_at)}</div>
              <div>Updated at: {formatDate(repo.updated_at)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRepositories;
