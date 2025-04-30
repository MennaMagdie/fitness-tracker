import "./Pricing.css";

const plans = [
  {
    name: "Premium",
    price: 30,
    features: [
      "Track your progress daily",
      "Fitness resources",
      "Connect with fitness community",
    ],
    buttonText: "Track Now",
    variant: "secondary",
  },
  {
    name: "Track",
    price: 29,
    features: [
      "Personalized workout plans",
      "Healthy recipe ideas",
      "Join fitness challenges",
    ],
    buttonText: "Get Premium",
    featured: true,
  },
  {
    name: "Premium",
    price: 49,
    features: [
      "Tailored fitness guidance",
      "Exclusive workout playlists",
      "Access to expert trainers",
    ],
    buttonText: "Start Free",
    variant: "secondary",
  },
];

const Pricing = () => {
  return (
    <section className="pricing">
      <div className="container">
        <h2 className="text-center h2 fw-bold mb-5">Choose Your Plan</h2>
        <div className="row justify-content-center">
          {plans.map((plan, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className={`pricing-card ${plan.featured ? "featured" : ""}`}>
                <h3 className="h4 fw-semibold mb-2">{plan.name}</h3>
                <div className="h2 fw-bold mb-4">
                  {plan.price}EGP
                  <span className="h5 fw-normal">/month</span>
                </div>
                <ul className="list-unstyled mb-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="d-flex align-items-center mb-2">
                      <span className="me-2">→ </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`btn w-100 ${
                    plan.featured ? "btn-light text-primary" : "btn-outline"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
