import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Authservice from "./services/auth";
import { login, logout } from "./features/authSlice";
import { Loader } from "lucide-react";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await Authservice.getUser();
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.log("No active session:", error.message);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold">
      <Loader className="animate-spin duration-75 transition-all inline-block mr-2" size={20}/>
      Loading
      </div>
    );
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
