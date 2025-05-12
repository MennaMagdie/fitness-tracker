import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import fitnessBackground from '../../assets/hero-image.png'; // Adjust path based on your project structure
import { Footer } from '../components/Home/Footer';
import { Navbar } from '../components/Home/Navbar';
const FeedbackPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [feedbackType, setFeedbackType] = useState('General Comment');
    const [rating, setRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};
        if (!feedback.trim())
            newErrors.feedback = 'Feedback is required';
        if (rating === 0)
            newErrors.rating = 'Please select a rating';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm())
            return;
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
        return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsxs("div", { style: styles.container, children: [_jsx("style", { children: `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .success-message {
            animation: fadeIn 0.5s ease-in-out;
          }
        ` }), _jsxs("div", { style: styles.successContainer, children: [_jsx("svg", { style: styles.successIcon, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }), _jsx("h2", { style: styles.successTitle, children: "Thank You!" }), _jsx("p", { style: styles.successText, children: "Your feedback helps us improve. We'll get back to you soon!" })] })] })] }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsxs("div", { style: { ...styles.container, backgroundImage: `url(${fitnessBackground})` }, children: [_jsx("style", { children: `
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
      ` }), _jsxs("div", { style: styles.formContainer, children: [_jsx("h1", { style: styles.title, children: "We Value Your Feedback" }), _jsx("p", { style: styles.description, children: "Your thoughts help us make our fitness app better. Share your ideas or report issues!" }), _jsxs("form", { onSubmit: handleSubmit, style: styles.form, "aria-label": "Feedback form", children: [_jsxs("div", { style: styles.formGroup, children: [_jsx("label", { htmlFor: "name", style: styles.label, children: "Name (Optional)" }), _jsx("input", { id: "name", type: "text", value: name, onChange: (e) => setName(e.target.value), style: styles.input, className: "input-field", "aria-describedby": "name-desc", placeholder: "Enter your name" }), _jsx("span", { id: "name-desc", style: styles.srOnly, children: "Optional field for your name" })] }), _jsxs("div", { style: styles.formGroup, children: [_jsx("label", { htmlFor: "email", style: styles.label, children: "Email (Optional)" }), _jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), style: styles.input, className: "input-field", "aria-describedby": "email-desc", placeholder: "Enter your email" }), _jsx("span", { id: "email-desc", style: styles.srOnly, children: "Optional field for your email address" })] }), _jsxs("div", { style: styles.formGroup, children: [_jsx("label", { htmlFor: "feedbackType", style: styles.label, children: "Feedback Type" }), _jsxs("select", { id: "feedbackType", value: feedbackType, onChange: (e) => setFeedbackType(e.target.value), style: styles.select, className: "select-field", "aria-describedby": "feedbackType-desc", children: [_jsx("option", { value: "Feature Request", children: "Feature Request" }), _jsx("option", { value: "Bug Report", children: "Bug Report" }), _jsx("option", { value: "General Comment", children: "General Comment" })] }), _jsx("span", { id: "feedbackType-desc", style: styles.srOnly, children: "Select the type of feedback you are providing" })] }), _jsxs("div", { style: styles.formGroup, children: [_jsx("label", { htmlFor: "feedback", style: styles.label, children: "Your Feedback *" }), _jsx("textarea", { id: "feedback", value: feedback, onChange: (e) => setFeedback(e.target.value), style: styles.textarea, className: "textarea-field", required: true, "aria-describedby": "feedback-desc feedback-error", placeholder: "Tell us your thoughts..." }), _jsx("span", { id: "feedback-desc", style: styles.srOnly, children: "Required field for your feedback message" }), errors.feedback && (_jsx("span", { id: "feedback-error", style: styles.error, children: errors.feedback }))] }), _jsxs("div", { style: styles.formGroup, children: [_jsx("label", { style: styles.label, children: "Rate Your Experience *" }), _jsx("div", { style: styles.ratingContainer, role: "radiogroup", "aria-labelledby": "rating-label", children: [1, 2, 3, 4, 5].map((star) => (_jsx("button", { type: "button", onClick: () => setRating(star), style: {
                                                        ...styles.star,
                                                        color: star <= rating ? '#f59e0b' : '#d1d5db',
                                                    }, className: `star ${star <= rating ? 'selected' : ''}`, "aria-label": `Rate ${star} out of 5`, "aria-checked": star === rating, children: "\u2605" }, star))) }), errors.rating && (_jsx("span", { style: styles.error, id: "rating-error", children: errors.rating })), _jsx("span", { id: "rating-label", style: styles.srOnly, children: "Rate your experience from 1 to 5 stars" })] }), _jsx("button", { type: "submit", style: styles.button, className: "button", disabled: isSubmitting, "aria-label": isSubmitting ? 'Submitting feedback' : 'Submit feedback', children: isSubmitting ? (_jsx("span", { className: "loading", children: "Submitting..." })) : ('Submit Feedback') })] })] })] }), _jsx(Footer, {})] }));
};
const styles = {
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
