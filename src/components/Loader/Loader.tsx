import React from 'react';
import styles from './Loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles['loader-container']} data-testid={'loader'}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
