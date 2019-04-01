import React from 'react';
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {}

  render() {
    if (this.state.hasError) {
      return (
        <h1>
          Some error happened, app crashed. <br />
          Please reload page to access again.
          <br />
          Or touch {}
          <span style={{ color: 'red' }}>
            607-232-6499 ,yinyppyin@gmail.com {}
          </span>
          for help!
        </h1>
      );
    }

    return this.props.children;
  }
}
