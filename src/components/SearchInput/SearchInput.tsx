import React from 'react';
import styles from './SearchInput.module.scss';

type Props = {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  getInputValue: () => void;
};

const SearchInput: React.FC<Props> = ({
  placeholder,
  value,
  onChange,
  getInputValue,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      getInputValue();
    }
  };

  return (
    <input
      className={styles.search}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchInput;
