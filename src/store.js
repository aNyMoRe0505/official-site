import {
  createStore,
  applyMiddleware,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const enhancer = process.env.NODE_ENV === 'production'
  ? applyMiddleware(sagaMiddleware) : composeWithDevTools(applyMiddleware(sagaMiddleware));

const getStore = () => {
  const store = createStore(
    rootReducer,
    {},
    enhancer,
  );

  if (module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  sagaMiddleware.run(rootSaga);

  return store;
};

export default getStore;
