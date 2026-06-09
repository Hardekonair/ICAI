import { Sparkles } from "lucide-react";
import "../../styles/DashboardStyleComponents/8conclusion.css";
import { useNavigate } from "react-router";

export default function Conclusion() {
  const navigate=useNavigate();
  return (
    <section className="conclusion">
      <h1>Ready to Nail Your Next Interview?</h1>
      <p>Start practicing for free — no credit card required.</p>

      <button className="cta-btn" onClick={()=>navigate("/login")}>
        <Sparkles size={18} color="#4f46e5"/> Start Free Today
      </button>
    </section>
  );
}