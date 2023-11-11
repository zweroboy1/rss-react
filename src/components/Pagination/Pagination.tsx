import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContextProvider';
import { ITEMS_PER_PAGE_OPTIONS, PAGE_LIMIT } from '../../constants';

import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
  const { searchQuery, currentPage, currentLimit, updateURL } =
    useContext(AppContext);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      updateURL(currentPage - 1, currentLimit, searchQuery);
    }
  };

  const goToNextPage = () => {
    if (currentPage < PAGE_LIMIT) {
      updateURL(currentPage + 1, currentLimit, searchQuery);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.target.value);
    updateURL(1, newLimit, searchQuery);
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
