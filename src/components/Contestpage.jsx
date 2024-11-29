"use client";
import { useState, useEffect } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import Modal from "./Modal";
import ContestUploadForm from "./ContestUploadForm";

const Contestpage = () => {
  const role = "user";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const targetScore = 200;
  const [score, setScore] = useState(0); // Initial score is 0

  useEffect(() => {
    let start = 0;
    const end = targetScore;
    const duration = 2000; // Duration of the animation in milliseconds
    const incrementTime = 50; // Interval time for each increment (in ms)
    const step = Math.ceil((end - start) / (duration / incrementTime)); // The amount to increment in each step

    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(interval); // Stop the animation once it reaches the target score
        setScore(end); // Set final score
      } else {
        setScore(start); // Update score during animation
      }
    }, incrementTime);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="flex w-full h-[calc(100vh-80px)]">
          <div className="w-[20%] flex flex-col items-center justify-center bg-white rounded-lg m-[20px]">
            <h2 className="font-bold text-3xl my-[10px]">Your Score</h2>
            <h1 className="font-extrabold text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              {score}
            </h1>
          </div>
          <div className="w-[80%] bg-white rounded-lg shadow-xl m-[20px] p-[20px] flex flex-col justify-between">
            <div className="overflow-y-scroll h-[calc(100vh-200px)]">
              <div className="space-y-4">
                <p
                  className={`p-5 rounded-md ${
                    role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  Hello all
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button
                className="flex items-center w-full p-3 justify-center rounded-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #6A11CB, #2575FC, #FF9A8B)",
                  color: "white",
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                }}
                onClick={handleOpenModal}
              >
                <IoCloudUploadOutline className="text-white mr-4" size={30} />
                <p className="text-2xl text-white">Upload</p>
              </button>
            </div>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ContestUploadForm />
        </Modal>
      </div>
    </>
  );
};

export default Contestpage;
