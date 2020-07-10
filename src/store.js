import {
  createStore,
  applyMiddleware,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
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

  if (module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  sagaMiddleware.run(rootSaga);

  return store;
};

export default getStore;
