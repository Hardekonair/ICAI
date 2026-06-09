import { Sparkles, Star } from 'lucide-react';
import React from 'react'

const LoginInfo = () => {
  return (
    <div className='hidden lg:block min-w-[calc(100vh-4rem)] '>
      <div className="flex min-h-screen">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-indigo-600 via-indigo-700 to-cyan-500 text-white items-center ">
        <div className="max-w-[520px]  ml-20">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <Sparkles size={15}/> Free to start, no credit card
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-bold text-white mb-5 leading-tight" >Start practicing in under 2 minutes.</h2>

          {/* Steps */}
          <div className="space-y-7 ml-10">

            <div className="flex  gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold">
                01
              </div>
              <div>
                <h4 className="font-medium">Create your free account</h4>
                <p className="text-sm text-white/80">
                  No credit card required. 3 free recordings every month.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-semibold">
                02
              </div>
              <div>
                <h4 className="font-medium">Pick a question & record</h4>
                <p className="text-sm text-white/80">
                  Choose from 500+ real interview questions.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-semibold">
                03
              </div>
              <div>
                <h4 className="font-medium">Get instant AI feedback</h4>
                <p className="text-sm text-white/80">
                  Speech, expressions, body language — all analyzed in seconds.
                </p>
              </div>
            </div>

          </div>

          {/* Testimonial */}
          <div className="mt-12 p-5 rounded-xl bg-white/20 backdrop-blur-md max-w-[420px]">
            <p className="text-sm flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="yellow" stroke="yellow" />
              ))}</p>
            <p className="text-sm">
              "I went from bombing every interview to getting 3 offers in a month.
              The AI feedback was a game changer."
            </p>
            <span className="text-xs opacity-80">
              — Hardik S, now at Google
            </span>
          </div>

        </div>
      </div>

    </div>
    </div>
  )
}

export default LoginInfo;
