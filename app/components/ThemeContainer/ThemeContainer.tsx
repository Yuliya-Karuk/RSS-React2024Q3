import { useTheme } from '@contexts/themeProvider';
import classnames from 'classnames';
import styles from './ThemeContainer.module.scss';

interface ThemeContainerProps {
  children: React.ReactNode;
}

const ThemeContainer = ({ children }: ThemeContainerProps) => {
  const { theme } = useTheme();

  return <main className={classnames(styles.page, { [styles.light]: theme === 'light' })}>{children}</main>;
};

export default ThemeContainer;
