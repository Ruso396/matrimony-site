import React, { useState, useEffect } from 'react';
import { Search, Eye, Trash2, Crown, X, Heart, MapPin, Briefcase, Phone, Mail, Calendar, User, Award, Filter } from 'lucide-react';
// Assuming UserType is imported from './types' or a similar file in the real project structure.
// For this standalone file, we redefine it based on the previous context.

// Re-defining UserType/User interface for standalone functionality
export interface UserType {
  id: number;
  name: string;
  age: number;
  gender: string;
  religion: string;
  profession: string;
  location: string;
  status: 'pending' | 'approved' | 'rejected' | string; // Using string to cover 'rejected' status
  registeredDate: string;
  premium: boolean;
  email?: string;
  mobile?: string;
  profilePhoto?: string;
  education?: string;
  caste?: string;
  height?: string;
  maritalStatus?: string;
  motherTongue?: string;
  annualIncome?: string;
  country?: string;
  dob?: string;
  profileFor?: string;
}

// 🔑 DEFINITION OF THE COMPONENT'S PROPS
interface UserManagementProps {
  users: UserType[]; // Array of users passed from AdminPage
  approveUser: (id: number) => void;
  rejectUser: (id: number) => void;
  deleteUser: (id: number) => void;
}
// END OF PROPS DEFINITION

