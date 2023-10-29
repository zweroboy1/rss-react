import { Component } from 'react';
import { Header } from '../components/Header';
import { Movies } from '../components/Movies';
import styles from './Main.module.scss';

class Main extends Component {
  render() {
    return (
      <main className={styles.main}>
        <Header />
        <Movies />
      </main>
    );
  }
}

export default Main;
