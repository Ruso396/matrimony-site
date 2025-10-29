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

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const adminToken = localStorage.getItem('adminToken');

    if (!isAdmin || !adminToken) {
      navigate('/admin/login');
    }
  }, [navigate]);
  
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Priya Kumar', age: 26, gender: 'Female', religion: 'Hindu', profession: 'Software Engineer', location: 'Chennai', status: 'pending', registeredDate: '2025-10-25', premium: false },
    { id: 2, name: 'Rajesh Sharma', age: 29, gender: 'Male', religion: 'Hindu', profession: 'Doctor', location: 'Mumbai', status: 'approved', registeredDate: '2025-10-24', premium: true },
    { id: 3, name: 'Anjali Patel', age: 24, gender: 'Female', religion: 'Hindu', profession: 'Teacher', location: 'Ahmedabad', status: 'approved', registeredDate: '2025-10-23', premium: false },
    { id: 4, name: 'Mohammed Ali', age: 28, gender: 'Male', religion: 'Muslim', profession: 'Business', location: 'Hyderabad', status: 'pending', registeredDate: '2025-10-22', premium: true },
    { id: 5, name: 'Sarah Joseph', age: 25, gender: 'Female', religion: 'Christian', profession: 'Designer', location: 'Bangalore', status: 'rejected', registeredDate: '2025-10-21', premium: false },
  ]);

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