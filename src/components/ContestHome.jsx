"use client";
import React, { useEffect, useState } from "react";
import ContestCard from "./ContestCard";
import axios from "axios";
import { toast } from "react-toastify";

const ContestHome = () => {
  const [selectedCategory, setSelectedCategory] = useState("Upcoming");
  const [contests, setContests] = useState([]); // Ensure this is initialized as an array

  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const response = await axios.get("/api/contests/get-contests/");
        if (response.status === 200 && Array.isArray(response.data)) {
          setContests(response.data); // Set contests only if the response is an array
        } else {
          toast.error("Error while fetching contests");
        }
      } catch (error) {
        toast.error("Error connecting to server");
      }
    };

    fetchContestDetails();
  }, []); // Run only once when the component mounts

  // Ensure contests is an array before using filter
  const filteredContests = Array.isArray(contests) 
    ? contests.filter((contest) => {
        const contestDate = new Date(contest.timing).toDateString();
        const today = new Date().toDateString();

        if (selectedCategory === "Live") {
          return contestDate === today;
        } else if (selectedCategory === "Upcoming") {
          return new Date(contest.timing) > new Date();
        } else if (selectedCategory === "Registered") {
          return contest.status === "Registered";
        }
        return false;
      })
    : []; // Return an empty array if contests is not an array

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
        {filteredContests.length > 0 ? (
          filteredContests.map((contest, index) => (
            <ContestCard
              key={index}
              id={contest.id}
              img={contest.img}
              name={contest.title}
              description={contest.obj}
              short={contest.what_to_do}
              time={contest.timing}
            />
          ))
        ) : (
          <p>No contests available</p> // Show message if no contests match the filter
        )}
      </div>
    </div>
  );
};

export default ContestHome;
