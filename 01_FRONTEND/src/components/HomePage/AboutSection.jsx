import { Sparkles, Globe, Shield, TrendingUp } from "lucide-react";

export default function AboutSection() {
  return (
    <div className="w-full space-y-16">

      {/* ================= HERO ================= */}
      <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-3xl px-6 py-12 md:py-16 text-center">
        
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full mb-4 text-sm">
          <Sparkles size={14} />
          Our Mission
        </div>

        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          Making Interviewing Fair for Everyone
        </h1>

        <p className="max-w-2xl mx-auto text-sm md:text-base opacity-90">
          Executive interview coaches charge $500/hour. We built AI that delivers the same
          world-class feedback — for everyone, at any time, for a fraction of the cost.
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ["10,000+", "Job seekers helped"],
          ["85%", "Report more confidence"],
          ["3.2x", "More interview offers"],
          ["500+", "Practice questions"],
        ].map(([value, label], i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-sm text-center">
            <h2 className="text-xl md:text-2xl font-bold text-indigo-600">{value}</h2>
            <p className="text-gray-500 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* ================= VALUES ================= */}
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-8">
          What We Stand For
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Globe />,
              title: "Accessibility",
              desc: "World-class coaching for everyone, not just those who can afford $500/hr coaches.",
              color: "bg-indigo-100 text-indigo-600",
            },
            {
              icon: <Shield />,
              title: "Privacy First",
              desc: "Your recordings are encrypted end-to-end. Delete anytime — gone instantly.",
              color: "bg-cyan-100 text-cyan-600",
            },
            {
              icon: <TrendingUp />,
              title: "Continuous Improvement",
              desc: "Our AI models retrain monthly. The more you practice, the smarter the coaching.",
              color: "bg-orange-100 text-orange-600",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
              
              <div className={`w-10 h-10 flex items-center justify-center rounded-xl mb-4 ${item.color}`}>
                {item.icon}
              </div>

              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= TEAM ================= */}
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-8">
          The Team Behind the AI
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Alex Chen", role: "AI Engineer & Founder", initials: "AC", color: "from-indigo-500 to-purple-500" },
            { name: "Sarah Williams", role: "Head of Product", initials: "SW", color: "from-cyan-500 to-teal-500" },
            { name: "James Rodriguez", role: "ML Research Lead", initials: "JR", color: "from-purple-500 to-indigo-500" },
          ].map((member, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm text-center">
              
              <div
                className={`w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-xl text-white font-semibold bg-gradient-to-r ${member.color}`}
              >
                {member.initials}
              </div>

              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-indigo-600 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}