const UserManagement: React.FC<UserManagementProps> = ({ users: propUsers, approveUser, rejectUser, deleteUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null);

  // The users data now comes from the prop `propUsers` (passed from AdminPage)
  const users = propUsers; 
  
  // --- Filtering Logic ---
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  // -----------------------
  
  // --- Handlers ---
  const handleViewUser = (user: UserType) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleDeleteClick = (user: UserType) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  // 🔑 Call the deleteUser prop instead of a local alert
  const confirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      setShowDeleteModal(false);
      setUserToDelete(null);
      // Optional: Add a toast notification here if you use one globally
    }
  };

  const handleApprove = (id: number) => {
    approveUser(id);
  };

  const handleReject = (id: number) => {
    rejectUser(id);
  };
  // ----------------

  // --- Utility Functions ---
  const getStatusConfig = (status: string) => {
    const configs = {
      approved: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
      pending: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
      rejected: { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-200', dot: 'bg-rose-500' },
    };
    return configs[status as keyof typeof configs] || configs.approved;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  // -------------------------

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                User Management
              </h1>
              <p className="text-gray-600 mt-1">Manage matrimonial profiles and memberships</p>
            </div>
          </div>
        </div>

        {/* Stats Cards (Now using the passed-in 'users' array length) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* ... (Your existing stats card JSX remains the same) */}
          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-800">{users.length}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <User className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Approved</p>
                <p className="text-3xl font-bold text-emerald-600">
                  {users.filter(u => u.status === 'approved').length}
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Award className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-3xl font-bold text-amber-600">
                  {users.filter(u => u.status === 'pending').length}
                </p>
              </div>
              <div className="p-3 bg-amber-100 rounded-xl">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Premium</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {users.filter(u => u.premium).length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Crown className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6">
          {/* ... (Your existing search/filter JSX remains the same) */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, profession, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Filter className="w-5 h-5 text-gray-500" />
              {['all', 'approved', 'pending', 'rejected'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    statusFilter === status
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredUsers.map((user) => {
            const statusConfig = getStatusConfig(user.status);
            return (
              <div
                key={user.id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  {/* ... (Your existing header, info grid, and location JSX remains the same) */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {user.profilePhoto ? (
                        <img
                          src={user.profilePhoto}
                          alt={user.name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-pink-100"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                          {getInitials(user.name)}
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                        <p className="text-sm text-gray-500">ID: #{user.id}</p>
                      </div>
                    </div>
                    {user.premium && (
                      <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        <Crown className="w-4 h-4" fill="currentColor" />
                        Premium
                      </div>
                    )}
                  </div>

                  {/* User Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Age</p>
                        <p className="text-sm font-semibold text-gray-800">{user.age} years</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <User className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Gender</p>
                        <p className="text-sm font-semibold text-gray-800">{user.gender}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Briefcase className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Profession</p>
                        <p className="text-sm font-semibold text-gray-800 truncate">{user.profession}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Heart className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Religion</p>
                        <p className="text-sm font-semibold text-gray-800">{user.religion}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-600">{user.location}</p>
                  </div>


                  {/* Status, Approval/Rejection, and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                      <span className={`w-2 h-2 rounded-full ${statusConfig.dot}`}></span>
                      <span className="text-sm font-semibold capitalize">{user.status}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* 🔑 Conditional Approval/Rejection Buttons */}
                        {user.status === 'pending' && (
                            <>
                                <button
                                    onClick={() => handleApprove(user.id)}
                                    className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-600 rounded-xl transition-colors"
                                    title="Approve User"
                                >
                                    <Award className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleReject(user.id)}
                                    className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-600 rounded-xl transition-colors"
                                    title="Reject User"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </>
                        )}
                        
                        {/* View Button */}
                        <button
                          onClick={() => handleViewUser(user)}
                          className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-xl transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteClick(user)}
                          className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-xl transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredUsers.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-12 text-center">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No users found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* View User Modal (JSX remains the same, using selectedUser) */}
      {showViewModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          {/* ... (Modal JSX for viewing details) */}
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Profile Details</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col items-center mb-8">
                {selectedUser.profilePhoto ? (
                  <img
                    src={selectedUser.profilePhoto}
                    alt={selectedUser.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-pink-200 shadow-lg mb-4"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-lg mb-4">
                    {getInitials(selectedUser.name)}
                  </div>
                )}
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{selectedUser.name}</h3>
                <div className="flex items-center gap-3">
                  {selectedUser.premium && (
                    <span className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      <Crown className="w-4 h-4" fill="currentColor" />
                      Premium Member
                    </span>
                  )}
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusConfig(selectedUser.status).bg} ${getStatusConfig(selectedUser.status).text}`}>
                    {selectedUser.status}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <label className="text-sm font-bold text-blue-900">Personal Info</label>
                  </div>
                  <p className="text-gray-700"><strong>Profile For:</strong> {selectedUser.profileFor || 'Self'}</p>
                  <p className="text-gray-700"><strong>Age:</strong> {selectedUser.age} years</p>
                  <p className="text-gray-700"><strong>DOB:</strong> {selectedUser.dob || 'N/A'}</p>
                  <p className="text-gray-700"><strong>Gender:</strong> {selectedUser.gender}</p>
                  <p className="text-gray-700"><strong>Height:</strong> {selectedUser.height || 'N/A'} ft</p>
                  <p className="text-gray-700"><strong>Marital Status:</strong> {selectedUser.maritalStatus || 'N/A'}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <label className="text-sm font-bold text-purple-900">Religious Background</label>
                  </div>
                  <p className="text-gray-700"><strong>Religion:</strong> {selectedUser.religion}</p>
                  <p className="text-gray-700"><strong>Caste:</strong> {selectedUser.caste || 'N/A'}</p>
                  <p className="text-gray-700"><strong>Mother Tongue:</strong> {selectedUser.motherTongue || 'N/A'}</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <label className="text-sm font-bold text-green-900">Professional Details</label>
                  </div>
                  <p className="text-gray-700"><strong>Education:</strong> {selectedUser.education || 'N/A'}</p>
                  <p className="text-gray-700"><strong>Occupation:</strong> {selectedUser.profession}</p>
                  <p className="text-gray-700"><strong>Annual Income:</strong> {selectedUser.annualIncome || 'N/A'}</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-500 rounded-lg">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <label className="text-sm font-bold text-orange-900">Location</label>
                  </div>
                  <p className="text-gray-700"><strong>Country:</strong> {selectedUser.country || 'N/A'}</p>
                  <p className="text-gray-700"><strong>Location:</strong> {selectedUser.location}</p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-pink-500 rounded-lg">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <label className="text-sm font-bold text-pink-900">Contact Info</label>
                  </div>
                  <p className="text-gray-700"><strong>Email:</strong> {selectedUser.email || 'N/A'}</p>
                  <p className="text-gray-700"><strong>Mobile:</strong> {selectedUser.mobile || 'N/A'}</p>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-indigo-500 rounded-lg">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <label className="text-sm font-bold text-indigo-900">Registration</label>
                  </div>
                  <p className="text-gray-700"><strong>Registered:</strong> {selectedUser.registeredDate}</p>
                  <p className="text-gray-700"><strong>Account Type:</strong> {selectedUser.premium ? 'Premium' : 'Free'}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex justify-end bg-gray-50">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal (JSX remains the same, but calls confirmDelete) */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          {/* ... (Modal JSX for delete confirmation) */}
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-10 h-10 text-rose-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Delete User?</h3>
              <p className="text-gray-600">
                Are you sure you want to delete <strong className="text-gray-800">{userToDelete.name}</strong>?
              </p>
              <p className="text-sm text-rose-600 mt-2">This action cannot be undone.</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setUserToDelete(null);
                }}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl hover:from-rose-600 hover:to-rose-700 transition-all shadow-md font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;