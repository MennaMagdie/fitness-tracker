import { jsx as _jsx } from "react/jsx-runtime";
import styles from './Button.module.css';
const Button = ({ variant = 'primary', size = 'medium', onClick, children, className = '', disabled = false, }) => {
    return (_jsx("button", { className: `${styles.button} ${styles[variant]} ${styles[size]} ${className}`, onClick: onClick, disabled: disabled, children: children }));
};
export default Button;
