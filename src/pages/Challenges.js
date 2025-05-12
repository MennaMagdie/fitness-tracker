import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Navbar } from '../components/Home/Navbar';
import { Footer } from '../components/Home/Footer';
// Static Data
const challenges = [
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
const Challenges = () => {
    const [joinedChallenges, setJoinedChallenges] = useState([]);
    const handleJoinChallenge = (challengeId) => {
        if (joinedChallenges.includes(challengeId)) {
            setJoinedChallenges(joinedChallenges.filter((id) => id !== challengeId));
        }
        else {
            setJoinedChallenges([...joinedChallenges, challengeId]);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsxs("div", { style: styles.container, children: [_jsx("style", { children: `
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
      ` }), _jsxs("div", { style: styles.content, children: [_jsx("h1", { style: styles.title, children: "Your Fitness Challenges" }), _jsx("p", { style: styles.description, children: "Take on a challenge to push your limits and stay motivated!" }), _jsx("div", { style: styles.challengesGrid, children: challenges.map((challenge, index) => (_jsxs("div", { style: { ...styles.challengeCard, ['--index']: index }, className: "challenge-card", children: [_jsx("h2", { style: styles.challengeTitle, children: challenge.name }), _jsx("p", { style: styles.challengeDescription, children: challenge.description }), _jsxs("div", { style: styles.challengeDetails, children: [_jsxs("span", { style: styles.challengeDetail, children: [_jsx("strong", { children: "Duration:" }), " ", challenge.duration] }), _jsxs("span", { style: styles.challengeDetail, children: [_jsx("strong", { children: "Difficulty:" }), " ", challenge.difficulty] })] }), _jsxs("div", { style: styles.progressContainer, children: [_jsxs("span", { style: styles.progressLabel, children: ["Progress: ", challenge.progress, "%"] }), _jsx("div", { style: styles.progressBar, children: _jsx("div", { style: {
                                                            ...styles.progressFill,
                                                            width: `${challenge.progress}%`,
                                                        }, className: "progress-bar" }) })] }), _jsx("button", { style: styles.joinButton, className: "join-button", onClick: () => handleJoinChallenge(challenge.id), disabled: challenge.progress === 100, "aria-label": joinedChallenges.includes(challenge.id)
                                                ? `Leave ${challenge.name}`
                                                : `Join ${challenge.name}`, children: joinedChallenges.includes(challenge.id) ? 'Leave Challenge' : 'Join Challenge' })] }, challenge.id))) })] })] }), _jsx(Footer, {})] }));
};
const styles = {
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
