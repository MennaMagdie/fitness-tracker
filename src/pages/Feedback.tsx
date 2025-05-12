import React, { useState, FormEvent } from 'react';
import fitnessBackground from '../../assets/hero-image.png'; // Adjust path based on your project structure
import { Footer } from '../components/Home/Footer';
import { Navbar } from '../components/Home/Navbar';
const FeedbackPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('General Comment');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ feedback?: string; rating?: string }>({});

  const validateForm = () => {
    const newErrors: { feedback?: string; rating?: string } = {};
    if (!feedback.trim()) newErrors.feedback = 'Feedback is required';
    if (rating === 0) newErrors.rating = 'Please select a rating';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setFeedback('');
      setFeedbackType('General Comment');
      setRating(0);
    }, 1500); // Simulate API call
  };

  if (isSubmitted) {
    return (
    <>  
    <Navbar />  
      <div style={styles.container}>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .success-message {
            animation: fadeIn 0.5s ease-in-out;
          }
        `}</style>
        <div style={styles.successContainer}>
          <svg style={styles.successIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <h2 style={styles.successTitle}>Thank You!</h2>
          <p style={styles.successText}>Your feedback helps us improve. We'll get back to you soon!</p>
        </div>
      </div>
      {/* <Footer /> ملهوش لازمه هنا */}
    </>  
    );
  }

  return (
  <>
  <Navbar />  
    <div style={{ ...styles.container, backgroundImage: `url(${fitnessBackground})` }}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes hoverScale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .loading::before {
          content: '';
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid #fff;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: 8px;
        }
        .star:hover, .star.selected {
          transform: scale(1.2);
          transition: transform 0.2s ease;
        }
        .button:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .input-field:focus, .textarea-field:focus, .select-field:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.3);
          transition: box-shadow 0.2s ease;
        }
      `}</style>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>We Value Your Feedback</h1>
        <p style={styles.description}>
          Your thoughts help us make our fitness app better. Share your ideas or report issues!
        </p>
        <form onSubmit={handleSubmit} style={styles.form} aria-label="Feedback form">
          {/* Name Input */}
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>Name (Optional)</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              className="input-field"
              aria-describedby="name-desc"
              placeholder="Enter your name"
            />
            <span id="name-desc" style={styles.srOnly}>
              Optional field for your name
            </span>
          </div>

          {/* Email Input */}
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email (Optional)</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              className="input-field"
              aria-describedby="email-desc"
              placeholder="Enter your email"
            />
            <span id="email-desc" style={styles.srOnly}>
              Optional field for your email address
            </span>
          </div>

          {/* Feedback Type Dropdown */}
          <div style={styles.formGroup}>
            <label htmlFor="feedbackType" style={styles.label}>Feedback Type</label>
            <select
              id="feedbackType"
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              style={styles.select}
              className="select-field"
              aria-describedby="feedbackType-desc"
            >
              <option value="Feature Request">Feature Request</option>
              <option value="Bug Report">Bug Report</option>
              <option value="General Comment">General Comment</option>
            </select>
            <span id="feedbackType-desc" style={styles.srOnly}>
              Select the type of feedback you are providing
            </span>
          </div>

          {/* Feedback Textarea */}
          <div style={styles.formGroup}>
            <label htmlFor="feedback" style={styles.label}>Your Feedback *</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              style={styles.textarea}
              className="textarea-field"
              required
              aria-describedby="feedback-desc feedback-error"
              placeholder="Tell us your thoughts..."
            />
            <span id="feedback-desc" style={styles.srOnly}>
              Required field for your feedback message
            </span>
            {errors.feedback && (
              <span id="feedback-error" style={styles.error}>
                {errors.feedback}
              </span>
            )}
          </div>

          {/* Rating Component */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Rate Your Experience *</label>
            <div style={styles.ratingContainer} role="radiogroup" aria-labelledby="rating-label">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  style={{
                    ...styles.star,
                    color: star <= rating ? '#f59e0b' : '#d1d5db',
                  }}
                  className={`star ${star <= rating ? 'selected' : ''}`}
                  aria-label={`Rate ${star} out of 5`}
                  aria-checked={star === rating}
                >
                  ★
                </button>
              ))}
            </div>
            {errors.rating && (
              <span style={styles.error} id="rating-error">
                {errors.rating}
              </span>
            )}
            <span id="rating-label" style={styles.srOnly}>
              Rate your experience from 1 to 5 stars
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={styles.button}
            className="button"
            disabled={isSubmitting}
            aria-label={isSubmitting ? 'Submitting feedback' : 'Submit feedback'}
          >
            {isSubmitting ? (
              <span className="loading">Submitting...</span>
            ) : (
              'Submit Feedback'
            )}
          </button>
        </form>
      </div>
    </div>
    <Footer />
</>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  formContainer: {
    maxWidth: '500px',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white for readability
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    borderBlockColor: 'orange',
    borderColor: 'orange'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: '16px',
  },
  description: {
    fontSize: '1rem',
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#1f2937',
  },
  input: {
    padding: '10px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1rem',
    color: '#1f2937',
    backgroundColor: '#f9fafb',
  },
  select: {
    padding: '10px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1rem',
    color: '#1f2937',
    backgroundColor: '#f9fafb',
  },
  textarea: {
    padding: '10px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1rem',
    color: '#1f2937',
    backgroundColor: '#f9fafb',
    minHeight: '120px',
    resize: 'vertical',
  },
  ratingContainer: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
  },
  star: {
    fontSize: '1.5rem',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  },
  button: {
    padding: '12px',
    backgroundColor: 'orange',
    color: '#ffffff',
    fontWeight: 600,
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '16px',
  },
  error: {
    color: '#dc2626',
    fontSize: '0.8rem',
  },
  successContainer: {
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white for readability
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    width: '100%',
  },
  successIcon: {
    width: '48px',
    height: '48px',
    color: '#22c55e',
    marginBottom: '16px',
  },
  successTitle: {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#1f2937',
    marginBottom: '16px',
  },
  successText: {
    fontSize: '1rem',
    color: '#4b5563',
  },
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    border: '0',
  },
};

export default FeedbackPage;