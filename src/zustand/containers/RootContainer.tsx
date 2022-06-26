import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import TodoContentContainer from "./TodoContentContainer";

interface FallbackProps {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

function RootContainer() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <TodoContentContainer />
    </ErrorBoundary>
  );
}

export default RootContainer;
