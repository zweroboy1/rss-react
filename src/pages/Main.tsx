import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Pagination } from '../components/Pagination';
import { Beers } from '../components/Beers';
import { AppContextProvider } from '../context/AppContextProvider';

import styles from './Main.module.scss';

const Main: React.FC = () => {
  return (
    <AppContextProvider>
      <main className={styles.main}>
        <Header />
        <Pagination />
        <div className={styles.content}>
          <Beers />
          <div className={styles.right}>
            <Outlet />
          </div>
        </div>
      </main>
    </AppContextProvider>
  );
};

export default Main;
