// "use client";
// import React, { useState, useEffect } from "react";
// import Modal from "./Modal";
// import ContestRegisterForm from "./ContestRegisterForm";
// import { useSearchParams } from "next/navigation";
// import contest from "@/contest-details";

// const ContestDetails = () => {
//   const [selectedContest, setSelectedContest] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [queryParams, setQueryParams] = useState({
//     title: "",
//     description: "",
//     time: "",
//   });

//   const searchParams = useSearchParams();
//   useEffect(() => {
//     const title = searchParams.get("title") || "Default Title";
//     const description =
//       searchParams.get("description") || "Default Description";
//     const timing = searchParams.get("time") || "";
//     setQueryParams({
//       title,
//       description,
//       time: timing,
//     });
//     const matchingContest = contest.find((contest) => contest.title === title);
//     if (matchingContest) {
//       setSelectedContest(matchingContest);
//     } else {
//       setSelectedContest(null);
//     }
//     console.log("selected contest is", selectedContest);
//   }, [searchParams]);
//   const [contestTime, setContestTime] = useState("");
//   useEffect(() => {
//     if (queryParams.time) {
//       setContestTime(queryParams.time);
//     }
//   }, [queryParams.time]);
//   const [remainingTime, setRemainingTime] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

//   useEffect(() => {
//     if (!contestTime) return;

//     const contestDate = new Date(contestTime); // Convert contestTime string to Date object

//     const interval = setInterval(() => {
//       const now = new Date();
//       const timeDifference = contestDate - now;

//       if (timeDifference <= 0) {
//         clearInterval(interval);
//         setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//       } else {
//         const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//         const hours = Math.floor(
//           (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//         );
//         const minutes = Math.floor(
//           (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
//         );
//         const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

//         setRemainingTime({ days, hours, minutes, seconds });
//       }
//     }, 1000); // Update every second

//     return () => clearInterval(interval); // Clean up the interval when component is unmounted
//   }, [contestTime]); // Re-run effect when contestTime changes

//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//   return (
//     <div className="w-full h-[84vh] bg-red">
//       <div className="w-full fixed flex py-4">
//         <div className="w-[20%] flex flex-col items-center justify-center bg-gray-100 rounded-lg m-[20px] h-[200px]">
//           <div>
//             <p className="text-center font-semibold my-[10px]">
//               Contest Starts in
//             </p>
//           </div>
//           <div className="flex items-center bg-gray-300 p-[10px] rounded-lg">
//             <div className="flex flex-col items-center">
//               <p>{remainingTime.days}</p>
//               <p>Days</p>
//             </div>
//             <p className="mx-3">:</p>
//             <div className="flex flex-col items-center">
//               <p>{remainingTime.hours}</p>
//               <p>Hours</p>
//             </div>
//             <p className="mx-3">:</p>
//             <div className="flex flex-col items-center">
//               <p>{remainingTime.minutes}</p>
//               <p>Mins</p>
//             </div>
//             <p className="mx-3">:</p>
//             <div className="flex flex-col items-center">
//               <p>{remainingTime.seconds}</p>
//               <p>Secs</p>
//             </div>
//           </div>
//           <div className="my-[20px]">
//             <button
//               className="bg-green-500 text-white px-[20px] py-[10px] rounded-lg"
//               onClick={handleOpenModal}
//             >
//               Register Here!
//             </button>
//           </div>
//         </div>
//         <div className="overflow-y-scroll h-full w-[80%] p-[10px]">
//           <h2 className="text-3xl font-semibold text-center">
//             Tejas Weekly Contest
//           </h2>
//           <div className="flex items-center text-lg">
//             <p className="mr-[10px]">Title:</p>
//             <p className="text-2xl text-green-600 font-bold">
//               {queryParams.title}
//             </p>
//           </div>
//           <p className="font-semibold text-2xl my-[10px]">Description</p>
//           <p className="text-lg">{queryParams.description}</p>
//           <div className="bg-gray-200 p-[10px] my-[10px]">
//             <p className="font-semibold text-2xl">Instructions</p>

//             {selectedContest.sub_process &&
//               selectedContest.sub_process.length > 0 && (
//                 <div className="my-4">
//                   <p className="font-semibold text-2xl">Steps to Participate</p>
//                   <ul className="list-disc list-inside">
//                     {selectedContest.sub_process.map((step, index) => (
//                       <li key={index} className="text-lg">
//                         {step}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//             {selectedContest.scoring && selectedContest.scoring.length > 0 && (
//               <div className="my-4">
//                 <p className="font-semibold text-2xl">Scoring</p>
//                 <ul className="list-disc list-inside">
//                   {selectedContest.scoring.map((rule, index) => (
//                     <li key={index} className="text-lg">
//                       {rule}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Verification Rules */}
//             {selectedContest.verification_rules &&
//               selectedContest.verification_rules.length > 0 && (
//                 <div className="my-4">
//                   <p className="font-semibold text-2xl">Verification Rules</p>
//                   <ul className="list-disc list-inside">
//                     {selectedContest.verification_rules.map((rule, index) => (
//                       <li key={index} className="text-lg">
//                         {rule}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//             {/* Completion Reward */}
//             {selectedContest.completion_reward &&
//               selectedContest.completion_reward.length > 0 && (
//                 <div className="my-4">
//                   <p className="font-semibold text-2xl">Completion Rewards</p>
//                   <ul className="list-disc list-inside">
//                     {selectedContest.completion_reward.map((reward, index) => (
//                       <li key={index} className="text-lg">
//                         {reward}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//           </div>
//         </div>
//       </div>

