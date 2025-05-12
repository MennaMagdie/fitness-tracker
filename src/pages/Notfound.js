import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
const NotFoundPage = () => {
    return (_jsxs("div", { style: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg,rgba(245, 221, 70, 0.9),rgb(207, 112, 10))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            overflow: 'hidden',
            position: 'relative'
        }, children: [_jsx("style", { children: `
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }

          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .float { animation: float 3.5s ease-in-out infinite; }
          .pulse { animation: pulse 4s ease-in-out infinite; }
          .rotate { animation: rotate 25s linear infinite; }

          .hover-scale:hover {
            transform: scale(1.1);
            transition: transform 0.3s ease;
          }

          .hover-glow:hover {
            box-shadow: 0 0 25px rgba(255,255,255,0.6);
            transition: box-shadow 0.3s ease;
          }

          .decor-circle {
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.2);
          }
        ` }), _jsxs("div", { style: {
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 10,
                    color: '#fff'
                }, children: [_jsx("h1", { style: {
                            fontSize: '8rem',
                            fontWeight: 800,
                            letterSpacing: '0.2rem'
                        }, className: "pulse", children: "404" }), _jsx("h2", { style: {
                            fontSize: '2rem',
                            fontWeight: 600,
                            marginTop: '16px'
                        }, className: "float", children: "Page Not Found" }), _jsx("p", { style: {
                            fontSize: '1.2rem',
                            marginTop: '16px',
                            maxWidth: '400px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            color: '#e2e8f0'
                        }, children: "Sorry, this page seems to have wandered off. Let's head back!" }), _jsx("div", { style: { marginTop: '32px' }, children: _jsx(Link, { to: "/", children: _jsx("button", { style: {
                                    padding: '12px 24px',
                                    backgroundColor: 'white',
                                    color: '#1f2937',
                                    fontWeight: 700,
                                    borderRadius: '9999px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1rem'
                                }, className: "hover-scale hover-glow float", children: "Back to Home" }) }) })] }), _jsx("div", { className: "decor-circle float", style: {
                    width: '80px',
                    height: '80px',
                    top: '10%',
                    left: '10%'
                } }), _jsx("div", { className: "decor-circle rotate", style: {
                    width: '120px',
                    height: '120px',
                    bottom: '15%',
                    right: '15%'
                } }), _jsx("div", { className: "decor-circle float", style: {
                    width: '60px',
                    height: '60px',
                    top: '30%',
                    right: '25%'
                } })] }));
};
export default NotFoundPage;
