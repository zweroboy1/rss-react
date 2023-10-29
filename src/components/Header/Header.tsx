import React, { Component } from 'react';
import styles from './Header.module.scss';

class Header extends Component {
  render() {
    return <h1 className={styles.header}>Header</h1>;
  }
}

export default Header;
