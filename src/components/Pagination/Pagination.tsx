import React from 'react';
import { useRouter } from 'next/router';
import {
  ITEMS_PER_PAGE_OPTIONS,
  ITEMS_PER_PAGE,
  PAGE_LIMIT,
} from '@/constants';

import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
  const router = useRouter();
  const { query } = router;
  const searchQuery = query?.query || '';
  const currentPage = +(query?.page || 1);
  const currentLimit = +(query?.limit || ITEMS_PER_PAGE);

  const updateURL = (newPage: number, newLimit: number) => {
    router.push({
      query: { query: searchQuery, page: newPage, limit: newLimit },
    });
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
    const newLimit = Number(e.target.value);
    updateURL(1, newLimit);
  };

  return (
    <div className={styles['pagination']}>
      <button
        onClick={goToPreviousPage}
        className={styles['pagination__button']}
        data-testid="prev"
      >
        &lt;
      </button>
      <span className={styles['pagination__current']} data-testid="current">
        {currentPage}
      </span>
      <button
        onClick={goToNextPage}
        className={styles['pagination__button']}
        data-testid="next"
      >
        &gt;
      </button>

      <select
        className={styles['pagination__select']}
        value={currentLimit}
        onChange={handleLimitChange}
        data-testid="select"
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
