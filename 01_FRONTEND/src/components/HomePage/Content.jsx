import Hero from './Hero'
import Stats from './Stats'
import RecentSessions from './RecentSessions'
import SkillBreakdown from './SkillBreakdown'
import PracticeQuestions from './PracticeQuestions'
import WeeklyGoal from './WeeklyGoal'
import ProPlan from './ProPlan'
import AboutSection from './AboutSection'
import SideBar from '../Sidebar'
import React, { useEffect, useState } from "react";
import { getDashboard } from "../../api/dashboardApi";

const Content = () => {

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadDashboard = async () => {
      try {
        const data = await getDashboard();

        // console.log("DASHBOARD DATA:", data);

        setDashboard(data);

      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();

  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (!dashboard) {
    return <div>Failed to load dashboard.</div>;
  }
    
  return (
    <div className="flex min-h-screen bg-gray-50">

        {/* SIDEBAR */}
      <SideBar/>

        {/* MAIN */}
        <main className="min-w-0 flex-1 space-y-4 p-3 sm:p-5 lg:p-6">

            {/* HERO */}
            <Hero dashboard={dashboard}/>

            {/* STATS */}
            <Stats dashboard={dashboard} />

            {/* GRID SECTION */}
            {/* DASHBOARD CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">

              <RecentSessions sessions={dashboard.sessions} />

              <SkillBreakdown skillsData={dashboard.skills} />

              <WeeklyGoal goal={dashboard.dailyGoal} />

            </div>
            <AboutSection/>
        </main>
    </div>
  )
}

export default Content
