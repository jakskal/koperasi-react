import {Link} from "@tanstack/react-router";
import {Component} from "react";

class ErrorBoundary extends Component {
  state = {hasError: false};

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <p>
            Error, <Link to="/dashboard">Go Home</Link>
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
