import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-crypto-dark text-white p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-red-500 mb-4">Something went wrong</h1>
            <div className="bg-crypto-dark-200 p-6 rounded-lg mb-4">
              <h2 className="text-xl font-semibold mb-2">Error Details:</h2>
              <p className="text-red-400 mb-4">
                {this.state.error && this.state.error.toString()}
              </p>
              {this.state.errorInfo && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-crypto-gold">
                    Stack Trace (click to expand)
                  </summary>
                  <pre className="mt-2 text-sm bg-crypto-dark-300 p-4 rounded overflow-auto">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-crypto-gold text-black px-6 py-2 rounded font-semibold hover:bg-crypto-gold/90"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
