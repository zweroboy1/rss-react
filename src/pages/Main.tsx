import { Component } from 'react';
import { Header } from '../components/Header';
import { Movies } from '../components/Movies';
import styles from './Main.module.scss';
import { LOCALSTORAGE_NAME } from '../constants';

class Main extends Component {
  state = {
    searchQuery: this.getQuery(),
  };

  getQuery() {
    return localStorage.getItem(LOCALSTORAGE_NAME) ?? '';
  }

  setQuery(query: string) {
    localStorage.setItem(LOCALSTORAGE_NAME, query);
  }

  updateSearchQuery = (query: string) => {
    console.log('lol', query);
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <main className={styles.main}>
        <Header
          query={this.state.searchQuery}
          onSearch={this.updateSearchQuery}
          onUpdateQuery={this.setQuery}
        />
        <Movies query={this.state.searchQuery} />
      </main>
    );
  }
}

export default Main;
