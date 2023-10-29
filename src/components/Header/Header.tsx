import React, { Component } from 'react';
import { SearchInput } from '../SearchInput';
import { Button } from '../Button';

import styles from './Header.module.scss';

class Header extends Component {
  state = {
    searchQuery: '',
    isError: false,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearch = () => {
    console.log(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  emitError = () => {
    this.setState({ isError: true });
  };

  render() {
    if (this.state.isError) {
      throw new Error('There is a bad Error!!!');
    }
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
        </div>
      </>
    );
  }
}

export default Header;
