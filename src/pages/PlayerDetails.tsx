import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TPlayer } from '../types';
import getPlayers from '../api/getPlayers';
import { ArrowLeft, Calendar, Trophy, Award, User2 } from 'lucide-react';

const PlayerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [player, setPlayer] = useState<TPlayer | null>(null);
  const [similarPlayers, setSimilarPlayers] = useState<TPlayer[]>([]);

  useEffect(() => {
    const fetchPlayer = async () => {
      const players = await getPlayers();
      const foundPlayer = players.find((p) => p.id === id);
      if (foundPlayer) {
        setPlayer(foundPlayer);
        // Fetch similar players
        const similar = players
          .filter((p) => p.type === foundPlayer.type && p.id !== foundPlayer.id)
          .slice(0, 5);
        setSimilarPlayers(similar);
      }
    };
    fetchPlayer();
  }, [id]);

  if (!player) {
    return <div>Loading...</div>;
  }

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
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Link
        to="/"
        className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Cricketers
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{player.name}</h1>
        <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
          {player.type || 'Unknown'}
        </span>

        <p className="text-gray-600 mb-8">{player.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="flex items-center">
            <Trophy className="w-6 h-6 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Points</p>
              <p className="text-lg font-semibold">{player.points}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Award className="w-6 h-6 text-purple-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Rank</p>
              <p className="text-lg font-semibold">{player.rank}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="w-6 h-6 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="text-lg font-semibold">
                {player.dob ? new Date(player.dob).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <User2 className="w-6 h-6 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Age</p>
              <p className="text-lg font-semibold">
                {player.dob ? getAge(player.dob) : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {similarPlayers.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Similar Players</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {similarPlayers.map((similarPlayer) => (
                <Link
                  key={similarPlayer.id}
                  to={`/player/${similarPlayer.id}`}
                  className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {similarPlayer.name}
                  </h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Points: {similarPlayer.points}</span>
                    <span>Rank: {similarPlayer.rank}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerDetails;