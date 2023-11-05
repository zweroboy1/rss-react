import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Beers } from '../components/Beers';
import styles from './Main.module.scss';
import { LOCALSTORAGE_NAME } from '../constants';

const Main: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(getQuery());

  function getQuery() {
    return localStorage.getItem(LOCALSTORAGE_NAME) ?? '';
  }

  function setQuery(query: string) {
    localStorage.setItem(LOCALSTORAGE_NAME, query);
  }

  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  return (
    <main className={styles.main}>
      <Header
        query={searchQuery}
        onSearch={updateSearchQuery}
        onUpdateQuery={setQuery}
      />
      <div className={styles.content}>
        <Beers query={searchQuery} />
        <div className={styles.right}>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Main;
