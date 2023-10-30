import React, { Component } from 'react';
import { SearchInput } from '../SearchInput';
import { Button } from '../Button';

import styles from './Header.module.scss';

interface HeaderProps {
  query: string;
  onSearch: (query: string) => void;
  onUpdateQuery: (query: string) => void;
}

class Header extends Component<HeaderProps> {
  constructor(props: HeaderProps) {
    super(props);
  }

  state = {
    searchQuery: this.props.query,
    isError: false,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
    this.props.onUpdateQuery(event.target.value);
  };

  handleSearch = () => {
    this.props.onSearch(this.state.searchQuery);
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
