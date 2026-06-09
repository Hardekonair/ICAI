import "../../styles/DashboardStyleComponents/4howitworks.css"

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Select a Question & Record",
      desc: "Choose from 500+ real interview questions across every industry. Hit record and answer naturally.",
    },
    {
      number: "02",
      title: "AI Analyses Your Response",
      desc: "Our models process speech, facial expressions, body language, and content simultaneously.",
    },
    {
      number: "03",
      title: "Get Your Report & Improve",
      desc: "Receive a detailed scorecard with timestamped feedback and a clear improvement roadmap.",
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

