import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white p-8 font-mono flex flex-col justify-center items-center">
          <div className="max-w-4xl w-full bg-slate-800 border border-red-500 rounded-lg p-6 shadow-2xl overflow-auto max-h-[85vh]">
            <h1 className="text-2xl font-bold text-red-400 mb-4">React Runtime Error</h1>
            <p className="text-lg mb-2 font-semibold">{this.state.error?.toString()}</p>
            {this.state.errorInfo && (
              <pre className="bg-slate-950 p-4 rounded text-xs text-red-300 overflow-x-auto whitespace-pre-wrap">
                {this.state.errorInfo.componentStack}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-sans font-medium transition-colors"
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
