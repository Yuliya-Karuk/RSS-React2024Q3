/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';
import logo from '../../assets/logo.png';
import { Search } from '../Search/Search';
import styles from './Header.module.scss';

export class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <img className={styles.logo} src={logo} alt="Logo" />
          <Search />
        </div>
      </header>
    );
  }
}
