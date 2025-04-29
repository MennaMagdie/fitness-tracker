
import React from "react";
import { User } from "lucide-react";

const topUsers = [
  { name: "Sarah Johnson", points: 2500, rank: 1 },
  { name: "Mike Chen", points: 2350, rank: 2 },
  { name: "Alex Smith", points: 2200, rank: 3 },
];

export const Leaderboard = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Top Performers</h2>
      </div>
      <div className="card-content">
        <div className="space-y-4">
          {topUsers.map((user) => (
            <div key={user.name} className="leaderboard-item flex items-center justify-between">
              <div className="flex items-center">
                <span className={`rank-badge ${
                  user.rank === 1 ? 'rank-1' :
                  user.rank === 2 ? 'rank-2' :
                  'rank-3'
                }`}>
                  {user.rank}
                </span>
                <User className="h-8 w-8 text-gray-400 ml-2" />
                <span className="font-medium ml-2">{user.name}</span>
              </div>
              <span className="text-primary font-semibold">{user.points} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
