import "../../styles/DashboardStyleComponents/5demoresult.css";
import demofile from "../../assets/demofile.png";
import { CheckCircle, FileText } from "lucide-react";
import { useNavigate } from "react-router";

export default function DemoResult() {
  const navigate=useNavigate();
  return (
    <section className="demo">
      
      {/* LEFT */}
      <div className="demo__content">
        
        <span className="demo__badge">
          <FileText size={16} />
          Sample Report
        </span>

        <h2 className="demo__title">
          Detailed Feedback After <br /> Every Session
        </h2>

        <p className="demo__desc">
          Every practice session generates a full report with timestamped
          moments, metric breakdowns, and a personalised improvement plan.
        </p>

        <ul className="demo__list">
          <li><CheckCircle size={18} /> Overall score with trend vs. last session</li>
          <li><CheckCircle size={18} /> Filler word count and timestamps</li>
          <li><CheckCircle size={18} /> Eye contact percentage</li>
          <li><CheckCircle size={18} /> Pace and clarity ratings</li>
          <li><CheckCircle size={18} /> Top 3 actionable improvements</li>
        </ul>

        <button className="demo__btn" onClick={()=>{navigate("/login")}}>Try It Free →</button>

      </div>

      {/* RIGHT */}
      <div className="demo__image">
        <img src={demofile} alt="Demo Report" />
      </div>

    </section>
  );
}