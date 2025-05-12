import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import styles from './Toast.module.css';
const Toast = ({ message, onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);
    return (_jsx("div", { className: styles.toast, children: _jsx("p", { children: message }) }));
};
export default Toast;
