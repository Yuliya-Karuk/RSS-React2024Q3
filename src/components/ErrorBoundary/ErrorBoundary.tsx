import { Component, ReactNode } from 'react';
import errorImg from '../../assets/error.png';
import styles from './ErrorBoundary.module.scss';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className={styles.errorContainer}>
          <h2 className={styles.errorHeading}>Something went wrong. Refresh the page, please.</h2>
          <img className={styles.errorImage} src={errorImg} alt="Error" />
        </div>
      );
    }
    return children;
  }
}