//       <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
//         <ContestRegisterForm />
//       </Modal>
//     </div>
//   );
// };

// export default ContestDetails;







"use client";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import ContestRegisterForm from "./ContestRegisterForm";
import { useSearchParams } from "next/navigation";
import contest from "@/contest-details";

const ContestDetails = () => {
  const [selectedContest, setSelectedContest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queryParams, setQueryParams] = useState({
    title: "",
    description: "",
    time: "",
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    const title = searchParams.get("title") || "Default Title";
    const description =
      searchParams.get("description") || "Default Description";
    const timing = searchParams.get("time") || "";

    setQueryParams({
      title,
      description,
      time: timing,
    });

    const matchingContest = contest.find((c) => c.title === title);
    setSelectedContest(matchingContest || null);
  }, [searchParams]);

  const [contestTime, setContestTime] = useState("");
  useEffect(() => {
    if (queryParams.time) {
      setContestTime(queryParams.time);
    }
  }, [queryParams.time]);

  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!contestTime) return;

    const contestDate = new Date(contestTime);

    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = contestDate - now;

      if (timeDifference <= 0) {
        clearInterval(interval);
        setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setRemainingTime({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [contestTime]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="w-full h-[84vh]">
      <div className="w-full fixed flex py-4">
        {/* date and time  */}
        <div className="w-[20%] x flex flex-col items-center justify-center bg-gray-100 rounded-lg m-[20px] h-[200px]">
          <p className="text-center font-semibold my-[10px]">
            Contest Starts in
          </p>
          <div className="flex items-center bg-gray-300 p-[10px] rounded-lg">
            <div className="flex flex-col items-center">
              <p>{remainingTime.days}</p>
              <p>Days</p>
            </div>
            <p className="mx-3">:</p>
            <div className="flex flex-col items-center">
              <p>{remainingTime.hours}</p>
              <p>Hours</p>
            </div>
            <p className="mx-3">:</p>
            <div className="flex flex-col items-center">
              <p>{remainingTime.minutes}</p>
              <p>Mins</p>
            </div>
            <p className="mx-3">:</p>
            <div className="flex flex-col items-center">
              <p>{remainingTime.seconds}</p>
              <p>Secs</p>
            </div>
          </div>
          <button
            className="bg-green-500 text-white px-[20px] py-[10px] rounded-lg my-[20px]"
            onClick={handleOpenModal}
          >
            Register Here!
          </button>
        </div>

        {/* right side component  */}
        <div className="overflow-y-scroll h-[89vh] w-[80%] p-[10px] border-l-2 border-black">
          <h2 className="text-3xl font-semibold text-center">
            Tejas Weekly Contest
          </h2>
          <div className="flex items-center text-lg">
            <p className="mr-[10px]">Title:</p>
            <p className="text-2xl text-green-600 font-bold">
              {queryParams.title}
            </p>
          </div>
          <p className="font-semibold text-2xl my-[10px]">Description</p>
          <p className="text-lg">{queryParams.description}</p>
          <div className=" p-[10px] my-[10px] mb-[50px]">
            <p className="font-semibold text-2xl">Instructions</p>

            {selectedContest?.sub_process?.length > 0 && (
              <div className="my-4">
                <p className="font-semibold text-2xl">Steps to Participate</p>
                <ul className="list-disc list-inside">
                  {selectedContest.sub_process.map((step, index) => (
                    <li key={index} className="text-lg">
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedContest?.scoring?.length > 0 && (
              <div className="my-4">
                <p className="font-semibold text-2xl">Scoring</p>
                <ul className="list-disc list-inside">
                  {selectedContest.scoring.map((rule, index) => (
                    <li key={index} className="text-lg">
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedContest?.verification_rules?.length > 0 && (
              <div className="my-4">
                <p className="font-semibold text-2xl">Verification Rules</p>
                <ul className="list-disc list-inside">
                  {selectedContest.verification_rules.map((rule, index) => (
                    <li key={index} className="text-lg">
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedContest?.completion_reward?.length > 0 && (
              <div className="my-4">
                <p className="font-semibold text-2xl">Completion Rewards</p>
                <ul className="list-disc list-inside">
                  {selectedContest.completion_reward.map((reward, index) => (
                    <li key={index} className="text-lg">
                      {reward}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ContestRegisterForm />
      </Modal>
    </div>
  );
};

export default ContestDetails;
