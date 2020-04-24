import {
  createStore,
  applyMiddleware,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers/index';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const getStore = () => {
  const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(
      applyMiddleware(sagaMiddleware),
    ),
  );
  sagaMiddleware.run(rootSaga);

  return store;
};

export default getStore;
