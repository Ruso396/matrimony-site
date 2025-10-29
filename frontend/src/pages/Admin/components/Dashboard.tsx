import React from 'react';
import { Users, Bell, UserCheck, Heart } from 'lucide-react';
import { User, Match, Stats } from './types';

interface DashboardProps {
  users: User[];
  matches: Match[];
  stats: Stats;
}

const Dashboard: React.FC<DashboardProps> = ({ users, matches, stats }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Total Users</p>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </div>
            <Users className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm mb-1">Pending Approvals</p>
              <p className="text-3xl font-bold">{stats.pendingApprovals}</p>
            </div>
            <Bell className="w-12 h-12 text-orange-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Active Users</p>
              <p className="text-3xl font-bold">{stats.activeUsers}</p>
            </div>
            <UserCheck className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm mb-1">Success Matches</p>
              <p className="text-3xl font-bold">{stats.successMatches}</p>
            </div>
            <Heart className="w-12 h-12 text-pink-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Registrations</h3>
          <div className="space-y-3">
            {users.slice(0, 4).map(user => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.profession}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user.status === 'approved' ? 'bg-green-100 text-green-800' :
                  user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h3>
          <div className="space-y-3">
            {matches.map(match => (
              <div key={match.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Heart className="w-5 h-5 text-pink-500 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">{match.user1}</span> and{' '}
                    <span className="font-medium">{match.user2}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{match.status} • {match.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;