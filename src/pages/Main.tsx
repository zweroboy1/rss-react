import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Pagination } from '../components/Pagination';
import { Beers } from '../components/Beers';
import styles from './Main.module.scss';
import { LOCALSTORAGE_NAME } from '../constants';

const Main: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');
  const lsQuery = getQuery();
  const [searchQuery, setSearchQuery] = useState<string>(query || getQuery());

  function getQuery(): string {
    return localStorage.getItem(LOCALSTORAGE_NAME) ?? '';
  }

  function setQuery(query: string): void {
    localStorage.setItem(LOCALSTORAGE_NAME, query);
  }

  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
    queryParams.set('query', query);
    queryParams.set('page', '1');
    navigate(`/?${queryParams.toString()}`);
  };

  useEffect(() => {
    if (query === null) {
      queryParams.set('query', lsQuery);
      navigate(`/?${queryParams.toString()}`);
    }
    if (query && query !== searchQuery) {
      setSearchQuery(query);
    }
  }, [query, searchQuery]);

  return (
    <main className={styles.main}>
      <Header
        query={searchQuery}
        onSearch={updateSearchQuery}
        onUpdateQuery={setQuery}
      />
      <Pagination />
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
