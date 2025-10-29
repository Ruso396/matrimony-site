import React from 'react';
import { Heart, Bell } from 'lucide-react';
import { useAdmin } from '../../../context/AdminContext';

const AdminHeader: React.FC = () => {
  const { adminName } = useAdmin();
  return (
    <header className="bg-white shadow-md">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Royal Delight</h1>
            <p className="text-xs text-gray-500">Admin Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {adminName ? adminName.charAt(0).toUpperCase() : 'A'}
            </div>
            <span className="text-sm font-medium text-gray-700">{adminName || 'Admin'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;