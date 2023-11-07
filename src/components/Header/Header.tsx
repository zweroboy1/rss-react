import React, { useState, useEffect } from 'react';
import { SearchInput } from '../SearchInput';
import { Button } from '../Button';

import styles from './Header.module.scss';

interface HeaderProps {
  query: string;
  onSearch: (query: string) => void;
  onUpdateQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  const [searchQuery, setSearchQuery] = useState<string>(props.query);
  const [isError, setIsError] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    props.onUpdateQuery(event.target.value);
  };

  const handleSearch = () => {
    props.onSearch(searchQuery);
  };

  const emitError = () => {
    setIsError(true);
  };

  useEffect(() => {
    if (isError) {
      throw new Error('You clicked the button and emitted the error!');
    }
  }, [isError]);

  return (
    <>
      <h1 className={styles.h1}>Choose your beer</h1>
      <div className={styles.container}>
        <SearchInput
          placeholder="input beer name"
          value={searchQuery}
          onChange={handleInputChange}
          getInputValue={handleSearch}
        />
        <Button onClick={handleSearch}>Search</Button>
        <Button onClick={emitError}>Simulate Error</Button>
      </div>
    </>
  );
};

export default Header;
