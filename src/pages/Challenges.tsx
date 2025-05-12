import { useState } from 'react';
import { Navbar } from '../components/Home/Navbar';
import { Footer } from '../components/Home/Footer';
interface Challenge {
  id: number;
  name: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number; // من 0 لـ 100 لعرض شريط التقدم
}

// Static Data
const challenges: Challenge[] = [
  {
    id: 1,
    name: 'Cardio Sprint',
    description: 'Run or cycle for 30 minutes daily to boost your heart health.',
    duration: '30 Days',
    difficulty: 'Intermediate',
    progress: 25,
  },
  {
    id: 2,
    name: 'Core Crusher',
    description: 'Strengthen your core with daily plank and crunch sessions.',
    duration: '21 Days',
    difficulty: 'Beginner',
    progress: 60,
  },
  {
    id: 3,
    name: 'Strength Surge',
    description: 'Lift weights or do bodyweight exercises to build muscle.',
    duration: '28 Days',
    difficulty: 'Advanced',
    progress: 10,
  },
  {
    id: 4,
    name: 'Flexibility Flow',
    description: 'Daily yoga and stretching to improve mobility and reduce stress.',
    duration: '14 Days',
    difficulty: 'Beginner',
    progress: 80,
  },
   {
    id: 5,
    name: 'Cardio Sprint',
    description: 'Run or cycle for 30 minutes daily to boost your heart health.',
    duration: '30 Days',
    difficulty: 'Intermediate',
    progress: 55,
  },
   {
    id: 6,
    name: 'Cardio Sprint',
    description: 'Run or cycle for 30 minutes daily to boost your heart health.',
    duration: '30 Days',
    difficulty: 'Intermediate',
    progress: 85,
  },
];

const Challenges: React.FC = () => {
  const [joinedChallenges, setJoinedChallenges] = useState<number[]>([]);

  const handleJoinChallenge = (challengeId: number) => {
    if (joinedChallenges.includes(challengeId)) {
      setJoinedChallenges(joinedChallenges.filter((id) => id !== challengeId));
    } else {
      setJoinedChallenges([...joinedChallenges, challengeId]);
    }
  };

  return (
    <>
    <Navbar />
    <div style={styles.container}>
          <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .challenge-card {
          animation: fadeIn 0.6s ease-out forwards;
          animation-delay: calc(var(--index) * 0.1s);
        }
        .challenge-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .join-button {
          animation: pulse 2s infinite ease-in-out;
        }
        .join-button:hover:not(:disabled) {
          background-color: #16a34a;
          transform: scale(1.05);
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .join-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .progress-bar {
          transition: width 0.5s ease-in-out;
        }
        ::-webkit-scrollbar {
          width: 12px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 12px;
        }
        ::-webkit-scrollbar-thumb {
          background: #22c55e;
          border-radius: 12px;
          border: 3px solid #f1f5f9;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #16a34a;
        }
        html {
          scrollbar-width: thin;
          scrollbar-color: orange #f1f5f9;
        }
      `}</style>
          <div style={styles.content}>
              <h1 style={styles.title}>Your Fitness Challenges</h1>
              <p style={styles.description}>
                  Take on a challenge to push your limits and stay motivated!
              </p>
              <div style={styles.challengesGrid}>
                  {challenges.map((challenge, index) => (
                      <div
                          key={challenge.id}
                          style={{ ...styles.challengeCard, ['--index' as string]: index }}
                          className="challenge-card"
                      >
                          <h2 style={styles.challengeTitle}>{challenge.name}</h2>
                          <p style={styles.challengeDescription}>{challenge.description}</p>
                          <div style={styles.challengeDetails}>
                              <span style={styles.challengeDetail}>
                                  <strong>Duration:</strong> {challenge.duration}
                              </span>
                              <span style={styles.challengeDetail}>
                                  <strong>Difficulty:</strong> {challenge.difficulty}
                              </span>
                          </div>
                          <div style={styles.progressContainer}>
                              <span style={styles.progressLabel}>Progress: {challenge.progress}%</span>
                              <div style={styles.progressBar}>
                                  <div
                                      style={{
                                          ...styles.progressFill,
                                          width: `${challenge.progress}%`,
                                      }}
                                      className="progress-bar" />
                              </div>
                          </div>
                          <button
                              style={styles.joinButton}
                              className="join-button"
                              onClick={() => handleJoinChallenge(challenge.id)}
                              disabled={challenge.progress === 100}
                              aria-label={joinedChallenges.includes(challenge.id)
                                  ? `Leave ${challenge.name}`
                                  : `Join ${challenge.name}`}
                          >
                              {joinedChallenges.includes(challenge.id) ? 'Leave Challenge' : 'Join Challenge'}
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      </div>
      <Footer />
      </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 16px',
  },
  content: {
    maxWidth: '1280px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: 700,
    color: '#1f2937',
    marginBottom: '16px',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  description: {
    fontSize: '1.2rem',
    color: '#4b5563',
    marginBottom: '40px',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  challengesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '32px',
  },
  challengeCard: {
    backgroundColor: 'burlywood',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
    textAlign: 'left',
    position: 'relative',
    overflow: 'hidden',
  },
  challengeTitle: {
    fontSize: '1.6rem',
    fontWeight: 600,
    color: '#1f2937',
    marginBottom: '12px',
  },
  challengeDescription: {
    fontSize: '1rem',
    color: 'GrayText',
    marginBottom: '16px',
    lineHeight: '1.5',
  },
  challengeDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '20px',
  },
  challengeDetail: {
    fontSize: '0.9rem',
    color: 'white',
  },
  progressContainer: {
    marginBottom: '20px',
  },
  progressLabel: {
    fontSize: '0.9rem',
    color: '#1f2937',
    marginBottom: '8px',
    display: 'block',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'skyblue',
    borderRadius: '5px',
  },
  joinButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'brown',
    color: '#ffffff',
    fontWeight: 600,
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Challenges;