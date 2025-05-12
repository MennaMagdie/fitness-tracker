
import { useState, useEffect } from 'react';
import { Navbar } from "../components/Home/Navbar";
import { Footer } from "../components/Home/Footer";
import { Heart, MessageSquare, Share2 } from "lucide-react";

const Training = () => {
  const [trainers, setTrainers] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT51usnDFQCizbAw4yj74lGzrXx4vwZvJunZg&s",
      experience: "8 years",
      specialization: "Weight Training & HIIT",
      bio: "Certified personal trainer specialized in strength and high-intensity interval training. Helped over 200 clients reach their fitness goals."
    },
    {
      id: 2,
      name: "Sarah Chen",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80",
      experience: "6 years",
      specialization: "Yoga & Pilates",
      bio: "Yoga Alliance certified instructor focused on mindfulness and core strength. Trained in multiple yoga traditions including Hatha and Vinyasa."
    },
    {
      id: 3,
      name: "Ali Reed",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80",
      experience: "10 years",
      specialization: "Nutrition & Strength",
      bio: "Nutritionist and strength coach with a holistic approach to fitness. Former athlete with expertise in sports-specific training."
    },
    {
      id: 4,
      name: "youssef Wilson",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=60&h=60",
      experience: "5 years",
      specialization: "Cardio & Endurance",
      bio: "Marathon runner and endurance specialist. Focuses on improving cardiovascular health and building stamina for all fitness levels."
    }
  ]);

  const [communityPosts, setCommunityPosts] = useState([
    {
      id: 1,
      user: "Halaand Smith",
      avatar: "data:image/jpeg;base64,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",
      content: "Just completed my first 5k run! Thanks to everyone in the community for your support and motivation!",
      likes: 24,
      comments: 7,
      timeAgo: "2 hours ago",
      isLiked: false
    },
    {
      id: 2,
      user: "Hary Kean",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=60&h=60",
      content: "Weekly tip: Drinking water before meals can help with portion control and improve hydration during workouts. Aim for at least 8 glasses daily!",
      likes: 42,
      comments: 3,
      timeAgo: "5 hours ago",
      isLiked: false
    },
    {
      id: 3,
      user: "Riley Johnson",
      avatar: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=60&h=60",
      content: "Has anyone tried the new HIIT class? Looking for feedback before I sign up next week.",
      likes: 8,
      comments: 12,
      timeAgo: "1 day ago",
      isLiked: false
    }
  ]);

  // Animation for elements when page loads
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Function to handle like button clicks
  const handleLike = (postId: number) => {
    setCommunityPosts(posts => 
      posts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked } 
          : post
      )
    );
  };

  // Function to flip trainer card
  const [flippedCard, setFlippedCard] = useState(null);
  
  const handleCardFlip = (trainerId: null) => {
    setFlippedCard(flippedCard === trainerId ? null : trainerId);
  };

  return (
    <div className="training-page">
      <Navbar />
      
      <div className="training-container">
        <section className={`trainers-section ${isVisible ? 'visible' : ''}`}>
          <h1 className="section-title">Meet Our Personal Trainers</h1>
          <p className="section-description">
            Expert guidance tailored to your fitness goals. Hover over the cards to learn more about our trainers.
          </p>
          
          <div className="trainers-grid">
            {trainers.map(trainer => (
              <div 
                key={trainer.id} 
                className={`trainer-card ${flippedCard === trainer.id ? 'flipped' : ''}`}
                onClick={() => handleCardFlip(trainer.id)}
              >
                <div className="card-inner">
                  <div className="card-front">
                    <div className="trainer-image" style={{ backgroundImage: `url(${trainer.image})` }}></div>
                    <div className="trainer-info">
                      <h3>{trainer.name}</h3>
                      <p className="specialization">{trainer.specialization}</p>
                      <p className="experience">{trainer.experience} experience</p>
                    </div>
                  </div>
                  <div className="card-back">
                    <h3>{trainer.name}</h3>
                    <p>{trainer.bio}</p>
                    <button className="book-button">Book a Session</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`community-section ${isVisible ? 'visible' : ''}`}>
          <h1 className="section-title">Fitness Community</h1>
          <p className="section-description">
            Connect, share, and grow with like-minded fitness enthusiasts in our supportive community.
          </p>
          
          <div className="community-feed">
            {communityPosts.map(post => (
              <div key={post.id} className="community-post">
                <div className="post-header">
                  <div className="post-user">
                    <div className="user-avatar" style={{ backgroundImage: `url(${post.avatar})` }}></div>
                    <div>
                      <h4>{post.user}</h4>
                      <span className="post-time">{post.timeAgo}</span>
                    </div>
                  </div>
                </div>
                <div className="post-content">
                  <p>{post.content}</p>
                </div>
                <div className="post-actions">
                  <button 
                    className={`action-button ${post.isLiked ? 'liked' : ''}`} 
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart className="action-icon" size={18} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="action-button">
                    <MessageSquare className="action-icon" size={18} />
                    <span>{post.comments}</span>
                  </button>
                  <button className="action-button">
                    <Share2 className="action-icon" size={18} />
                  </button>
                </div>
              </div>
            ))}
            
            <div className="join-community">
              <h3>Join the Conversation</h3>
              <p>Share your fitness journey, ask questions, and connect with others!</p>
              <button className="join-button">Create Post</button>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
      
      <style>
        {`
        /* Page Styles */
        .training-page {
          font-family: 'Inter', sans-serif;
          color: #333;
        }
        
        .training-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        
        /* Section Styles */
        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1A1F2C;
          margin-bottom: 1rem;
          text-align: center;
        }
        
        .section-description {
          font-size: 1.1rem;
          color: #666;
          text-align: center;
          max-width: 700px;
          margin: 0 auto 40px;
          line-height: 1.6;
        }
        
        /* Animations for section entrance */
        .trainers-section,
        .community-section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
          margin-bottom: 60px;
        }
        
        .trainers-section.visible,
        .community-section.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .community-section {
          transition-delay: 0.3s;
        }
        
        /* Trainers Section */
        .trainers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 30px;
        }
        
        .trainer-card {
          height: 380px;
          perspective: 1000px;
          cursor: pointer;
        }
        
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .trainer-card.flipped .card-inner {
          transform: rotateY(180deg);
        }
        
        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden; /* Safari */
          backface-visibility: hidden;
          border-radius: 12px;
          overflow: hidden;
        }
        
        .card-back {
          transform: rotateY(180deg);
          background: linear-gradient(45deg, #9b87f5, #7E69AB);
          color: white;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .card-back h3 {
          font-size: 1.5rem;
          margin-bottom: 15px;
        }
        
        .card-back p {
          flex: 1;
          line-height: 1.6;
        }
        
        .trainer-image {
          height: 250px;
          background-size: cover;
          background-position: center;
          transition: transform 0.3s ease;
        }
        
        .trainer-info {
          padding: 15px;
          background: white;
        }
        
        .trainer-info h3 {
          font-size: 1.2rem;
          margin: 0 0 8px 0;
          color: #1A1F2C;
        }
        
        .specialization {
          font-weight: 500;
          color: #9b87f5;
          margin: 0 0 5px 0;
        }
        
        .experience {
          font-size: 0.9rem;
          color: #666;
          margin: 0;
        }
        
        .trainer-card:hover .trainer-image {
          transform: scale(1.05);
        }
        
        .book-button {
          background: white;
          color: #9b87f5;
          border: none;
          padding: 12px 0;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          margin-top: 20px;
        }
        
        .book-button:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-2px);
        }
        
        /* Community Section */
        .community-feed {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        
        .community-post {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          padding: 20px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .community-post:nth-child(1) { animation-delay: 0.1s; }
        .community-post:nth-child(2) { animation-delay: 0.3s; }
        .community-post:nth-child(3) { animation-delay: 0.5s; }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .community-post:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }
        
        .post-header {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .post-user {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .user-avatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background-size: cover;
          background-position: center;
        }
        
        .post-user h4 {
          margin: 0;
          font-size: 1rem;
          color: #333;
        }
        
        .post-time {
          font-size: 0.8rem;
          color: #888;
        }
        
        .post-content {
          margin-bottom: 20px;
          line-height: 1.5;
        }
        
        .post-actions {
          display: flex;
          gap: 20px;
          padding-top: 15px;
          border-top: 1px solid #eee;
        }
        
        .action-button {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          padding: 5px 10px;
          border-radius: 20px;
          transition: all 0.2s ease;
        }
        
        .action-button:hover {
          background: #f5f5f5;
          color: #9b87f5;
        }
        
        .action-button.liked {
          color: #ec4899;
        }
        
        .action-button.liked .action-icon {
          fill: #ec4899;
          stroke: #ec4899;
        }
        
        .join-community {
          background: linear-gradient(45deg, #9b87f5, #1EAEDB);
          color: white;
          padding: 25px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          margin-top: 20px;
          animation: scaleIn 0.6s ease 0.8s forwards;
          opacity: 0;
          transform: scale(0.9);
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .join-community h3 {
          font-size: 1.5rem;
          margin-top: 0;
        }
        
        .join-button {
          background: white;
          color: #9b87f5;
          border: none;
          padding: 12px 25px;
          border-radius: 25px;
          font-weight: 600;
          margin-top: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .join-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .trainers-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .trainer-card {
            height: 350px;
          }
        }
        
        @media (max-width: 576px) {
          .trainers-grid {
            grid-template-columns: 1fr;
            max-width: 300px;
            margin: 0 auto;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .section-description {
            font-size: 1rem;
          }
        }
        `}
      </style>
    </div>
  );
};

export default Training;