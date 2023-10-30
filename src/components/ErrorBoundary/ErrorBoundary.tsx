import { Component, ReactNode, ReactElement, ErrorInfo } from 'react';
import styles from './ErrorBoundary.module.scss';
import { Button } from '../Button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactElement;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): object {
    return { hasError: true };
  }

  static handleButtonClick = (): void => {
    window.location.reload();
  };

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.setState({ hasError: true });
    console.log('Handled error:', error, 'Info:', info);
  }

  render() {
    const { hasError } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      return (
        <div className={styles.error}>
          <h1>{fallback}</h1>
          <Button onClick={ErrorBoundary.handleButtonClick}>Reload page</Button>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
