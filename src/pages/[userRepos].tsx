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
      fetch(`https://api.github.com/users/${userRepos}/repos`)
        .then((res) => res.json())
        .then((repos: Repo[]) =>
          repos.sort((a, b) => {
            const dateA = new Date(a.updated_at);
            const dateB = new Date(b.updated_at);
            return dateB.getTime() - dateA.getTime();
          })
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
            <div
              className="bg-white px-2 flex flex-col gap-2 py-2 rounded"
              key={repo.id}
            >
              <div>
                Repository name: <b>{repo.name}</b>
              </div>
              <div>
                Repository fullName: <b> {repo.full_name} </b>
              </div>
              <div>
                Description:
                <b>
                  {repo.description
                    ? ` ${repo.description}`
                    : " No description"}{" "}
                </b>
              </div>
              <div>
                Language:
                <b>{repo.language ? ` ${repo.language}` : " No language"}</b>
              </div>
              <div>
                Created at: <b> {formatDate(repo.created_at)}</b>
              </div>
              <div>
                Updated at: <b> {formatDate(repo.updated_at)}</b>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRepositories;
