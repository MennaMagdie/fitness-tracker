import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/SignupLogin.css';

import user_icon from './assets/person.png';
import email_icon from './assets/email.png';
import password_icon from './assets/password.png';
import fire_icon from './assets/fire.png';
import gender_icon from './assets/gender.png';
import calendar_icon from './assets/calendar.png';
import wigth_icon from './assets/wigth.png';
import star_icon from './assets/star.png';

const Signup: React.FC = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [selectedGoal, setSelectedGoal] = useState<string>('');
    const [selectedGender, setSelectedGender] = useState<string>('');
    const [formError, setFormError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormError(null);
        setSuccessMessage(null);

        if (password !== confirmPassword) {
            setFormError('Passwords do not match.');
            return;
        }

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('https://your-server-endpoint.com/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorResult = await response.json();
                setFormError(errorResult.message || 'Signup failed. Please try again.');
                return;
            }

            const result = await response.json();
            setSuccessMessage('Signup successful! Redirecting...');

            // Reset the form fields
            e.currentTarget.reset();
            setPassword('');
            setConfirmPassword('');
            setSelectedGoal('');
            setSelectedGender('');

            // Redirect after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setFormError('Network error. Please try again.');
            console.error(error);
        }
    };

    return (
        <main>
            <div className="motivation">
                <h1 className="motivation">
                    Welcome To <span>NeuroFit!</span>
                    <br />
                    Let's Start Our Journey Together.<img src={star_icon} alt="" />
                </h1>
            </div>

            <div className="container">
                <div className="header">
                    <div className="text">Sign Up</div>
                    <div className="underline"></div>
                </div>

                <div className="acc-state">
                    Already have an account?{' '}
                    <span>
                        <Link to="/login">Log In</Link>
                    </span>
                </div>


                <form onSubmit={handleSubmit} className="inputs">
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" name="firstName" placeholder="First Name" required />
                    </div>
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" name="lastName" placeholder="Last Name" required />
                    </div>
                    <div className="input">
                        <img src={fire_icon} alt="" />
                        <select
                            name="goal"
                            value={selectedGoal}
                            onChange={(e) => setSelectedGoal(e.target.value)}
                            required
                        >
                            <option value="" disabled>Fitness Goal-:</option>
                            <option value="Lose Weight">Lose Weight</option>
                            <option value="Healthy Lifestyle">Healthy Lifestyle</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <div className="input">
                        <img src={gender_icon} alt="" />
                        <select
                            name="gender"
                            value={selectedGender}
                            onChange={(e) => setSelectedGender(e.target.value)}
                            required
                        >
                            <option value="" disabled>Gender-:</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="input">
                        <img src={calendar_icon} alt="" />
                        <input type="date" name="birthDate" required />
                    </div>
                    <div className="input">
                        <img src={wigth_icon} alt="" />
                        <input type="number" name="currentWeight" placeholder="Current Weight (KG)" min={1} required />
                    </div>
                    <div className="input">
                        <img src={wigth_icon} alt="" />
                        <input type="number" name="targetWeight" placeholder="Target Weight (KG)" min={1} required />
                    </div>
                    <div className="input">
                        <img src={email_icon} alt="" />
                        <input type="email" name="email" placeholder="Email Address" required />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>


                    <div className="submit-container">
                        <button type="submit" className="submit">
                            Create Account
                        </button>
                    </div>
                    {/* Messages */}
                    {formError && <div className="error-message">{formError}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}

                </form>
            </div>
        </main>
    );
};

export default Signup;


