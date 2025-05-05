import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import './styles/SignupLogin.css';

import email_icon from './assets/email.png';
import password_icon from './assets/password.png';
import star_icon from './assets/star.png';

const Login: React.FC = () => {
    const [password, setPassword] = useState<string>('');

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add your login logic here
    };

    return (
        <main>
            <div className="motivation">
                <h1 className="motivation">
                    Welcome Back To <span>NeuroFit!</span>
                    <br />
                    Happy To See You Again. <img src={star_icon} alt="" />
                </h1>
            </div>

            <div className="container">
                <div className="header">
                    <div className="text">Login</div>
                    <div className="underline"></div>
                </div>

                <div className="acc-state">
                    Don't have an account?{' '}
                    <span>
                        <Link to="/signup">Sign Up</Link>
                    </span>
                </div>

                <form onSubmit={handleLogin} className="inputs">
                    <div className="input-group">
                        <div className="input">
                            <img src={email_icon} alt="" />
                            <input type="email" placeholder="Email Address" required />
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </form>

                <div className="forget-password">
                    Forgot Password?{' '}
                    <span>
                        <a href="/reset-password">Click Here!</a>
                    </span>
                </div>

                <div className="submit-container">
                    <button type="submit" className="submit">
                        Log In
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Login;
