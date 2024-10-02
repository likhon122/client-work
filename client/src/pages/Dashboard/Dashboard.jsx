
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/5 h-auto md:h-screen bg-[#3D3D3D] p-5">
          <h1 className="text-2xl md:text-3xl text-white font-bold mb-10">
            Template
          </h1>
          <nav>
            <ul className="space-y-5">
              <li className="text-white font-semibold">
                <i className="fas fa-home"></i> Overview
              </li>
              <li className="text-white">
                <i className="fas fa-history"></i> Leader Board
              </li>
              <li className="text-white">
                <i className="fas fa-balance-scale"></i> Balances
              </li>
              <li className="text-white">
                <i className="fas fa-credit-card"></i> Cards
              </li>
              <li className="text-white">
                <i className="fas fa-cog"></i> Settings
              </li>
              <li className="text-white">
                <i className="fas fa-question-circle"></i> Help
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-4/5 p-5 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-0">
              Good morning, Jane Doe
            </h2>
            <div className="flex space-x-3">
              <button className="bg-[#3D3D3D] text-white py-2 px-4 rounded">
                Add Money
              </button>
              <button className="bg-[#707070] text-white py-2 px-4 rounded">
                Send Money
              </button>
            </div>
          </div>

          {/* Overview Section */}
          <div className="my-8">
            <h3 className="text-lg font-semibold">Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div className="p-5 bg-white rounded-lg shadow-lg">
                <h4 className="text-gray-600">Account Balance</h4>
                <p className="text-2xl font-bold">$30,659.45</p>
                <a href="#" className="text-blue-500">
                  View all
                </a>
              </div>
              <div className="p-5 bg-white rounded-lg shadow-lg">
                <h4 className="text-gray-600">Pending</h4>
                <p className="text-2xl font-bold">-19,369.45</p>
                <a href="#" className="text-blue-500">
                  View all
                </a>
              </div>
              <div className="p-5 bg-white rounded-lg shadow-lg">
                <h4 className="text-gray-600">Processed (Last 30 days)</h4>
                <p className="text-2xl font-bold">$28,750.00</p>
                <a href="#" className="text-blue-500">
                  View all
                </a>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="my-8">
            <h3 className="text-lg font-semibold">Recent activity</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-lg">
                <thead>
                  <tr>
                    <th className="py-3 px-4 text-left">Transaction</th>
                    <th className="py-3 px-4 text-left">Amount</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-3 px-4">Payment from Molly Sanders</td>
                    <td className="py-3 px-4">$20,000 USD</td>
                    <td className="py-3 px-4 text-green-500">Success</td>
                    <td className="py-3 px-4">May 5, 2020</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-4">Payment to Doug Mann</td>
                    <td className="py-3 px-4">$14,200 USD</td>
                    <td className="py-3 px-4 text-yellow-500">Processing</td>
                    <td className="py-3 px-4">April 28, 2020</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
