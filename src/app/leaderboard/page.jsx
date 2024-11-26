"use client"
import React from 'react';

export default function Leaderboard() {
  // Sample users data
  const users = [
    { username: 'User1', points: 200 },
    { username: 'User2', points: 180 },
    { username: 'User3', points: 150 },
    { username: 'User4', points: 120 },
    { username: 'User5', points: 95 },
  ];

  // Find the maximum points to calculate percentage based on the highest points
  const maxPoints = Math.max(...users.map((user) => user.points));

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-center text-4xl font-bold my-8">Leaderboard</h1>

      {/* Confetti Animation for Top Rank */}
      <div className="confetti relative">
        <span className="animate-confetti" style={{ animationDelay: '0.2s' }}></span>
        <span className="animate-confetti" style={{ animationDelay: '0.4s' }}></span>
        <span className="animate-confetti" style={{ animationDelay: '0.6s' }}></span>
        <span className="animate-confetti" style={{ animationDelay: '0.8s' }}></span>
        <span className="animate-confetti" style={{ animationDelay: '1s' }}></span>
      </div>

      <table className="table-auto w-full mt-4 border-collapse animate__animated animate__fadeIn">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Rank</th>
            <th className="px-4 py-2 border">Username</th>
            <th className="px-4 py-2 border">Points</th>
            <th className="px-4 py-2 border">Progress</th>
          </tr>
        </thead>
        <tbody>
          {users.map((use, index) => {
            // Calculate the percentage for each user's points
            const percentage = (use.points / maxPoints) * 100;

            return (
              <tr
                key={use.username}
                className={`${index === 0 ? 'animate__animated animate__flash' : ''}`}
              >
                <td className="px-4 py-2 border">
                  {index + 1}
                  <span className="emoji">
                    {index === 0
                      ? '🥇'
                      : index === 1
                      ? '🥈'
                      : index === 2
                      ? '🥉'
                      : ''}
                  </span>
                </td>
                <td className="px-4 py-2 border">{use.username}</td>
                <td className="px-4 py-2 border">{use.points}</td>
                <td className="px-4 py-2 border">
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor:
                          percentage > 80
                            ? '#4CAF50'
                            : percentage > 50
                            ? '#FFC107'
                            : '#F44336',
                      }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <footer>
        <p className="text-center mt-8 text-sm">Leaderboard powered by our awesome community!</p>
      </footer>

      {/* Tailwind CSS for the animation and styling */}
      <style jsx>{`
        .confetti span {
          position: absolute;
          display: block;
          width: 5px;
          height: 5px;
          background-color: #ffba03;
          animation: confetti 1s linear infinite;
        }

        .confetti span:nth-child(odd) {
          background-color: #ff7659;
        }

        @keyframes confetti {
          0% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
          100% {
            transform: translateX(200px) translateY(-200px) rotate(720deg);
          }
        }
      `}</style>
    </div>
  );
}
