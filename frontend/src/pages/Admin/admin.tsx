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

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const adminToken = localStorage.getItem('adminToken');

    if (!isAdmin || !adminToken) {
      navigate('/admin/login');
    } else {
      // Fetch users from backend
      fetchUsers();
    }
  }, [navigate]);

  // ✅ Fetch users from backend API
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/register/users');
      const data = await response.json();

      if (response.ok && data.users) {
        // ✅ Transform backend data to match User interface
        const transformedUsers: User[] = data.users.map((user: any) => ({
          id: user.id,
          name: user.fullName,
          age: user.age,
          gender: user.gender,
          religion: user.religion,
          profession: user.occupation,
          location: `${user.city}, ${user.state}`,
          status: 'approved', // Default status
          registeredDate: new Date(user.createdAt).toISOString().split('T')[0],
          premium: user.isPremium || false,
        }));

        setUsers(transformedUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const [matches] = useState<Match[]>([
    { id: 1, user1: 'Rajesh Sharma', user2: 'Priya Kumar', status: 'Connected', date: '2025-10-28' },
    { id: 2, user1: 'Mohammed Ali', user2: 'Anjali Patel', status: 'Interest Sent', date: '2025-10-27' },
    { id: 3, user1: 'Sarah Joseph', user2: 'Rajesh Sharma', status: 'Viewed Profile', date: '2025-10-26' },
  ]);

  const stats = {
    totalUsers: users.length,
    pendingApprovals: users.filter(u => u.status === 'pending').length,
    activeUsers: users.filter(u => u.status === 'approved').length,
    successMatches: 147,
    premiumUsers: users.filter(u => u.premium).length,
  };

  const approveUser = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: 'approved' } : u));
  };

  const rejectUser = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: 'rejected' } : u));
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-100">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="flex-1 p-8">
            {activeTab === 'dashboard' && (
              <Dashboard
                users={users}
                matches={matches}
                stats={stats}
              />
            )}
            {activeTab === 'users' && (
              <UserManagement
                users={users}
                approveUser={approveUser}
                rejectUser={rejectUser}
                deleteUser={deleteUser}
              />
            )}
            {activeTab === 'matches' && (
              <MatchManagement
                matches={matches}
              />
            )}
            {activeTab === 'settings' && <Settings />}
          </main>
        </div>
      </div>
    </AdminProvider>
  );
};

export default AdminPage;