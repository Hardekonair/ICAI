import { ArrowRight } from 'lucide-react';
import React from 'react'

const RecentSessions = () => {
    const sessions = [
        {
            ques: "Tell me about yourself",
            type: "HR",
            date: "18 Apr",
            time: "10:30 AM",
            duration: "5 min",
        },
        {
            ques: "Why should we hire you?",
            type: "HR",
            date: "18 Apr",
            time: "11:00 AM",
            duration: "6 min",
        },
        {
            ques: "What are your strengths?",
            type: "Behavioral",
            date: "17 Apr",
            time: "4:00 PM",
            duration: "4 min",
        },
        {
            ques: "Describe a challenge",
            type: "Behavioral",
            date: "17 Apr",
            time: "3:30 PM",
            duration: "7 min",
        },
        {
            ques: "Where do you see yourself?",
            type: "HR",
            date: "16 Apr",
            time: "2:00 PM",
            duration: "5 min",
        },
        {
            ques: "Why this company?",
            type: "HR",
            date: "16 Apr",
            time: "1:00 PM",
            duration: "6 min",
        },
        {
            ques: "Tell me about a failure",
            type: "Behavioral",
            date: "15 Apr",
            time: "5:00 PM",
            duration: "5 min",
        },
        {
            ques: "Handle pressure?",
            type: "Behavioral",
            date: "15 Apr",
            time: "3:00 PM",
            duration: "4 min",
        },
        {
            ques: "Team vs solo?",
            type: "HR",
            date: "14 Apr",
            time: "12:00 PM",
            duration: "3 min",
        },
        {
            ques: "Leadership example",
            type: "Behavioral",
            date: "14 Apr",
            time: "11:00 AM",
            duration: "6 min",
        },
    ];

  return (
    <div className="bg-white p-5 rounded-xl shadow col-span-2">
    {/* <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"> */}
    <h3 className="font-semibold mb-4">Recent Sessions</h3>

    {/* Scroll */}
    <div className="max-h-[260px] overflow-y-auto no-scrollbar pr-2 ">
      {sessions.map((s, i) => (
        <div
          key={i}
          className="flex items-center justify-between py-3 border-b last:border-none"
        >
          {/* Left content */}
          <div className="flex flex-col">
            <p className="text-sm font-medium">{s.ques}</p>

            <div className="flex gap-3 text-xs text-gray-500 mt-1">
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-md text-xs">
                {s.type}
              </span>
              <span>{s.date}</span>
              <span>{s.time}</span>
              <span>{s.duration}</span>
            </div>
          </div>

          {/* Arrow button */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition">
            <ArrowRight size={18} className="text-indigo-600" />
          </button>
        </div>
      ))}
    </div>
  </div>
  )
}

export default RecentSessions
