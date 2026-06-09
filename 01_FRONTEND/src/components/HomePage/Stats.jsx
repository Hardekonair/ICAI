import React from 'react'
import { BarChart3, Clock, Flame, Mic } from 'lucide-react';
const Stats = () => {
    
    const stats = [
        { icon: <Mic/>, title: "Sessions", value: "12", bg: "bg-indigo-500" },
        { icon: <BarChart3/>, title: "Avg Score", value: "79" , bg: "bg-cyan-500"},
        { icon: <Flame/>, title: "Streak", value: "3 days", bg: "bg-orange-500" },
        { icon: <Clock/>, title: "Practice Time", value: "38m", bg: "bg-purple-500" },
    ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div key={i} className={`bg-white p-4 rounded-xl shadow `}>
            {/*ICON Container*/}
            <div className={`w-12 h-12 flex  items-center justify-center rounded-xl text-white ${s.bg}`}>
                {s.icon}
            </div>
            {/* { Value and Title} */}
          <h3 className="text-2xl font-bold mt-4">{s.value}</h3>
          <p className="text-gray-500 text-sm">{s.title}</p>
        </div>
        
      ))}
    </div>
  );
}

export default Stats
