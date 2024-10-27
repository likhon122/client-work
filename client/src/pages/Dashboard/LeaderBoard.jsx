import React, { useEffect, useState } from "react";
import axios from "axios";

const backendDomain = "http://localhost:5000"; // Update this if needed

const WithdrawDetails = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await axios.get(
          `${backendDomain}/admin/get-withdrawals`
        );
        setWithdrawals(response.data.withdrawals); // Assuming your API returns { withdrawals: [...] }
      } catch (error) {
        console.error("Error fetching withdrawal data:", error);
      }
    };

    fetchWithdrawals();
  }, []);

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-xl md:text-3xl font-bold text-center mb-5">
        Withdrawal Details
      </h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-lg">
        <thead>
          <tr className="bg-white border-b border-gray-200">
            <th className="py-3 px-2 md:py-3 md:px-5 text-left font-semibold">
              ID
            </th>
            <th className="py-3 md:py-3 md:px-5 text-left font-semibold">
              Email
            </th>
            <th className="py-3 md:py-3 md:px-5 text-left font-semibold">
              Token Type
            </th>
            <th className="py-3 md:py-3 md:px-5 text-left font-semibold">
              Network
            </th>
            <th className="py-3 md:py-3 md:px-5 text-left font-semibold">
              Amount
            </th>
            <th className="py-3 md:py-3 md:px-5 text-left font-semibold">
              Address
            </th>
            <th className="py-3 md:py-3 md:px-5 text-left font-semibold">
              Created At
            </th>
            <th className="py-3 md:py-3 md:px-5 text-left font-semibold">
              Updated At
            </th>
          </tr>
        </thead>
        <tbody>
          {withdrawals.length > 0 ? (
            withdrawals.map((withdrawal) => (
              <tr key={withdrawal.id} className="border-b border-gray-200">
                <td className="py-3 px-2 md:py-3 md:px-5">{withdrawal.id}</td>
                <td className="py-3 md:py-3 md:px-5">{withdrawal.email}</td>
                <td className="py-3 md:py-3 md:px-5">{withdrawal.tokenType}</td>
                <td className="py-3 md:py-3 md:px-5">{withdrawal.network}</td>
                <td className="py-3 md:py-3 md:px-5">{withdrawal.amount}</td>
                <td className="py-3 md:py-3 md:px-5">{withdrawal.address}</td>
                <td className="py-3 md:py-3 md:px-5">
                  {new Date(withdrawal.createdAt).toLocaleString()}
                </td>
                <td className="py-3 md:py-3 md:px-5">
                  {new Date(withdrawal.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4">
                No withdrawal data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WithdrawDetails;
