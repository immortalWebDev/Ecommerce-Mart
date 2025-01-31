import React from 'react';
import styles from './MaintenancePage.module.css';

const MaintenancePage = () => {
  return (
    <div className={styles.maintenanceContainer}>
      <h1 className={styles.title}>🚧 Site Under Maintenance 🚧</h1>
      <p className={styles.message}>We are currently performing scheduled maintenance.</p>
      <blockquote className={styles.quote}>
        <p>"The best way to predict the future is to create it."</p>
        <footer className={styles.quoteFooter}>— Peter Drucker</footer>
      </blockquote>
      <p className={styles.signature}>- Team Piyush</p>
    </div>
  );
};

export default MaintenancePage;
