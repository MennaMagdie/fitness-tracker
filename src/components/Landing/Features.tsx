import "./Features.css";

const features = [
  {
    title: "Fitness Journey",
    description: "Monitor progress and set personal goals",
    icon: "💪",
  },
  {
    title: "Sleep Quality",
    description: "Achieve rejuvenating sleep cycles",
    icon: "😴",
  },
  {
    title: "Stress Management",
    description: "Find inner peace and reduce stress",
    icon: "🧘‍♀️",
  },
];

const Features = () => {
  return (
    <section className="features">
      <div className="features-container">
        {features.map((feature) => (
          <div key={feature.title} className="feature-card">
            <span className="feature-icon">{feature.icon}</span>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
