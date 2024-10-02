

const LeaderBoard = () => {
  // Sample data for the leaderboard based on referrals, including earnings
  const users = [
    { rank: 1, name: "Alice", referrals: 50, earnings: "$5000" },
    { rank: 2, name: "Bob", referrals: 45, earnings: "$4500" },
    { rank: 3, name: "Charlie", referrals: 30, earnings: "$3000" },
    { rank: 4, name: "David", referrals: 25, earnings: "$2500" },
    { rank: 5, name: "Eve", referrals: 20, earnings: "$2000" },
  ];

  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-5">
        Referral Leaderboard
      </h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="py-3 px-5 text-left text-gray-600 font-semibold">
              Rank
            </th>
            <th className="py-3 px-5 text-left text-gray-600 font-semibold">
              User
            </th>
            <th className="py-3 px-5 text-left text-gray-600 font-semibold">
              Referrals
            </th>
            <th className="py-3 px-5 text-left text-gray-600 font-semibold">
              Earnings
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.rank} className="border-b border-gray-200">
              <td className="py-3 px-5 text-gray-700">{user.rank}</td>
              <td className="py-3 px-5 text-gray-700">{user.name}</td>
              <td className="py-3 px-5 text-gray-700">{user.referrals}</td>
              <td className="py-3 px-5 text-gray-700">{user.earnings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
