import { useState, useEffect, useRef } from "react";
import { FaChartLine, FaRegCircleUser, FaUsers } from "react-icons/fa6";
import Overview from "./Overview";
import LeaderBoard from "./LeaderBoard";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import Referrals from "./Referrals";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/userSlice";
import axios from "axios";
import ServerApi from "../../api/serverApi";

const Dashboard = () => {
  const { user } = useSelector((state) => state?.user);
  const [selectedComponent, setSelectedComponent] = useState("Overview");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown element
  const dispatch = useDispatch();

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mouseEnter", handleClickOutside);
    return () => {
      document.removeEventListener("mouseEnter", handleClickOutside);
    };
  }, []);

  const handleLinkClick = (component) => {
    setSelectedComponent(component);
    setDropdownOpen(false); // Close the dropdown when a link is clicked
  };

  const handleLogout = async () => {
    try {
      await axios.get(ServerApi.logout.url, {
        withCredentials: true,
      });
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="flex justify-between md:block w-full md:w-1/5 h-auto md:h-screen bg-[#056573] p-5">
          <h1 className="text-xl md:text-xl text-white font-bold mb-10">
            Affiliate Dashboard
          </h1>
          <nav className="hidden md:block">
            <ul className="space-y-5">
              <li
                onClick={() => handleLinkClick("Overview")}
                className={`${
                  selectedComponent === "Overview" && "bg-[#3D3D3D] text-white"
                } text-white cursor-pointer font-semibold duration-300 hover:bg-[#3D3D3D] p-2 rounded-lg`}
              >
                <FaHome className="inline-block mr-2" /> Overview
              </li>
              <li
                onClick={() => handleLinkClick("LeaderBoard")}
                className={`${
                  selectedComponent === "LeaderBoard" &&
                  "bg-[#3D3D3D] text-white"
                } text-white cursor-pointer font-semibold duration-300 hover:bg-[#3D3D3D] p-2 rounded-lg`}
              >
                <FaChartLine className="inline-block mr-2" /> Leader Board
              </li>
              <li
                onClick={() => handleLinkClick("Referrals")}
                className={`${
                  selectedComponent === "Referrals" && "bg-[#3D3D3D] text-white"
                } text-white cursor-pointer font-semibold duration-300 hover:bg-[#3D3D3D] p-2 rounded-lg`}
              >
                <FaUsers className="inline-block mr-2" /> Referrals
              </li>
            </ul>
          </nav>
          <div className="block md:hidden relative">
            <button
              className="bg-gray-500 text-white rounded-full h-10 w-10 flex items-center justify-center"
              onClick={handleDropdown}
            >
              <FaRegCircleUser />
            </button>

            {/* Dropdown Menu (visible on mobile) */}
            {dropdownOpen && (
              <ul
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-black"
              >
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLinkClick("Overview")}
                >
                  <FaHome className="inline-block mr-2" /> Overview
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLinkClick("LeaderBoard")}
                >
                  <FaChartLine className="inline-block mr-2" /> Leader Board
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLinkClick("Referrals")}
                >
                  <FaUsers className="inline-block mr-2" /> Referrals
                </li>
                <li
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <FaSignOutAlt className="inline-block mr-2" /> Logout
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full max-h-[100vh] md:w-4/5 p-5 md:p-10 overflow-y-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-0">
              {user?.username}
            </h2>
            <div className="flex space-x-3 items-center">
              <button className="bg-[#3D3D3D] text-white py-2 px-4 rounded">
                Connect Wallet
              </button>

              {/* User Icon for Mobile */}
              <div className="hidden md:block relative">
                <button
                  className="bg-gray-500 text-white rounded-full h-10 w-10 flex items-center justify-center"
                  onClick={handleDropdown}
                >
                  <FaRegCircleUser />
                </button>

                {/* Dropdown Menu (visible on mobile) */}
                {dropdownOpen && (
                  <ul
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-black"
                  >
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="inline-block mr-2" /> Logout
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Dynamic Component Rendering */}
          {selectedComponent === "Overview" && <Overview />}
          {selectedComponent === "LeaderBoard" && <LeaderBoard />}
          {selectedComponent === "Referrals" && <Referrals />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
