import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from '../Navbar';
import styles from './Layout.module.css';
const Layout = ({ children }) => {
    return (_jsxs("div", { className: styles.layout, children: [_jsx(Navbar, {}), _jsx("main", { className: styles.main, children: children })] }));
};
export default Layout;
