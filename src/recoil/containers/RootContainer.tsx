import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import ReactLoading from 'react-loading';
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

function RootContainer() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<ReactLoading color={'#00b2b2'} height={50} width={50} />}>
        <RecoilRoot>
          <TodoContentContainer />
        </RecoilRoot>
      </Suspense>
    </ErrorBoundary>
  );
}

export default RootContainer;
