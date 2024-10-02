import axios from "axios";
import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";
import ServerApi from "../../../api/serverApi";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(ServerApi.forgotPassword.url, formData,);

      console.log(response);
      setFormData({
        email: "",
      });

      setLoading(false);

     navigate(`/reset-password/${formData.email}`);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-2/4 lg:w-1/3">
        <h2 className="text-2xl font-bold text-center mb-6">Forget Password</h2>

        <form onSubmit={handleSubmit}>
          {/* New Code */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newCode"
            >
              Enter your email
            </label>
            <div className="flex items-center border rounded py-2 px-3 shadow">
              <AiOutlineMail className="text-gray-400 mr-2" />
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="outline-none w-full"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
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

export default ForgetPassword;