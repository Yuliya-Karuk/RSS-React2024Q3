import { Component } from 'react';
import styles from './ErrorButton.module.scss';

interface ErrorButtonState {
  hasError: boolean;
}

export class ErrorButton extends Component<Record<string, never>, ErrorButtonState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  throwError = () => {
    this.setState({ hasError: true });
  };

  render() {
    const { hasError } = this.state;

    if (hasError) {
      throw new Error('The site is broken!');
    }

    return (
      <button type="button" className={styles.errorButton} onClick={this.throwError}>
        Destroy the World
      </button>
    );
  }
}
