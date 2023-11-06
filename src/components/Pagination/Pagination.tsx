import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Pagination = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // Get the current page and limit from the URL query parameters
  const currentPage = Number(queryParams.get('page')) || 1;
  const currentLimit = Number(queryParams.get('limit')) || 8;

  // Function to update the URL with new page and limit
  const updateURL = (page: number, limit: number) => {
    queryParams.set('page', String(page));
    queryParams.set('limit', String(limit));
    navigate(`/?${queryParams.toString()}`);
  };

  return (
    <div>
      <select
        value={currentLimit}
        onChange={(e) => {
          const newLimit = parseInt(e.target.value, 10);
          updateURL(1, newLimit); // Reset to page 1 when changing limit
        }}
      >
        <option value="8">8 items per page</option>
        <option value="12">12 items per page</option>
        <option value="20">20 items per page</option>
      </select>
      <button
        onClick={() => {
          if (currentPage > 1) {
            updateURL(currentPage - 1, currentLimit);
          }
        }}
      >
        &lt;
      </button>
      <span>{currentPage}</span>
      <button
        onClick={() => {
          if (currentPage < Math.ceil(100 / currentLimit)) {
            updateURL(currentPage + 1, currentLimit);
          }
        }}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
