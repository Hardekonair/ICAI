import React from 'react'

const ProPlan = () => {
  return (
    <div className="p-6 rounded-2xl text-white bg-gradient-to-r from-indigo-600 to-cyan-500 w-full">
      <p className="text-sm mb-2">PRO PLAN</p>

      <h2 className="text-xl font-semibold mb-2">
        Unlock everything
      </h2>

      <p className="text-sm opacity-90 mb-4">
        Unlimited sessions, AI video analysis, and 500+ questions.
      </p>

      <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium">
        Upgrade to Pro
      </button>
    </div>
  );
}

export default ProPlan
