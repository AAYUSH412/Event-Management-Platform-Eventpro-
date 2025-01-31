import { Component } from 'react';
import Error from './Error';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Error 
          code="500"
          message="Something went wrong"
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;