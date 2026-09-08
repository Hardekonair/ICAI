import React from 'react'

const WorkInProgress = ({
  title = "Work in Progress",
  message = "We're working hard to bring this page to you. Please check back soon!",
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 overflow-hidden relative">

      {/* Soft background decorations */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-100 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-70" />

      <div className="relative z-10 text-center max-w-2xl">

        {/* Caution Board */}
        <div className="relative mx-auto mb-10 w-48 h-48">

          {/* Shadow / Glow */}
          <div className="absolute inset-4 bg-yellow-300/40 rounded-full blur-2xl" />

          {/* Board */}
          <div className="
            relative
            w-full h-full
            bg-yellow-400
            rounded-3xl
            rotate-3
            shadow-[0_20px_40px_rgba(0,0,0,0.15)]
            border-4 border-white
            flex items-center justify-center
            overflow-hidden
          ">

            {/* Caution stripes */}
            <div className="absolute inset-0 opacity-90">
              <div className="absolute -left-8 -top-10 w-8 h-72 bg-black rotate-[35deg]" />
              <div className="absolute left-16 -top-10 w-8 h-72 bg-black rotate-[35deg]" />
              <div className="absolute left-40 -top-10 w-8 h-72 bg-black rotate-[35deg]" />
            </div>

            {/* Warning icon */}
            <div className="relative z-10 bg-yellow-400 rounded-full p-5 shadow-lg">
              <span className="text-7xl block">
                ⚠️
              </span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="
          inline-flex items-center gap-2
          px-4 py-2
          mb-5
          rounded-full
          bg-yellow-100
          border border-yellow-200
          text-yellow-700
          text-sm font-semibold
        ">
          <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
          UNDER DEVELOPMENT
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          {title}
          <span className="text-yellow-500">.</span>
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-lg leading-relaxed max-w-lg mx-auto">
          {message}
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="w-12 h-px bg-gray-300" />
          <div className="w-2 h-2 bg-yellow-400 rotate-45" />
          <div className="w-12 h-px bg-gray-300" />
        </div>

        <p className="mt-5 text-sm text-gray-400">
          🚧 We're putting the finishing touches on it.
        </p>

      </div>
    </div>
  );
};

export default WorkInProgress;