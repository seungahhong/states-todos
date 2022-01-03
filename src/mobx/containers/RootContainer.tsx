import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
// import TodoContentContainer from './TodoContentContainer';

import todosStore from "../states/stores/TodosStore";
import { observer, Provider } from 'mobx-react';
import TodoContentContainer from './TodoContentContainer';

interface FallbackProps {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

const ErrorFallback = ({error, resetErrorBoundary}: FallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
};

@observer
class RootContainer extends React.Component<{}, {}> {
  private todosStore: todosStore;

  constructor(props: any) {
    super(props);
    this.todosStore = new todosStore();
  }

  render() {
    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Provider store={this.todosStore}>
          <TodoContentContainer />
        </Provider>
      </ErrorBoundary>
    );
  }
}

export default RootContainer;
