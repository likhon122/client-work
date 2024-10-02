function Overview() {
  return (
    <>
      {/* Overview Section */}
      <div className="my-8">
        <h3 className="text-lg font-semibold">Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="p-5 bg-[#056573] rounded-lg shadow-lg">
            <h4 className="text-white">Account Balance</h4>
            <p className="text-2xl font-bold text-white">$30,659.45</p>
            <a href="#" className="text-white">
              View all
            </a>
          </div>
          <div className="p-5 bg-[#3D3D3D] rounded-lg shadow-lg">
            <h4 className="text-white">Pending</h4>
            <p className="text-white text-2xl font-bold">-19,369.45</p>
            <a href="#" className="text-blue-500">
              View all
            </a>
          </div>
          <div className="p-5 bg-[#3D3D3D] rounded-lg shadow-lg">
            <h4 className="text-white">Processed (Last 30 days)</h4>
            <p className="text-white text-2xl font-bold">$28,750.00</p>
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
                <td className="py-3 px-4 text-[#056573]">Success</td>
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
    </>
  );
}

export default Overview