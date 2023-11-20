import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuery } from '../store/slices/searchSlice';
import {
  LOCALSTORAGE_NAME,
  ITEMS_PER_PAGE,
  ITEMS_PER_PAGE_OPTIONS,
  PAGE_LIMIT,
} from '../constants';
import { RootState } from '../store/store';

interface AppContextProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  currentPage: number;
  currentLimit: number;
  updateURL: (page?: number, limit?: number, query?: string) => void;
}

export const AppContext = createContext<AppContextProps>({
  searchQuery: '',
  setSearchQuery: () => {},
  currentPage: 1,
  currentLimit: ITEMS_PER_PAGE,
  updateURL: () => {},
});

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const getQuery = (): string => {
    return localStorage.getItem(LOCALSTORAGE_NAME) ?? '';
  };
  const setQuery = (query: string): void => {
    localStorage.setItem(LOCALSTORAGE_NAME, query);
  };

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentLimit, setCurrentLimit] = useState<number>(ITEMS_PER_PAGE);

  const newQuery = queryParams.get('query') ?? getQuery();
  const currentQuery = useSelector((state: RootState) => state.search.query);
  if (currentQuery !== newQuery) {
    dispatch(updateQuery(newQuery));
  }

  const updateURL = (
    page: number = 1,
    limit: number = ITEMS_PER_PAGE,
    query: string = ''
  ) => {
    queryParams.set('query', String(query));
    queryParams.set('page', String(page));
    queryParams.set('limit', String(limit));
    navigate(`/?${queryParams.toString()}`);
  };

  useEffect(() => {
    const updateContextData = async () => {
      const queryParams = new URLSearchParams(location.search);
      const newQuery = queryParams.get('query') ?? getQuery();

      let newPage = Number(queryParams.get('page')) || 1;
      let newLimit = Number(queryParams.get('limit')) || ITEMS_PER_PAGE;

      if (!ITEMS_PER_PAGE_OPTIONS.includes(newLimit)) {
        newLimit = ITEMS_PER_PAGE;
      }
      if (newPage > PAGE_LIMIT) {
        newPage = PAGE_LIMIT;
      }

      setQuery(newQuery);
      setSearchQuery(newQuery);
      setCurrentPage(newPage);
      setCurrentLimit(newLimit);
    };
    updateContextData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <AppContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        currentPage,
        currentLimit,
        updateURL,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
