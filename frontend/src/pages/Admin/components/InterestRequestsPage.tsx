import React, { useState } from 'react';
import { MessageCircle, Search, Filter, Clock, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';

interface InterestRequest {
  id: number;
  from: {
    name: string;
    age: number;
    profession: string;
    location: string;
    photo: string;
  };
  to: {
    name: string;
    age: number;
    profession: string;
    location: string;
    photo: string;
  };
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  sentDate: string;
  sentTime: string;
  respondedDate?: string;
  respondedTime?: string;
}

const InterestRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<InterestRequest | null>(null);

  // Sample interest requests data
  const interestRequests: InterestRequest[] = [
    {
      id: 1,
      from: {
        name: 'Rajesh Kumar',
        age: 28,
        profession: 'Software Engineer',
        location: 'Chennai',
        photo: '👨‍💼'
      },
      to: {
        name: 'Priya Sharma',
        age: 26,
        profession: 'Doctor',
        location: 'Coimbatore',
        photo: '👩‍⚕️'
      },
      message: 'Hi! I found your profile very interesting. Would love to connect and know more about you.',
      status: 'pending',
      sentDate: '2024-10-28',
      sentTime: '10:30 AM'
    },
    {
      id: 2,
      from: {
        name: 'Arun Venkat',
        age: 30,
        profession: 'Business Owner',
        location: 'Bangalore',
        photo: '👨‍💼'
      },
      to: {
        name: 'Divya Lakshmi',
        age: 27,
        profession: 'Teacher',
        location: 'Chennai',
        photo: '👩‍🏫'
      },
      message: 'Your profile caught my attention. I would like to take this forward.',
      status: 'accepted',
      sentDate: '2024-10-27',
      sentTime: '02:15 PM',
      respondedDate: '2024-10-27',
      respondedTime: '05:30 PM'
    },
    {
      id: 3,
      from: {
        name: 'Karthik Prasad',
        age: 32,
        profession: 'Architect',
        location: 'Hyderabad',
        photo: '👨‍🎨'
      },
      to: {
        name: 'Meera Reddy',
        age: 29,
        profession: 'HR Manager',
        location: 'Pune',
        photo: '👩‍💼'
      },
      message: 'Hello! I think we have a lot in common. Would like to connect with you.',
      status: 'rejected',
      sentDate: '2024-10-26',
      sentTime: '11:45 AM',
      respondedDate: '2024-10-26',
      respondedTime: '08:20 PM'
    },
    {
      id: 4,
      from: {
        name: 'Suresh Babu',
        age: 29,
        profession: 'Marketing Manager',
        location: 'Mumbai',
        photo: '👨‍💻'
      },
      to: {
        name: 'Anjali Nair',
        age: 25,
        profession: 'Chartered Accountant',
        location: 'Kochi',
        photo: '👩‍💼'
      },
      message: 'Your profile resonates with what I am looking for. Hope to hear from you soon.',
      status: 'pending',
      sentDate: '2024-10-28',
      sentTime: '03:00 PM'
    },
    {
      id: 5,
      from: {
        name: 'Vikram Singh',
        age: 31,
        profession: 'Civil Engineer',
        location: 'Delhi',
        photo: '👨‍🔧'
      },
      to: {
        name: 'Sneha Patel',
        age: 28,
        profession: 'Interior Designer',
        location: 'Ahmedabad',
        photo: '👩‍🎨'
      },
      message: 'Hi Sneha! I liked your profile and would love to get to know you better.',
      status: 'accepted',
      sentDate: '2024-10-25',
      sentTime: '09:00 AM',
      respondedDate: '2024-10-25',
      respondedTime: '01:30 PM'
    }
  ];

  const filteredRequests = interestRequests.filter(request => {
    const matchesSearch = 
      request.from.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.to.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.from.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.to.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusConfig = (status: 'pending' | 'accepted' | 'rejected') => {
    switch(status) {
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
          icon: Clock,
          label: 'Pending'
        };
      case 'accepted':
        return {
          color: 'bg-green-100 text-green-800 border-green-300',
          icon: CheckCircle,
          label: 'Accepted'
        };
      case 'rejected':
        return {
          color: 'bg-red-100 text-red-800 border-red-300',
          icon: XCircle,
          label: 'Rejected'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-300',
          icon: AlertCircle,
          label: status
        };
    }
  };

  const stats = {
    total: interestRequests.length,
    pending: interestRequests.filter(r => r.status === 'pending').length,
    accepted: interestRequests.filter(r => r.status === 'accepted').length,
    rejected: interestRequests.filter(r => r.status === 'rejected').length
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Interest Requests Management</h1>
          </div>
          <p className="text-gray-600">Monitor and track all interest requests between users</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-600 text-sm mb-1">Total Requests</div>
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-600 text-sm mb-1">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-600 text-sm mb-1">Accepted</div>
            <div className="text-2xl font-bold text-green-600">{stats.accepted}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-600 text-sm mb-1">Rejected</div>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or location..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

        {/* Interest Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => {
            const statusConfig = getStatusConfig(request.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div key={request.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Request Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-600">Request #{request.id}</span>
                    </div>
                    <span className={`flex items-center gap-2 px-3 py-1 rounded-lg border-2 font-semibold text-sm ${statusConfig.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      {statusConfig.label}
                    </span>
                  </div>

                  {/* Users Info */}
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    {/* Sender */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-xs text-blue-600 font-semibold mb-2">REQUEST FROM</p>
                      <div className="flex items-start gap-3">
                        <div className="text-4xl">{request.from.photo}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">{request.from.name}</h3>
                          <p className="text-sm text-gray-600">{request.from.age} years</p>
                          <p className="text-sm text-gray-600">{request.from.profession}</p>
                          <p className="text-sm text-gray-600">{request.from.location}</p>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center justify-center">
                      <div className="text-4xl text-blue-600">→</div>
                    </div>

                    {/* Receiver */}
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-xs text-purple-600 font-semibold mb-2">REQUEST TO</p>
                      <div className="flex items-start gap-3">
                        <div className="text-4xl">{request.to.photo}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">{request.to.name}</h3>
                          <p className="text-sm text-gray-600">{request.to.age} years</p>
                          <p className="text-sm text-gray-600">{request.to.profession}</p>
                          <p className="text-sm text-gray-600">{request.to.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-xs text-gray-600 font-semibold mb-2">MESSAGE</p>
                    <p className="text-gray-800">{request.message}</p>
                  </div>

                  {/* Timeline */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Sent: {request.sentDate} at {request.sentTime}</span>
                    </div>
                    {request.respondedDate && (
                      <>
                        <span className="text-gray-300">|</span>
                        <div className="flex items-center gap-2">
                          {request.status === 'accepted' ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                          <span>Responded: {request.respondedDate} at {request.respondedTime}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button 
                      onClick={() => setSelectedRequest(request)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View Full Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRequests.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Interest Requests Found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterestRequests;