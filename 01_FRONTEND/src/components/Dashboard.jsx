import React from 'react'
import Header from './DashComponents/1Header'
import Introduction from './DashComponents/2Introduction'
import Features from './DashComponents/3Features'
import HowItWorks from './DashComponents/4HowItWorks'
import DemoResult from './DashComponents/5DemoResult'
import Pricing from './DashComponents/6Pricing'
import Reviews from './DashComponents/7Feedback'
import Conclusion from './DashComponents/8Conclusion'
import Contact from './DashComponents/9Contact'

const Dashboard = () => {
  return (
    <div>
      <Header/>
      <Introduction/>
      <Features/>
      <HowItWorks/>
      <DemoResult/>
      <Pricing/>
      <Reviews/>
      <Conclusion/>
      <Contact/>
    </div>
  )
}

export default Dashboard
