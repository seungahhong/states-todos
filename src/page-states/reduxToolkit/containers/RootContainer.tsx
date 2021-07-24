import React from 'react';
import { Provider } from 'react-redux';
import TodoContentContainer from './TodoContentContainer';

import store from "../states/store";

function RootContainer() {
  return (
    <Provider store={store}>
      <TodoContentContainer />
    </Provider>
  );
}

export default RootContainer;
