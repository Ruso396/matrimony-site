import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './components/AdminHeader';
import AdminSidebar from './components/AdminSidebar';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import MatchManagement from './components/MatchManagement';
import Settings from './components/Settings';
import { User, Match } from './components/types';
import { AdminProvider } from '../../context/AdminContext';
import { ThemeProvider } from '../../context/ThemeContext';  // ✅ added
import { fetchUserStats } from './api/adminApi';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // ✅ Admin auth check
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const adminToken = localStorage.getItem('adminToken');
    if (!isAdmin || !adminToken) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // ✅ State for dashboard data
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<{
    totalUsers: number;
    pendingApprovals: number;
    activeUsers: number;
    successMatches: number;
    premiumUsers: number;
    recentUsers: User[];
  }>({
    totalUsers: 0,
    pendingApprovals: 0,
    activeUsers: 0,
    successMatches: 0,
    premiumUsers: 0,
    recentUsers: []
  });

  const [matches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Dashboard Data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const { users, stats: dashboardStats } = await fetchUserStats();
        setUsers(users);
        setStats(dashboardStats);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  // ✅ Action Handlers
  const approveUser = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: 'approved' } : u));
  };

  const rejectUser = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: 'rejected' } : u));
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };

  // ✅ Render
  return (
    <AdminProvider>
      <ThemeProvider>  {/* ✅ Wrap your entire admin dashboard with ThemeProvider */}
        <div className="min-h-screen bg-gray-100">
          <AdminHeader />  {/* Header includes theme selector */}
          <div className="flex">
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="flex-1 p-8">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <>
                  {activeTab === 'dashboard' && (
                    <Dashboard users={users} matches={matches} stats={stats} />
                  )}
                  {activeTab === 'users' && (
                    <UserManagement
                      users={users}
                      approveUser={approveUser}
                      rejectUser={rejectUser}
                      deleteUser={deleteUser}
                    />
                  )}
                  {activeTab === 'matches' && <MatchManagement matches={matches} />}
                  {activeTab === 'settings' && <Settings />}
                </>
              )}
            </main>
          </div>
        </div>
      </ThemeProvider>
    </AdminProvider>
  );
};

export default AdminPage;
