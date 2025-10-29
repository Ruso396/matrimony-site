import React from 'react';
import { Eye, Edit } from 'lucide-react';
import { Match } from './types';

interface MatchManagementProps {
  matches: Match[];
}

const MatchManagement: React.FC<MatchManagementProps> = ({ matches }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Match Management</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Match ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User 1</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User 2</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {matches.map(match => (
              <tr key={match.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-800">#{match.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{match.user1}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{match.user2}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    {match.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{match.date}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatchManagement;