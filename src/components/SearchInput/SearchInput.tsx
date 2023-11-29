import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ITEMS_PER_PAGE } from '@/constants';
import { Button } from '../Button';

import styles from './SearchInput.module.scss';

const SearchInput: React.FC = () => {
  const router = useRouter();
  const { query } = router;
  const { limit } = query;
  const [searchInput, setSearchInput] = useState<string>('');

  const searchItems = () => {
    router.push({
      query: {
        query: searchInput,
        page: String(1),
        limit: String(limit || ITEMS_PER_PAGE),
      },
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchItems();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    setSearchInput(query.query?.toString() || '');
  }, [query]);

  return (
    <>
      <input
        className={styles.search}
        type="text"
        role="searchbox"
        placeholder="input beer name"
        value={searchInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={searchItems}>Search</Button>
    </>
  );
};

export default SearchInput;
