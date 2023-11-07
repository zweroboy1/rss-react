import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ITEMS_PER_PAGE_OPTIONS, PAGE_LIMIT } from '../../constants';

import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get('page')) || 1;
  const currentLimit =
    Number(queryParams.get('limit')) || ITEMS_PER_PAGE_OPTIONS[0];

  const updateURL = (page: number, limit: number) => {
    queryParams.set('page', String(page));
    queryParams.set('limit', String(limit));
    navigate(`/?${queryParams.toString()}`);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      updateURL(currentPage - 1, currentLimit);
    }
  };

  const goToNextPage = () => {
    if (currentPage < PAGE_LIMIT) {
      updateURL(currentPage + 1, currentLimit);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value, 10);
    updateURL(1, newLimit);
  };

  return (
    <div className={styles['pagination']}>
      <button
        onClick={goToPreviousPage}
        className={styles['pagination__button']}
      >
        &lt;
      </button>
      <span className={styles['pagination__current']}>{currentPage}</span>
      <button onClick={goToNextPage} className={styles['pagination__button']}>
        &gt;
      </button>

      <select
        className={styles['pagination__select']}
        value={currentLimit}
        onChange={handleLimitChange}
      >
        {ITEMS_PER_PAGE_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {`${option} items per page`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
