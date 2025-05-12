import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import styles from './Toast.module.css';
const Toast = ({ message, duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for fade-out animation
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);
    return (_jsx("div", { className: `${styles.toast} ${isVisible ? styles.show : styles.hide}`, children: message }));
};
export default Toast;
