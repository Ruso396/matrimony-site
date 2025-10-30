import React, { useState, useEffect } from 'react';
import { MessageCircle, Search, Filter, Clock, CheckCircle, XCircle, AlertCircle, Loader, TrendingUp, Users, Heart } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api/request';

interface UserInfo {
  id: number;
  fullName: string;
  age: number;
  profession: string;
  city: string;
  profileImage: string;
}

interface InterestRequest {
  id: number;
  senderId: number;
  receiverId: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
  sender: UserInfo;
  receiver: UserInfo;
}

const InterestRequests = () => {
  const [requests, setRequests] = useState<InterestRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<InterestRequest | null>(null);

  const fetchInterestRequests = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/all`);
      const data = await response.json();

      if (data.success) {
        setRequests(data.data);
        setError(null);
      } else {
        setError('Failed to fetch interest requests');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterestRequests();
  }, []);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.sender.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.receiver.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.sender.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.receiver.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusConfig = (status: 'pending' | 'accepted' | 'rejected') => {
    switch(status) {
      case 'pending':
        return {
          color: 'bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border-amber-200',
          badgeColor: 'bg-amber-500',
          icon: Clock,
          label: 'Pending'
        };
      case 'accepted':
        return {
          color: 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border-emerald-200',
          badgeColor: 'bg-emerald-500',
          icon: CheckCircle,
          label: 'Accepted'
        };
      case 'rejected':
        return {
          color: 'bg-gradient-to-r from-rose-50 to-red-50 text-rose-700 border-rose-200',
          badgeColor: 'bg-rose-500',
          icon: XCircle,
          label: 'Rejected'
        };
      default:
        return {
          color: 'bg-gray-50 text-gray-700 border-gray-200',
          badgeColor: 'bg-gray-500',
          icon: AlertCircle,
          label: status
        };
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const dateFormatted = date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    const timeFormatted = date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    return { date: dateFormatted, time: timeFormatted };
  };

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    accepted: requests.filter(r => r.status === 'accepted').length,
    rejected: requests.filter(r => r.status === 'rejected').length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="relative">
            <Loader className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
            <Heart className="w-6 h-6 text-pink-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="text-gray-600 font-medium">Loading interest requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Gradient */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Interest Requests
                </h1>
                <p className="text-gray-500 mt-1">Track and monitor all connection requests</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-xl p-4 shadow-lg animate-pulse">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <span className="text-red-800 font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-gray-600 text-sm font-medium mb-1">Total Requests</div>
            <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-amber-100 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">New</div>
            </div>
            <div className="text-gray-600 text-sm font-medium mb-1">Pending</div>
            <div className="text-3xl font-bold text-amber-600">{stats.pending}</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-emerald-100 p-3 rounded-xl">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <Heart className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-gray-600 text-sm font-medium mb-1">Accepted</div>
            <div className="text-3xl font-bold text-emerald-600">{stats.accepted}</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-rose-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-rose-100 p-3 rounded-xl">
                <XCircle className="w-6 h-6 text-rose-600" />
              </div>
            </div>
            <div className="text-gray-600 text-sm font-medium mb-1">Rejected</div>
            <div className="text-3xl font-bold text-rose-600">{stats.rejected}</div>
          </div>
        </div>

        {/* Enhanced Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-indigo-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search by name or location..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border-2 border-gray-200">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                className="bg-transparent border-none focus:ring-0 font-medium text-gray-700 cursor-pointer"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Interest Requests List */}
        <div className="space-y-6">
          {filteredRequests.map((request) => {
            const statusConfig = getStatusConfig(request.status);
            const StatusIcon = statusConfig.icon;
            const sentDateTime = formatDateTime(request.createdAt);
            const respondedDateTime = request.updatedAt !== request.createdAt ? formatDateTime(request.updatedAt) : null;

            return (
              <div key={request.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200">
                {/* Status Bar */}
                <div className={`h-2 ${statusConfig.badgeColor}`}></div>
                
                <div className="p-6">
                  {/* Request Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-bold text-gray-700">Request #{request.id}</span>
                    </div>
                    <span className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-bold text-sm ${statusConfig.color} shadow-sm`}>
                      <StatusIcon className="w-4 h-4" />
                      {statusConfig.label}
                    </span>
                  </div>

                  {/* Users Info */}
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    {/* Sender */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border-2 border-blue-100 hover:border-blue-300 transition-all">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <p className="text-xs text-blue-700 font-bold tracking-wide">REQUEST FROM</p>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-100 ring-4 ring-blue-200 shadow-lg">
                            {request.sender.profileImage ? (
                              <img 
                                src={request.sender.profileImage} 
                                alt={request.sender.fullName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-2xl font-bold bg-gradient-to-br from-blue-400 to-indigo-500 text-white">
                                {request.sender.fullName.charAt(0)}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 mb-1 text-lg">{request.sender.fullName}</h3>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                              {request.sender.age} years
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                              {request.sender.profession}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                              {request.sender.city}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center justify-center">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full shadow-lg">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Receiver */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border-2 border-purple-100 hover:border-purple-300 transition-all">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <p className="text-xs text-purple-700 font-bold tracking-wide">REQUEST TO</p>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full overflow-hidden bg-purple-100 ring-4 ring-purple-200 shadow-lg">
                            {request.receiver.profileImage ? (
                              <img 
                                src={request.receiver.profileImage} 
                                alt={request.receiver.fullName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-2xl font-bold bg-gradient-to-br from-purple-400 to-pink-500 text-white">
                                {request.receiver.fullName.charAt(0)}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 mb-1 text-lg">{request.receiver.fullName}</h3>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                              {request.receiver.age} years
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                              {request.receiver.profession}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                              {request.receiver.city}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="flex flex-wrap items-center gap-4 text-sm bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">Sent:</span>
                      <span className="text-gray-800 font-semibold">{sentDateTime.date}</span>
                      <span className="text-gray-500">at</span>
                      <span className="text-gray-800 font-semibold">{sentDateTime.time}</span>
                    </div>
                    {respondedDateTime && request.status !== 'pending' && (
                      <>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-2 text-gray-600">
                          {request.status === 'accepted' ? (
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-500" />
                          )}
                          <span className="font-medium">Responded:</span>
                          <span className="text-gray-800 font-semibold">{respondedDateTime.date}</span>
                          <span className="text-gray-500">at</span>
                          <span className="text-gray-800 font-semibold">{respondedDateTime.time}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRequests.length === 0 && !loading && (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center border border-gray-100">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No Interest Requests Found</h3>
            <p className="text-gray-500 text-lg">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'No interest requests have been made yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterestRequests;