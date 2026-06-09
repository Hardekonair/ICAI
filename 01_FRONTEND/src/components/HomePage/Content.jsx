import React from 'react'
import Hero from './Hero'
import Stats from './Stats'
import RecentSessions from './RecentSessions'
import SkillBreakdown from './SkillBreakdown'
import PracticeQuestions from './PracticeQuestions'
import WeeklyGoal from './WeeklyGoal'
import ProPlan from './ProPlan'
import AboutSection from './AboutSection'
import SideBar from '../Sidebar'

const Content = () => {
  return (
    <div className=" sticky left-0 flex bg-gray-50 min-h-screen">

        {/* SIDEBAR */}
      <SideBar/>

        {/* MAIN */}
        <main className="flex-1 p-6 space-y-6 ">

            {/* HERO */}
            <Hero />

            {/* STATS */}
            <Stats />

            {/* GRID SECTION */}
            <div className="grid lg:grid-cols-3 gap-6 mb-12">
              {/* Left section */}
              <div className="lg:col-span-2 space-y-6">
                <RecentSessions />
                <PracticeQuestions />
              </div>
              {/* Right section */}
              <div className="space-y-6">
                <SkillBreakdown />
                <WeeklyGoal />
                <ProPlan />
              </div>
            </div>
            <AboutSection/>
        </main>
    </div>
  )
}

export default Content
