import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AppContext } from '../../context/AppContextProvider';
import { updateQuery } from '../../store/slices/searchSlice';
import styles from './SearchInput.module.scss';

type Props = {
  placeholder: string;
};

const SearchInput: React.FC<Props> = ({ placeholder }) => {
  const { searchQuery, setSearchQuery, updateURL, currentLimit } =
    useContext(AppContext);
  const dispatch = useDispatch();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(updateQuery(searchQuery));
      updateURL(1, currentLimit, searchQuery);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <input
      className={styles.search}
      type="text"
      role="searchbox"
      placeholder={placeholder}
      value={searchQuery}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchInput;
