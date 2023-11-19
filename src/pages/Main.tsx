import React from 'react';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Header } from '../components/Header';
import { Pagination } from '../components/Pagination';
import { Beers } from '../components/Beers';
import { store } from '../store/store';
import { AppContextProvider } from '../context/AppContextProvider';

import styles from './Main.module.scss';

const Main: React.FC = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default Main;
