import Link from "next/link";
import React from "react";

const ContestCard = ({ id, name, img, description, time }) => {
  return (
    <Link  href={{
      pathname: `/contest_details/${id}/`,
    }}>
      <div className="p-[14px] shadow-xl rounded-xl bg-gradient-to-r from-green-300 to-blue-300 pb-[60px] md:my-[20px] my-[10px] cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
        <div>
          <img
            src={img}
            className="rounded-lg w-full h-[250px]"
            alt="contest image"
          />
        </div>
        <div className="flex items-center justify-between">
          <p>December 14, 2024</p>
          <p>8.00 PM IST</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mt-[7px]">{name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ContestCard;
