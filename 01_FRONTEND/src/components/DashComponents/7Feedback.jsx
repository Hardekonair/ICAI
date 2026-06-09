import "../../styles/DashboardStyleComponents/7feedback.css";
import { Star } from "lucide-react";

const reeview = [
  {
    text: `"I went from freezing in interviews to getting 3 offers in a month. The filler-word tracker alone changed everything."`,
    name: "Hardik S.",
    role: "Software Engineer",
    initials: "HS",
    color: "purple",
  },
  {
    text: `"The body language feedback was eye-opening. I had no idea I was avoiding eye contact so much."`,
    name: "Jaya T.",
    role: "Product Manager",
    initials: "JT",
    color: "teal",
  },
  {
    text: `"Practicing at 11 PM the night before my interview and still getting detailed AI feedback — that's a game changer."`,
    name: "Aisha K.",
    role: "UX Designer",
    initials: "AK",
    color: "violet",
  },
];

export default function Reviews() {
  return (
    <section className="feedbackSection">
      <h2>Real People. Real Results.</h2>
      <p className="subtitle">
        Join 10,000+ job seekers who've levelled up their interview game.
      </p>

      <div className="feedbackContainer">
        {reeview.map((review, index) => (
          <div className="feedbackcard" key={index}>
            
            {/* Stars */}
            <div className="feedbackstars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#facc15" stroke="#facc15" />
              ))}
            </div>

            {/* Text */}
            <p className="reviewText">{review.text}</p>

            {/* User */}
            <div className="user">
              <div className={`avatar ${review.color}`}>
                {review.initials}
              </div>
              <div>
                <h4>{review.name}</h4>
                <span>{review.role}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}