import React from 'react'
import SideBar from '../Sidebar'
import QuestionCard from './QuestionCard.jsx';
import Header from '../DashComponents/1Header';
import { useSearchParams } from 'react-router';
import { useState } from 'react';
import { Mic, Sparkles } from 'lucide-react';
import {questions} from '../../data/questions.js';


const ChooseQuestion = () => {
  const [selectedId, setSelectedId] = useState(null);
  // const questions=questions;
  // data/questions.js
 
  return (
     <div className="h-screen flex flex-col overflow-auto">

      {/* Header */}
      <Header />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        {/* <aside className="w-[250px] bg-white border-r hidden md:block"> */}
          <SideBar />
        {/* </aside> */}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
      {/* <Header/> */}
    <div className="max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold mb-4">
          <Mic size={14} />
          Practice Session
        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          Choose your question, testcase
        </h1>

        <p className="text-gray-500 mt-2">
          Pick a question, record your answer, and get real AI feedback.
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap mb-6">
        {["All", "Behavioral", "Motivational", "Career Goals", "Situational", "Leadership", "Self-Assessment"].map((item, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-full border text-sm ${
              i === 0
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {questions.map((q,index) => (
          <QuestionCard
            key={index}   // key is special prop for React, not passed as a porperty
            q={q}
            id={index}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        ))}
      </div>
    </div>
      </main>
    </div>
    </div>
  )
}

export default ChooseQuestion;
