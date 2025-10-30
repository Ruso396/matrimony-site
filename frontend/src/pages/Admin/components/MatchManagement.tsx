import React, { useEffect, useState } from "react";

interface Match {
  id: number;
  senderName: string;
  receiverName: string;
  senderAge: number;
  receiverAge: number;
  senderCity: string;
  receiverCity: string;
  senderPhoto?: string;
  receiverPhoto?: string;
  createdAt: string;
}

const MatchManagement: React.FC = ()=> {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/request/all-matches");
      const data = await res.json();
      if (data.success) setMatches(data.matches);
    } catch (err) {
      console.error("Error fetching matches:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Match Management 💞</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 shadow rounded-lg p-6 text-center border border-blue-300">
          <h3 className="text-blue-700 text-sm font-medium mb-2">Total Matches</h3>
          <p className="text-4xl font-bold text-blue-800">{matches.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-100 to-green-200 shadow rounded-lg p-6 text-center border border-green-300">
          <h3 className="text-green-700 text-sm font-medium mb-2">Recent Matches</h3>
          <p className="text-4xl font-bold text-green-800">
            {matches.slice(0, 5).length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-pink-100 to-pink-200 shadow rounded-lg p-6 text-center border border-pink-300">
          <h3 className="text-pink-700 text-sm font-medium mb-2">Success Rate</h3>
          <p className="text-4xl font-bold text-pink-800">
            {matches.length > 0 ? "100%" : "0%"}
          </p>
        </div>
      </div>

      {matches.length === 0 ? (
        <div className="text-center mt-16 text-gray-500">
          <p>No matches found 💔</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-pink-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Match ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Sender</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">💕</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Receiver</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Matched On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {matches.map((match, index) => (
                  <tr key={match.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">#{match.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={match.senderPhoto || "/default-avatar.png"}
                          alt="Sender"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{match.senderName}</p>
                          <p className="text-xs text-gray-500">
                            {match.senderAge} yrs • {match.senderCity}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-2xl">❤️</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={match.receiverPhoto || "/default-avatar.png"}
                          alt="Receiver"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{match.receiverName}</p>
                          <p className="text-xs text-gray-500">
                            {match.receiverAge} yrs • {match.receiverCity}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(match.createdAt).toLocaleDateString()} <br />
                      <span className="text-xs text-gray-400">
                        {new Date(match.createdAt).toLocaleTimeString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchManagement;