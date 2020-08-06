import React from 'react';
import styles from './Header.module.scss';

function Header() {
    return (
      <div className={styles.header}>
        <h1 className={styles.title}>Keuzehulp</h1>
        <h2 className={styles.subtitle}>Wat kan ik doen met mijn pakket?</h2>
      </div>
    );
}

export default Header;
