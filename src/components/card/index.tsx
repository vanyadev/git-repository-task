import Image from "next/image";
import React, { FC } from "react";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useRouter } from "next/router";

type CardProps = {
  img: string;
  name: string;
  commits: number;
};

export const Card: FC<CardProps> = ({ name, img, commits }) => {
  const router = useRouter();

  const handleViewRepositories = () => {
    router.push(`/${name}`);
  };
  return (
    <div className="flex flex-col justify-between pt-[30px] pr-[25px] pb-[23px] pl-[30px] w-[320px] h-[251px] bg-[#FFFFFF] rounded-[10px] ">
      <div className="flex">
        <div className="w-[72px] h-[72px] bg-[#ECF2FF] flex items-center justify-center">
          <Image alt="avatar" src={img} width={62} height={61} />
        </div>
        <div className="flex-1 text-[#545454] ml-[11px] flex items-end font-normal text-[12px]">
          @{name}
        </div>
        <div>
          <MyLocationIcon
            sx={{ width: "32px", height: "32px" }}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div>
        <p className="text-[#121212] text-lg font-bold">{name}</p>
        <p className="text-[#545454] text-[16px] leading-6">
          {commits} commits
        </p>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleViewRepositories}
          className="uppercase border-[#4474FF] border-2 text-[#4474FF] py-[13px] px-[12px]"
        >
          VIEW REPOSITORIES
        </button>
      </div>
    </div>
  );
};
