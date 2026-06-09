import { ActivityIcon, Award, GitGraphIcon, LineChart, LucideGitBranchPlus, MarsStroke, Mic, PanelRightOpen, TrendingUp } from 'lucide-react'
import React from 'react'
import { FaAward, FaGrinTongueWink } from 'react-icons/fa'

const SignupInfo = () => {
  return (
    <div className="hidden lg:flex flex-1 w-full min-h-screen bg-gradient-to-br from-indigo-600 via-indigo-700 to-cyan-500 text-white items-center justify-center px-6 xl:px-10">

      <div className="text-center w-full max-w-none xl:max-w-[700px]">

        {/* STATS CARDS */}
        <div className="flex justify-center gap-4 sm:gap-6 mb-8 sm:mb-10 flex-wrap">

          <div className="bg-white/10  backdrop-blur-md rounded-2xl px-4 sm:px-6 py-4 sm:py-5 text-center w-[100px] sm:w-[120px]">
            <div className="mb-2  "><Mic size={32}></Mic></div>
            <p className="text-lg sm:text-xl font-bold">87%</p>
            <p className="text-xs sm:text-sm text-white/80">Speech</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 sm:px-6 py-4 sm:py-5 text-center w-[100px] sm:w-[120px]">
            <div className="mb-2"><FaAward size={32}/></div>
            <p className="text-lg sm:text-xl font-bold">85/100</p>
            <p className="text-xs sm:text-sm text-white/80">Score</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 sm:px-6 py-4 sm:py-5 text-center w-[100px] sm:w-[120px]">
            <div className="mb-2"><TrendingUp size={32}/></div>
            <p className="text-lg sm:text-xl font-bold">High</p>
            <p className="text-xs sm:text-sm text-white/80">Confidence</p>
          </div>

        </div>

        {/* MAIN HEADING */}
        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold leading-tight mb-4 sm:mb-6">
          Your next interview is <br /> your best interview.
        </h1>

        {/* SUBTEXT */}
        <p className="text-sm sm:text-base lg:text-lg text-white/80 mb-6 sm:mb-8">
          AI-powered coaching that gives you the same feedback as a $500/hr executive coach — for a fraction of the cost.
        </p>

        {/* USERS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">

          <div className="flex -space-x-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-purple-400 flex items-center justify-center text-xs sm:text-sm font-bold">SK</div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cyan-400 flex items-center justify-center text-xs sm:text-sm font-bold">MT</div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-indigo-400 flex items-center justify-center text-xs sm:text-sm font-bold">PM</div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-pink-400 flex items-center justify-center text-xs sm:text-sm font-bold">JL</div>
          </div>

          <p className="text-xs sm:text-sm text-white/80 text-center">
            Join 10,000+ job seekers
          </p>

        </div>

      </div>
    </div>
  )
}

export default SignupInfo