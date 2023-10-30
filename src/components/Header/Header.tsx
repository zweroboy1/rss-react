import React, { Component } from 'react';
import { SearchInput } from '../SearchInput';
import { Button } from '../Button';
import { LOCALSTORAGE_NAME } from '../../constants';

import styles from './Header.module.scss';

class Header extends Component {
  constructor(props: object) {
    super(props);
  }

  state = {
    searchQuery: this.getQuery(),
    isError: false,
  };

  getQuery() {
    return localStorage.getItem(LOCALSTORAGE_NAME) ?? '';
  }

  setQuery(query: string) {
    localStorage.setItem(LOCALSTORAGE_NAME, query);
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
    this.setQuery(event.target.value);
  };

  handleSearch = () => {
    console.log(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  emitError = () => {
    this.setState({ isError: true });
  };

  componentDidUpdate() {
    if (this.state.isError)
      throw new Error('You clicked the button and emit the error!');
  }

  render() {
    return (
      <>
        <h1 className={styles.h1}>Movies</h1>
        <div className={styles.container}>
          <SearchInput
            placeholder="input movie title"
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
            getInputValue={this.handleSearch}
          />
          <Button onClick={this.handleSearch}>Search</Button>
          <Button onClick={this.emitError}>Simulate Error</Button>
        </div>
      </>
    );
  }
}

export default Header;
