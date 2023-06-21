import React, { FC, useEffect, useState } from "react";
import { Card } from "../card";
import InfiniteScroll from "react-infinite-scroll-component";
import { useContributors } from "@/hook/ useContributor";

export const Home: FC = () => {
  const { data, fetchNextPage, isLoading, hasNextPage } = useContributors();

  return (
    <>
      <h1 className="font-bold text-[18px] pb-[12px] pt-[12px] border-b-[1px] border-[#C4C4C4] mb-[30px]">
        Top Contributors
      </h1>

      <InfiniteScroll
        dataLength={data?.pages.flatMap((page) => page.items).length || 0}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<></>}
        className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] place-items-center gap-[30px]"
      >
        {data?.pages
          .flatMap((page) => page.items)
          .map((item) => (
            <Card
              key={item.id}
              userInfo={item.user_info}
              commits={item.contributions}
            />
          ))}
      </InfiniteScroll>
      {isLoading && (
        <div className="w-full text-center font-normal mt-[15px] text-[#545454] text-[24px]">
          Loading...
        </div>
      )}
    </>
  );
};
