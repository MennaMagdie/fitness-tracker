import React from 'react';
import { Navbar } from '../Home/Navbar';
import { Footer } from '../Home/Footer';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
      {/* Footer will be added here when available */}
    </div>
  );
};

export default Layout; 