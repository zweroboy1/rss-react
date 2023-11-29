import React, { useState, useEffect } from 'react';
import { SearchInput } from '../SearchInput';
import { Button } from '../Button';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [isError, setIsError] = useState(false);

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
        <SearchInput />
        <Button onClick={emitError}>Simulate Error</Button>
      </div>
    </>
  );
};

export default Header;
