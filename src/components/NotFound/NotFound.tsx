import React from 'react';
import { useRouter } from 'next/router';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  const router = useRouter();

  const backToMain = () => {
    router.push({
      pathname: '/',
      query: {},
    });
  };

  return (
    <div className={styles['not-found']}>
      <div className={styles['not-found__title']}>404 Not Found</div>
      <a className={styles['not-found__link']} onClick={backToMain}>
        Back to the Main page
      </a>
    </div>
  );
};

export default NotFound;
