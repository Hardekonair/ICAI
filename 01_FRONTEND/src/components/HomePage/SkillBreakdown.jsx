import { TrendingUp } from 'lucide-react';
import React from 'react'

const SkillBreakdown = () => {
    const skills = [
        { name: "Clarity", value: 82, color: "bg-indigo-500" },
        { name: "Confidence", value: 68, color: "bg-cyan-500" },
        { name: "Structure", value: 75, color: "bg-purple-500" },
        { name: "Vocabulary", value: 90, color: "bg-green-500" },
        { name: "Pace", value: 61, color: "bg-orange-500" },
    ];

    return (
    <div className="bg-white p-5 md:p-5 rounded-2xl shadow-sm w-full">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-indigo-500" size={20} />
          <h3 className="font-semibold text-lg">Skill Breakdown</h3>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-2">
        {skills.map((s, i) => (
          <div key={i}>
            
            {/* Label row */}
            <div className="flex justify-between items-center mb-1 text-sm md:text-base">
              <span className="text-gray-700">{s.name}</span>
              <span className="font-semibold text-gray-900">{s.value}</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${s.color} transition-all duration-700`}
                style={{ width: `${s.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 pt-2 border-t text-sm">
        <span className="text-gray-400">
          Based on last 12 sessions
        </span>
        <button className="text-indigo-600 hover:underline">
          Details
        </button>
      </div>
    </div>
  );
}

export default SkillBreakdown
