import "../../styles/DashboardStyleComponents/4howitworks.css"

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Choose a Prompt & Speak",
      desc: "Choose a communication prompt, hit record, and express your thoughts naturally.",
    },
    {
      number: "02",
      title: "AI Analyses Your Communication",
      desc: "Our models process speech, facial expressions, body language, and content simultaneously.",
    },
    {
      number: "03",
      title: "Discover Insights & Improve",
      desc: "Receive clear feedback, speaking insights, and a focused next step for improvement.",
    },
  ];

  return (
    <section className="howItWorks">
      <h2 className="title">How It Works</h2>
      <p className="subtitle">Three steps from nervous to confident.</p>

      <div className="stepsContainer">
        {steps.map((step, index) => (
          <div className="step" key={index}>
            <div className="circle">{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}

        <div className="line" />
      </div>
    </section>
  );
}

