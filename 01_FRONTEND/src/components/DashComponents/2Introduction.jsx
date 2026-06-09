import React from "react";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import IMG from "../../assets/introimg.png";
import { useAuth } from "../../context/AuthContext";

const Introduction = () => {
  const navigate = useNavigate();
  const {user,loading}=useAuth();  // We can access user and loading state from AuthContext using this custom hook. This is possible because we wrapped our app with AuthProvider in main.jsx which provides this context to the entire app. So now we can check if user is logged in or not and also if auth state is still loading or not to prevent navigation while loading. This is a great example of how context allows us to share state across the entire app without prop drilling.

  return (
    <div className="min-h-[90vh] flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-[#5f2eea] to-[#1fa2ff] text-white px-6 md:px-0 py-10 md:py-16">

      {/* LEFT CONTENT */}
        {/* BADGE */}
            <div className="flex-1 max-w-[620px] md:ml-[80px] text-center md:text-left">
        <div className="mt-9 mb-1 inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
        
          <Sparkles size={10} color="white" />
          AI-Powered Interview Coach
        </div>

        {/* TITLE */}
        <h1 className="text-[30px] md:text-[60px] font-semibold leading-tight mt-0">
          Nail Every Interview.{" "}
          <span className="bg-gradient-to-r from-[#5ce1e6] to-[#00ffa3] bg-clip-text text-transparent ">
            AI-Powered
          </span>{" "}
          Communication Coach
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-3 text-[16px] md:text-[18px] leading-relaxed text-white/90">
          Practice with real interview questions. Get instant AI feedback on
          your speech, facial expressions, and body language. Land the job.
        </p>

        {/* BUTTON */}
        <div className="flex justify-center md:justify-start mt-6 ">
          <button
            onClick={() =>{
              if(loading) return; // prevent navigation while loading
              if(user){
                navigate("/homepage");
              }else{
                navigate("/login");
              }
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#4a3aff] font-semibold cursor-pointer shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Sparkles size={20} color="#4a3aff" />
            Start Free Practice →
          </button>
        </div>

        {/* STATS */}
        <div className="flex gap-8 md:gap-12 mt-8 justify-center md:justify-start flex-wrap">
          <div>
            <h2 className="text-2xl font-semibold">10k+</h2>
            <p>Users</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">85%</h2>
            <p>More Confident</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">3.2x</h2>
            <p>More Offers</p>
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="flex-1 flex justify-center mt-8 md:mt-0">
        <img
          src={IMG}
          alt="INTRO"
          className="w-full max-w-[650px] md:-translate-y-10"
        />
      </div>
    </div>
  );
};

export default Introduction;