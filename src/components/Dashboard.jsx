"use client";
import { useState } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const Dashboard = () => {
  const username = "John Doe";
  const points = 75;
  const co2Emitted = 120;
  const maxCo2Footprint = 200;
  const contribution = Math.floor((co2Emitted / maxCo2Footprint) * 100);
  const suggestions = [
    "Switch to energy-efficient appliances",
    "Carpool or use public transportation",
    "Recycle and compost whenever possible",
  ];
  const co2Percentage = contribution;

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto p-6 bg-white shadow-xl rounded-lg">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Welcome, {username}!
        </h2>

        {/* First Row: Your Points, CO2 Activity Breakdown, CO2 Footprint */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Points Section */}
          <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-center mb-4">
              Your Points
            </h3>
            <div className="text-center mb-4">
              <img
                src="https://i.ibb.co/s56NLRW/download.jpg"
                alt="Points Icon"
                className="w-24 mx-auto rounded-lg shadow-md"
              />
            </div>
            <p className="text-4xl font-bold text-center text-black">
              {points}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
              <div
                className="bg-orange-400 h-3 rounded-full"
                style={{ width: `${points}%` }}
              ></div>
            </div>
            <p className="text-center mt-2 text-white text-sm">
              Your current points
            </p>
          </div>

          {/* CO₂ Activity Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-center mb-4">
              CO₂ Activity Breakdown
            </h2>
            <canvas id="myPieChart"></canvas>
          </div>

          {/* CO₂ Footprint Section */}
          <div className="bg-gradient-to-r from-green-500 to-red-400 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-center mb-4">
              CO₂ Footprint
            </h3>
            <div className="text-center mb-4">
              <img
                src="https://img.icons8.com/ios-filled/50/ffffff/earth-planet.png"
                alt="Earth Icon"
                className="w-16 mx-auto"
              />
            </div>
            <div className="text-base">
              <p>
                <strong>Emitted:</strong> {co2Emitted} kg
              </p>
              <p>
                <strong>Maximum Threshold:</strong> {maxCo2Footprint} kg
              </p>
              <p>
                <strong>Contribution:</strong> {contribution}%
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
              <div
                className="bg-orange-400 h-3 rounded-full"
                style={{ width: `${contribution}%` }}
              ></div>
            </div>
            <p className="text-center mt-2 text-white text-sm">
              Your contribution to the total CO₂ footprint among the users
            </p>
          </div>
        </div>

        {/* Second Row: Emission Level, Monthly CO₂ Chart, Suggestions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Emission Level Section */}
          <div className="bg-gradient-to-br from-orange-600 to-orange-400 p-5 rounded-lg shadow-lg">
            <h3 className="text-white text-2xl font-semibold text-center mb-5">
              Your Emission Level
            </h3>

            {/* Icon Section */}
            <div className="text-center mb-5">
              <a href="https://imgbb.com/">
                <img
                  src="https://i.ibb.co/KNcvGkJ/print2.webp"
                  alt="Emission Icon"
                  width={300}
                  height={200}
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
              </a>
            </div>

            {/* Progress Bar */}
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600">
                    Emission Progress
                  </span>
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-full bg-gray-200 rounded-full">
                  <div
                    className="bg-red-600 text-xs font-medium text-center p-0.5 leading-none rounded-full"
                    style={{ width: `${co2Percentage}%` }}
                  >
                    <span className="text-white">{co2Percentage}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Emission Data */}
            <div className="text-center text-white font-bold text-xl mb-4">
              <p className="text-black">
                You&apos;ve emitted {co2Emitted} kg of CO₂ out of your maximum
                allowed {maxCo2Footprint} kg.
              </p>
            </div>

            {/* Emission Status */}
            <p className="text-center text-white text-sm">
              Based on your current emission level, {co2Percentage}% of your
              limit has been used.
            </p>
          </div>

          {/* Monthly CO₂ Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-center mb-4">
              Monthly CO₂ Footprint
            </h3>
            <canvas id="co2Chart" width="400" height="200"></canvas>
          </div>

          {/* Suggestions Section */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Suggestions</h3>
            <div className="flex flex-col space-y-4">
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-4 bg-green-100 rounded-lg border-l-4 border-green-700 shadow-sm transition-transform transform hover:scale-105"
                  >
                    <strong>Suggestion {index + 1}:</strong> {suggestion}
                  </div>
                ))
              ) : (
                <div>No suggestions available at the moment.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
