import React from 'react'
import { saveSession } from '../../utils/interviewStorage';
import { Camera, CheckCircle, FileVideoCamera, Video } from "lucide-react";
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

const QuestionCard = ({id, q, selectedId, setSelectedId }) => {
    const isSelected = selectedId === id;
    const navigate=useNavigate();
    const { userId, loading }=useAuth();

    const handleStartRecording = async (e) => {

      e.stopPropagation();

      if (loading) return;

      if (!userId) {
        navigate("/login");
        return;
      }

      await saveSession({
        userId,
        questionId: id,
        question: q,
        createdAt: Date.now()

      });
      
      navigate("/startRecording");
    };
    return(
    <div
      onClick={() => setSelectedId(id)}
      className={`cursor-pointer border rounded-2xl p-5 bg-white transition flex flex-col h-full
        ${
          isSelected
            ? "border-indigo-500 shadow-md ring-2 ring-indigo-200"
            : "hover:shadow-sm"
        }`}
    >

      {/* Top */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-600">
            {q.difficulty}
          </span>
          <span className="text-xs text-gray-500">{q.type}</span>
        </div>

        {/* ✅ Check icon */}
        {isSelected && (
          <CheckCircle className="text-indigo-600" size={20} />
        )}
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        {q.title}
      </h2>

      {/* Hint */}
      <div className="bg-yellow-50 text-yellow-700 text-sm p-3 rounded-lg mb-4">
        💡 {q.hint}
      </div>

      {/* 🎤 Practice Button (ONLY when selected) */}
      {isSelected && (
        <div className="mt-auto">
          <button
            onClick={handleStartRecording}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <div className='flex justify-center items-center gap-2 p-1'>
            <Video/> Start Recording

            </div>
          </button>
        </div>
      )}
    </div>
  )
}

export default QuestionCard
