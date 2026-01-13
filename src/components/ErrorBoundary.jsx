import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("UI crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh" }}>
          <h1>Something seriously went wrong!</h1>
          <h2>Your previos action was fatal</h2>
          <p>Please refresh the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
