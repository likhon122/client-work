import { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { fetchUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(typeof location.pathname)

  useEffect(() => {
    /** Fetch user details */
    const fetchData = async () => {
      await dispatch(fetchUserDetails()).unwrap();
    };
    fetchData();
  }, [dispatch, user]);

  useEffect(() => {
    if (
      !user &&
      location.pathname !== "/login" &&
      location.pathname !== "/sign-up" &&
      location.pathname !== "/forgot-password" &&
      !location.pathname.startsWith("/verify")
    ) {
      navigate("/login");
    } 
  }, [user, navigate, location.pathname]);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  },[user, navigate]);
  
  console.log(loading);
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="flex h-full w-full justify-center items-center min-h-screen bg-transparent">
          <div className="flex flex-col items-center space-y-4">
            <FaSpinner className="animate-spin text-blue-500 text-6xl" />
            <span className="text-gray-700 text-xl font-semibold">
              Loading...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-[calc(100vh-120px)]">
        <Outlet />
      </main>
    </>
  );
}

export default App;
