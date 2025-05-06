
import React from "react";
import { Navbar } from "../components/Home/Navbar";
import { WorkoutCard } from "../components/Home/WorkoutCard";
import { WeeklyChallenge } from "../components/Home/WeeklyChallenge";
import { Leaderboard } from "../components/Home/Leaderboard";
import { Footer } from "../components/Home/Footer";

const workouts = [
  {
    title: "Full Body HIIT",
    duration: "30 min",
    difficulty: "Intermediate",
    description: "High-intensity interval training targeting all major muscle groups.",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80",
  },
  {
    title: "Core Power Yoga",
    duration: "45 min",
    difficulty: "Beginner",
    description: "Strengthen your core while improving flexibility and balance.",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80",
  },
  {
    title: "Strength Training",
    duration: "50 min",
    difficulty: "Advanced",
    description: "Build muscle and increase strength with this comprehensive workout.",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Welcome back, John! 👋</h1>
          <p className="mt-2 text-gray-600">Ready for another great workout?</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Suggested Workouts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workouts.map((workout) => (
                <WorkoutCard key={workout.title} {...workout} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <WeeklyChallenge />
            <Leaderboard />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;