import React from 'react';
import styles from '../styles/home.module.scss';

const HomePage: React.FC = () => (
  <div>
    <h1 className={styles.title}>Добро пожаловать на главную страницу!</h1>
    <p>Это ваше приложение Next.js.</p>
  </div>
);

export default HomePage;
