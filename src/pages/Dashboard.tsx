
import { useState, useEffect } from "react";
import { Navbar } from "../components/Home/Navbar";
import { Footer } from "../components/Home/Footer";
import { ProgressChart } from "../components/Dashboard/ProgressChart";
import { NutritionTracker } from "../components/Dashboard/NutritionTracker";
import { Reminders } from "../components/Dashboard/Reminders";
import { ChevronRight } from "lucide-react";

const Dashboard = () => {
  const [animatedElements, setAnimatedElements] = useState<NodeListOf<Element> | null>(null);

  useEffect(() => {
    // Find all elements with the fade-in class
    const elements = document.querySelectorAll('.fade-in');
    setAnimatedElements(elements);
    
    // Observe elements and add animated class when they become visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, {
      threshold: 0.1
    });
    
    elements.forEach(el => observer.observe(el));
    
    return () => {
      if (animatedElements) {
        Array.from(animatedElements).forEach(el => observer.unobserve(el));
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="dashboard-container">
        <div className="dashboard-header fade-in">
          <h1 className="dashboard-title">Your Fitness Dashboard</h1>
          <p className="dashboard-subtitle">Track your progress, nutrition, and stay on top of your fitness goals</p>
          
          <div className="breadcrumb">
            <a href="/Home" className="breadcrumb-link">Home</a>
            <ChevronRight className="breadcrumb-separator" />
            <span className="breadcrumb-current">Dashboard</span>
          </div>
        </div>

        <div className="dashboard-grid">
          <section className="dashboard-card progress-section fade-in">
            <h2 className="section-title">Progress Overview</h2>
            <div className="chart-container">
              <ProgressChart />
            </div>
          </section>

          <section className="dashboard-card nutrition-section fade-in">
            <h2 className="section-title">Nutrition Tracker</h2>
            <NutritionTracker />
          </section>

          <section className="dashboard-card reminders-section fade-in">
            <h2 className="section-title">Reminders</h2>
            <Reminders />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;