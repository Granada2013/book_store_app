import React from 'react';
import ErrorMessage from '../errorMessage/errorMessage';


interface State {
  error: boolean
};

export class ErrorBoundary extends React.Component<{}, State> {
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

const withErrorBoundary = <T extends object>(PassedComponent: React.ComponentType<T>) => {
  return (props: T) => (
    <ErrorBoundary>
      <PassedComponent {...props}/>
    </ErrorBoundary>
  )
};

export default  withErrorBoundary;
