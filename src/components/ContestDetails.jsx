"use client"
import React, { useState } from "react";
import Modal from "./Modal";
import ContestRegisterForm from "./ContestRegisterForm";

const ContestDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="w-full h-[84vh] bg-red">
      <div className="w-full fixed flex py-4">
        <div className="w-[20%] flex flex-col items-center justify-center bg-gray-100 rounded-lg m-[20px] h-[200px]">
          <div>
            <p className="text-center font-semibold my-[10px]">
              Contest Starts in
            </p>
          </div>
          <div className="flex items-center bg-gray-300 p-[10px] rounded-lg">
            <div className="flex flex-col items-center">
              <p>04</p>
              <p>Days</p>
            </div>
            <p className="mx-3">:</p>
            <div className="flex flex-col items-center">
              <p>07</p>
              <p>Hours</p>
            </div>
            <p className="mx-3">:</p>
            <div className="flex flex-col items-center">
              <p>31</p>
              <p>Mins</p>
            </div>
            <p className="mx-3">:</p>
            <div className="flex flex-col items-center">
              <p>20</p>
              <p>Secs</p>
            </div>
          </div>
          <div className="my-[20px]">
            <button
              className="bg-green-500 text-white px-[20px] py-[10px] rounded-lg"
              onClick={handleOpenModal}
            >
              Register Here!
            </button>
          </div>
        </div>
        <div className="overflow-y-scroll h-full w-[80%] p-[10px]">
          <h2 className="text-3xl font-bold">Tejas Weekly Contest</h2>
          <p className="font-semibold text-2xl my-[10px]">Description</p>
          <p>
            Reduce single-use plastic consumption for one week. Use alternatives
            like reusable bags, glass containers, and metal straws. Upload
            pictures of your efforts to earn points and inspire others!
          </p>
          <div className="bg-gray-200 p-[10px] my-[10px]">
            <p className="font-semibold text-2xl">Instructions</p>
            <p>Here instructions!!!</p>
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
