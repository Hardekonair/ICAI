import { Mic, Eye, Activity, FileText, Clock, Lightbulb, Sparkles } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Mic />,
      title: "Speech Analysis",
      desc: "Detects filler words, pacing issues, and vocal clarity in real time.",
    },
    {
      icon: <Eye />,
      title: "Expression Tracking",
      desc: "AI reads your facial expressions to measure confidence and engagement.",
    },
    {
      icon: <Activity />,
      title: "Body Language",
      desc: "Posture, gestures, and eye contact scored frame by frame.",
    },
    {
      icon: <FileText />,
      title: "Content Feedback",
      desc: "Evaluates structure, relevance, and depth of your answers.",
    },
    {
      icon: <Clock />,
      title: "Timestamps",
      desc: "Jump to exact moments where you hesitated, rushed, or excelled.",
    },
    {
      icon: <Lightbulb />,
      title: "Improvement Tips",
      desc: "Personalised, actionable suggestions after every session.",
    },
  ];

  // Tailwind styles for each card (replacing nth-child)
  const styles = [
    "bg-gradient-to-br from-sky-100 to-blue-200",
    "bg-gradient-to-br from-cyan-100 to-cyan-200",
    "bg-gradient-to-br from-purple-100 to-purple-200",
    "bg-gradient-to-br from-orange-100 to-orange-200",
    "bg-gradient-to-br from-green-100 to-green-200",
    "bg-gradient-to-br from-pink-100 to-pink-200",
  ];

  const iconStyles = [
    "bg-blue-500 text-white",
    "bg-cyan-500 text-white",
    "bg-purple-600 text-white",
    "bg-orange-500 text-white",
    "bg-green-500 text-white",
    "bg-pink-500 text-white",
  ];

  return (
    <section className="py-20 px-[6%] bg-gray-50 text-center">
      
      {/* Header */}
      <div className="max-w-[700px] mx-auto">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold mb-4">
          <Sparkles size={14} />
          What We Analyse
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Every Dimension of Your Interview Performance
        </h2>

        <p className="text-gray-500 text-base">
          Six AI models work in parallel to give you the most complete interview
          feedback available.
        </p>
      </div>

      {/* Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl text-left border border-gray-200 transition duration-300 hover:-translate-y-1 hover:shadow-lg ${styles[index]}`}
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${iconStyles[index]}`}
            >
              {item.icon}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {item.title}
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}