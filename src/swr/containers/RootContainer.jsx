import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ReactLoading from 'react-loading';
import TodoContentContainer from './TodoContentContainer';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient(); 


const ErrorFallback = ({error, resetErrorBoundary}) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
};

function RootContainer() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<ReactLoading color={'#00b2b2'} height={50} width={50} />}>
        <QueryClientProvider client={queryClient}>
          <TodoContentContainer />
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default RootContainer;
