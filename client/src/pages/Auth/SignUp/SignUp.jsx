import { useState } from "react";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import ServerApi from "../../../api/serverApi";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error message
    try {
      setLoading(true);
      const response = await axios.post(ServerApi.signUp.url, formData);
      console.log(response);
      setSuccessMessage(response.data.msg); // Set success message on successful registration
      setErrorMessage(""); // Clear any previous error message
      setLoading(false);

      setFormData({
        email: "",
        username: "",
        password: "",
      });

      if (response.status === 200) { 
          navigate(`/verify/${formData.email}`)
      }
      
    } catch (error) {
       setLoading(false);
      console.log(error)
      if (error.response) {
        setErrorMessage(error.response.data.errors[0].msg); // Set error message based on response from backend
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-2/4 lg:w-1/3">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}{" "}
        {/* Display error message */}
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}{" "}
        {/* Display success message */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="flex items-center border rounded w-full py-2 px-3 shadow focus-within:ring-2 focus-within:ring-purple-500">
              <AiOutlineMail className="text-gray-500 mr-2" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full outline-none text-gray-700"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Username */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <div className="flex items-center border rounded w-full py-2 px-3 shadow focus-within:ring-2 focus-within:ring-purple-500">
              <AiOutlineUser className="text-gray-500 mr-2" />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full outline-none text-gray-700"
                placeholder="Choose a username"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center border rounded w-full py-2 px-3 shadow focus-within:ring-2 focus-within:ring-purple-500">
              <RiLockPasswordLine className="text-gray-500 mr-2" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full outline-none text-gray-700"
                placeholder="Enter a strong password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {
                loading
                  ? "Signing Up..."
                  : "Sign Up"
              }
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              have an account?{" "}
              <Link to="/login" className="text-purple-600 hover:underline">
                Partner Login
              </Link>
            </p>
          </div>
        </form>
        {/* Privacy Notice */}
        <p className="text-xs text-gray-500 mt-6 text-center">
          By continuing, you acknowledge and accept the terms of service.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
