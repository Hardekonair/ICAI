import React from 'react'
import QuestionCard from './QuestionCard.jsx';
import Header from '../DashComponents/1Header';
import { useState, useEffect } from 'react';
import { Mic } from 'lucide-react';
import { getQuestions } from "../../api/questionApi";
import SideBar from '../SideBar.jsx';


const ChooseQuestion = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const loadQuestions = async () => {
    try {
        setLoading(true);
        setError("");

        const data = await getQuestions();

        console.log("API Response:", data);

        if (Array.isArray(data)) {
            setQuestions(data);
        } else {
            setQuestions([]);
        }
    }
    catch (err) {
        console.error(err);
        setError("Unable to load interview questions.");
    }
    finally {
        setLoading(false);
    }
  };
    
  useEffect(() => {

      let isMounted = true;

      const fetchQuestions = async () => {

          try {

              setLoading(true);
              setError("");

              const data = await getQuestions();

              if (isMounted) {

                  if (Array.isArray(data)) {
                      setQuestions(data);
                  } else {
                      setQuestions([]);
                  }

              }

          }
          catch (err) {

              if (isMounted) {
                  setError("Unable to load interview questions.");
              }

              console.error(err);

          }
          finally {

              if (isMounted) {
                  setLoading(false);
              }

          }

      };

      fetchQuestions();

      return () => {
          isMounted = false;
      };

  }, []);


  // const questions=questions;
  // data/questions.js

  const categories = [
      "All",
      ...new Set(questions.map((q) => q.type))
  ];

  const filteredQuestions =
    selectedCategory === "All"
        ? questions
        : questions.filter(
            (q) => q.type === selectedCategory
        );
      
  if (loading) {

      return (

          <div className="flex justify-center items-center h-screen">

              <p className="text-gray-500 text-lg">
                  Loading questions...
              </p>

          </div>

      );

  }

  if (error) {

      return (

          <div className="flex flex-col items-center justify-center h-screen">

              <h2 className="text-red-500 text-xl">
                  {error}
              </h2>

              <button

                  onClick={loadQuestions}

                  className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded"

              >
                  Retry
              </button>

          </div>

      );

  }
 
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
        {categories.map((item) => (

          <button
              key={item}
              onClick={() => setSelectedCategory(item)}
              aria-pressed={selectedCategory === item}
              className={`px-4 py-2 rounded-full border text-sm transition

              ${
                  selectedCategory === item
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
          >

              {item}

          </button>

      ))}
      </div>

      {/* Grid */}
      {/* <div className="grid md:grid-cols-2 gap-6"> */}
        
        {filteredQuestions.length === 0 ? (

          <div className="text-center py-20">

              <h2 className="text-xl font-semibold">

                  No Questions Found

              </h2>

              <p className="text-gray-500 mt-2">

                  Try selecting another category.

              </p>

          </div>

      ) : (

          <div className="grid md:grid-cols-2 gap-6">

              {filteredQuestions.map((q) => (

                  <QuestionCard

                      key={q._id}

                      id={q._id}

                      q={q}

                      selectedId={selectedId}

                      setSelectedId={setSelectedId}

                  />

              ))}

          </div>

      )}
      {/* </div> */}
    </div>
      </main>
    </div>
    </div>
  )
}

export default ChooseQuestion;
