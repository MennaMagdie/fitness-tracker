import "./Testimonials.css";

const testimonials = [
  {
    text: "Positive Feedback",
    author: "Fitness Enthusiast",
    role: "User Testimonial",
  },
  {
    text: "User Testimonial",
    author: "Fitness Influencer",
    role: "User Testimonial",
  },
  {
    text: "User Testimonial",
    author: "Fitness Student",
    role: "User Testimonial",
  },
  {
    text: "User Testimonial",
    author: "Fitness Professional",
    role: "User Testimonial",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="testimonial-title">
          Join FitTrack community and stay motivated
        </h2>
        <div className="testimonial-cards">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-text">“{testimonial.text}”</p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar" />
                <div>
                  <div className="testimonial-author">{testimonial.author}</div>
                  <div className="testimonial-role">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
