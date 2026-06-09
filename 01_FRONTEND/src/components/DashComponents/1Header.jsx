import { useEffect, useState } from "react";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, Bell, ChevronDown, ChevronUp, LogOut, Settings, Sparkles } from "lucide-react";
import API from "../../api";
import React from "react";
import logo from "../../assets/logoicon.png";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate=useNavigate();
  // const wrapperClassName = [className, legacyClassName].filter(Boolean).join(" ");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingout, setloggingout] = useState(false)
  const [open, setopen] = useState(false)

  // 🔥 Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        if (res.data.user) {
          console.log("User logged in");
          setUser(res.data.user);
          console.log("user is set:");
        }
      } catch (err) {
        console.log("Not logged in");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 🔥 Logout
  const handleLogout = async () => {
    try{
      setloggingout(true);
      const res=await API.post("/auth/logout");
      setUser(null);
      console.log("USer is unset:");
      alert(res.data.message);
      setTimeout(()=>{navigate("/")},800);

    } catch(err){
      console.log("Logout Error: ",err.response?.data || err.message);
      alert(err.response?.data?.message || "Logout faield");
    } finally{
      setloggingout(false);
    }
  };

  if (loading) {
    return <header className="p-4 border-b">Loading...</header>;
  }

  return (
      // <header class="sticky justify-between top-0 z-40 h-16 bg-white border-b border-gray-100 shadow-sm flex items-center px-4 gap-4" >
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-md">
      <div className="max-w px-5 mx-auto  py-2 flex justify-between items-center">
      
      {/* LEFT */}
      <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-left "
        >
          <img
            src={logo}
            alt="Interview Coach logo"
            className="h-12 w-13 rounded-2xl p-1 shadow-sm"
          />
          <div className="leading-tight">
            <span className="block text-lg font-bold text-gray-900 sm:text-xl">
              Interview{" "}
              <span className=" text-indigo-600">
                Coach
              </span>
            </span>
            <span className="hidden text-xs font-medium uppercase tracking-[0.24em] text-slate-500 sm:block">
              AI Interview Practice
            </span>
          </div>
        </button>

      {/* RIGHT */}
      {user ? (
        <div className="flex items-center gap-4 relative">
    
        {/* Notification */}
        <button>
          <Bell size={18} />
        </button>

        {/* PROFILE BUTTON */}
        <div
          onClick={() => setopen(prev => !prev)}
          className="flex items-center gap-3 cursor-pointer border rounded-xl px-3 py-2 hover:bg-gray-50 transition"
        >
          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
            {user.name?.charAt(0)}
          </div>

          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-500 truncate max-w-[140px]">
              {user.email}
            </p>
          </div>
        </div>
        <button onClick={() => setopen(prev => !prev)}>
          {!open?(<ChevronDown/>) :<ChevronUp/>}
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-xl border overflow-hidden z-50">
            
            {/* USER INFO */}
            <div className="p-4">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <hr />

            {/* SETTINGS */}
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition">
              <Settings size={18} />
              <span>Settings</span>
            </button>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              disabled={loggingout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition"
            >
              <LogOut size={18} />
              <span>{loggingout ? "Signing out..." : "Sign Out"}</span>
            </button>

          </div>
        )}
      </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>{
              if(loading) return; // prevent navigation while loading
              if(user){
                navigate("/homepage");
              }else{
                navigate("/login");
              }
            }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/30 sm:px-5"
          >
            <Sparkles size={16} />
            <span>Start Free</span>
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-700 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/30 sm:px-5"
          >            <span>Login</span>
          </button>
        </div>
      )}
      </div>
    </header>
  );
}