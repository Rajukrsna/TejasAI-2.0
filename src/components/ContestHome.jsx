"use client";
import React, { useState } from "react";
import ContestCard from "./ContestCard";
import contest from "@/contest-details";

// const contests = [
//   {
//     title: "Used Bicycle as Transport",
//     img: "https://i.ibb.co/80MtHpm/cycle.jpg",
//     description: "Earn points by using a bicycle for transport.",
//     status: "Registered",
//     registeredBy: ["userids"],
//     contestTime: "2024-12-01T00:00:00.000Z"
//   },
//   {
//     title: "Recycled Plastic",
//     img: "https://i.ibb.co/LC3yssm/plastic.jpg",
//     description: "Upload proof of recycling plastic to earn points.",
//     status: "Live",
//     registeredBy: ["userids"],
//   },
//   {
//     title: "Ate Veg Full Day",
//     img: "https://i.ibb.co/qYMcPsL/veg.jpg",
//     description: "Earn points for eating only vegetables for an entire day!",
//     status: "Upcoming",
//     registeredBy: ["userids"],
//   },
//   {
//     title: "Carpooling",
//     img: "https://i.ibb.co/6JKjtpy/pool.png",
//     description: "Earn points by carpooling instead of driving alone.",
//     status: "Registered",
//     registeredBy: ["userids"],
//   },
//   {
//     title: "Zero Waste Shopping",
//     img: "https://i.ibb.co/Zxpq60d/zerowaste.jpg",
//     description: "Earn points for practicing zero-waste shopping.",
//     status: "Live",
//     registeredBy: ["userids"],
//   },
//   {
//     title: "Planted a Tree",
//     img: "https://i.ibb.co/qjjL51B/tree.jpg",
//     description: "Earn points by planting a tree.",
//     status: "Upcoming",
//     registeredBy: ["userids"],
//   },
//   {
//     title: "Switch to LED Bulbs",
//     img: "https://i.ibb.co/QvTChD4/bulb.jpg",
//     description: "Earn points for switching to energy-efficient LED bulbs.",
//     status: "Registered",
//     registeredBy: ["userids"],
//   },
//   {
//     title: "Plastic-Free Packaging",
//     img: "https://i.ibb.co/xJRhgKb/plasticf.jpg",
//     description: "Earn points by using plastic-free packaging.",
//     status: "Live",
//     registeredBy: ["userids"],
//   },
// ];

const ContestHome = () => {
  const [selectedCategory, setSelectedCategory] = useState("Upcoming");

  const filteredContests = contest.filter((contest) => {
    const contestDate = new Date(contest.timing).toDateString();
    const today = new Date().toDateString();

    if (selectedCategory === "Live") {
      return contestDate === today;
    } else if (selectedCategory === "Upcoming") {
      return new Date(contest.timing) > new Date();
    } else if (selectedCategory === "Registered") {
      return contest.status === "Registered";
    }
    return false; // Default fallback
  });

  return (
    <div className="flex flex-col items-center justify-center mb-[60px] mt-[30px]">
      <div className="flex flex-wrap items-center justify-center md:gap-16 gap-4 my-10 mt-8">
        <p
          onClick={() => setSelectedCategory("Upcoming")}
          className={`text-center text-base sm:text-xl md:text-2xl font-bold cursor-pointer ${
            selectedCategory === "Upcoming" ? "text-green-700" : "text-black"
          }`}
        >
          Upcoming Events
        </p>
        <p
          onClick={() => setSelectedCategory("Registered")}
          className={`text-center text-base sm:text-xl md:text-2xl font-bold cursor-pointer ${
            selectedCategory === "Registered" ? "text-green-700" : "text-black"
          }`}
        >
          Registered Events
        </p>
        <p
          onClick={() => setSelectedCategory("Live")}
          className={`text-center text-base sm:text-xl md:text-2xl font-bold cursor-pointer ${
            selectedCategory === "Live" ? "text-green-700" : "text-black"
          }`}
        >
          Live Events
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-[40px] gap-[20px] md:px-[80px] px-[20px] w-full">
          {filteredContests.map((contest, index) => (
          <ContestCard
            key={index}
            id={contest.id}
            img={contest.img}
            name={contest.title}
            description={contest.obj}
            short={contest.what_to_do}
            time={contest.timing}
          />
        ))}
      </div>
    </div>
  );
};

export default ContestHome;
