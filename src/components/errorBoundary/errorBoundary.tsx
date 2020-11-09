import React from 'react';
import ErrorMessage from '../errorMessage/errorMessage';


interface State {
  error: boolean
};

export default class ErrorBoundary extends React.Component<{},State> {
  state = {
    error: false
  };

  componentDidCatch() {
    this.setState({error: true})
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage/>;
    }
    return this.props.children;
  }
}
