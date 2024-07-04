import { Component } from 'react';
import loader from '../../assets/loader2.gif';
import styles from './Loader.module.scss';

export class Loader extends Component {
  render() {
    return (
      <div className={styles.loaderContainer}>
        <img className={styles.loader} src={loader} alt="Loader" />
      </div>
    );
  }
}
