import React from 'react';
import { BarChart3, Users, Heart, Settings, CreditCard, FileText, Bell } from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
      </div>
      
      <nav className="p-4">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
            activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
            activeTab === 'users' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="font-medium">Users</span>
        </button>

        <button
          onClick={() => setActiveTab('matches')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
            activeTab === 'matches' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Heart className="w-5 h-5" />
          <span className="font-medium">Matches</span>
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
            activeTab === 'payments' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <CreditCard className="w-5 h-5" />
          <span className="font-medium">Payment Details</span>
        </button>

        <button
          onClick={() => setActiveTab('interestRequestsPage')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
            activeTab === 'interestRequestsPage' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="font-medium">Interest Requests</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
            activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Bell className="w-5 h-5" />
          <span className="font-medium">Notifications</span>
        </button>

        <div className="border-t my-4 pt-4">
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;