
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ServerApi from "../../../api/serverApi";
import { FaKey, FaLock, FaSpinner } from "react-icons/fa";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    code: "",
  });

  const [loading, setLoading] = useState(false);
  const [redirectingLoading, setRedirectingLoading] = useState(false);  
  const navigate = useNavigate();
  const { email } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      formData.email = email;
      await axios.post(ServerApi.resetPassword.url, formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setFormData({
        email: "",
      });

      setLoading(false);
      setRedirectingLoading(true);
      setTimeout(() => {
       setRedirectingLoading(false);
        navigate("/login");
      }, 3000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  if (redirectingLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="flex h-full w-full justify-center items-center min-h-screen bg-transparent">
          <div className="flex flex-col items-center space-y-4">
            <FaSpinner className="animate-spin text-blue-500 text-6xl" />
            <span className="text-gray-700 text-xl font-semibold">
              Verification Successful Redirecting to login
            </span>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-2/4 lg:w-1/3">
        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit}>
          {/* New Code */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newCode"
            >
              Reset OTP Code
            </label>
            <div className="flex items-center border rounded py-2 px-3 shadow">
              <FaKey className="text-gray-400 mr-2" />
              <input
                type="text"
                id="newCode"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                className="outline-none w-full"
                placeholder="Enter the reset OTP code"
              />
            </div>
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <div className="flex items-center border rounded py-2 px-3 shadow">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                id="newPassword"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="outline-none w-full"
                placeholder="Enter your new password"
              />
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </div>
        </form>

        {/* Privacy Notice */}
        <p className="text-xs text-gray-500 mt-6 text-center">
          You must have cookies enabled to use this site. <br />
          <Link to="/forgot-password" className="underline">
            View our Privacy Policy
          </Link>{" "}
          •{" "}
          <Link to={"/forgot-password"} className="underline">
            Email Support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
