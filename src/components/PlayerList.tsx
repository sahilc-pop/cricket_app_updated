import React, { useEffect } from 'react';
import { TPlayer, TPlayerType } from '../types';
import PlayerCard from './PlayerCard';
import { Search, Filter } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

interface PlayerListProps {
  players: TPlayer[];
  onTypeFilter: (type: TPlayerType | '') => void;
  onSearch: (query: string) => void;
  onSort: (key: 'name' | 'rank' | 'age') => void;
  selectedType: TPlayerType | '';
  searchQuery: string;
}

const PlayerList: React.FC<PlayerListProps> = ({
  players,
  onTypeFilter,
  onSearch,
  onSort,
  selectedType,
  searchQuery,
}) => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = React.useState(1);
  const playersPerPage = 10;
  const [currentSort, setCurrentSort] = React.useState<'name' | 'rank' | 'age' | ''>(
    (searchParams.get('sort') as 'name' | 'rank' | 'age' | '') || ''
  );

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const playerTypes: TPlayerType[] = ['batsman', 'bowler', 'allRounder', 'wicketKeeper'];

  useEffect(() => {
    const sortParam = searchParams.get('sort') as 'name' | 'rank' | 'age' | '';
    if (sortParam) {
      setCurrentSort(sortParam);
    }
  }, [searchParams]);

  const handleSort = (key: 'name' | 'rank' | 'age') => {
    setCurrentSort(currentSort === key ? '' : key);
    onSort(key);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => onTypeFilter(e.target.value as TPlayerType | '')}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="">All Types</option>
              {playerTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleSort('name')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentSort === 'name'
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Sort by Name
          </button>
          <button
            onClick={() => handleSort('rank')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentSort === 'rank'
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Sort by Rank
          </button>
          <button
            onClick={() => handleSort('age')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentSort === 'age'
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Sort by Age
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentPlayers.map((player) => (
          <Link key={player.id} to={`/player/${player.id}`}>
            <PlayerCard player={player} />
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {Array.from({ length: Math.ceil(players.length / playersPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;