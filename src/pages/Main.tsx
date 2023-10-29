import { Component } from 'react';
import { Header } from '../components/Header';
import { Movies } from '../components/Movies';
//import { SearchForm } from '../components/SearchForm';
import styles from './Main.module.scss';

class Main extends Component {
  render() {
    return (
      <main className={styles.main}>
        <Header />
        <Movies />
        {/*
        <h1>Movies</h1>
        <div className={styles.container}>
          <SearchForm
            placeholder='input movie title'
            value=''
            onChange={() => null}
            getInputValue={(text:string) => console.log(text)}
          />
        </div>*/}
      </main>
    );
  }
}

export default Main;
