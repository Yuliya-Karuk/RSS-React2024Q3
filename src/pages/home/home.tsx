import { CharacterList } from '@components/CharacterList/CharacterList';
import styles from './home.module.scss';

export const Home = () => (
  <div className={styles.page}>
    <CharacterList />
  </div>
);
