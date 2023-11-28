import { Link } from 'react-router-dom';
import React from 'react';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles['not-found']}>
      <div className={styles['not-found__title']}>404 Not Found</div>
      <Link to="/" className={styles['not-found__link']}>
        Перейти на главную страницу
      </Link>
    </div>
  );
};

export default NotFound;
