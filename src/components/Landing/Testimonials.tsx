import "./Testimonials.css";

const testimonials = [
  {
    text: "NeuroFit has completely transformed my fitness journey. The workout suggestions are spot on, and the progress tracking feature keeps me motivated every day. I’ve seen incredible results, and it’s all thanks to this app!",
    author: "Menna Magdy",
    role: "Fitness Enthusiast",
  },
  
  {
    text: "I’ve tried multiple fitness apps, but none of them come close to NeuroFit. The community is amazing, the progress dashboard is super helpful, and the feedback system is easy to use. Highly recommend it!",
    author: "Mathilda Wae",
    role: "User Testimonial",
  },
  
  {
    text: "As someone who’s always struggled to stay motivated, NeuroFit has been a game-changer. The daily reminders and personalized workout plans have helped me stay on track.",
    author: "Chris Joo",
    role: "User Testimonial",
  },
  
  {
    text: "I love how NeuroFit makes tracking my fitness goals so easy. The dashboard provides detailed insights, and the support from the team is amazing. It’s an all-in-one solution that really works!",
    author: "Joo Lee",
    role: "Fitness Enthusiast",
  }
  ,
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="testimonial-title">
          Join NeuroFit Community and stay motivated
        </h2>
        <div className="testimonial-cards">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-text">“{testimonial.text}”</p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar"/>
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
