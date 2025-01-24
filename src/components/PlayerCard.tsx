import React from 'react';
import { TPlayer } from '../types';
import { Trophy, User2, Award } from 'lucide-react';

interface PlayerCardProps {
  player: TPlayer;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const getAge = (dob: number) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{player.name}</h3>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {player.type || 'Unknown'}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center">
          <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
          <span className="text-gray-600">Points: {player.points}</span>
        </div>
        <div className="flex items-center">
          <Award className="w-5 h-5 text-purple-500 mr-2" />
          <span className="text-gray-600">Rank: {player.rank}</span>
        </div>
        <div className="flex items-center">
          <User2 className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-gray-600">Age: {player.dob ? getAge(player.dob) : 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;