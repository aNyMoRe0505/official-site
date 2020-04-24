import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import styled from 'styled-components';
import { Provider } from 'react-redux';

import black from './static/d1023796.jpg';

import PracticeRoute from './routes/Practice';
import Header from './containers/Header';

import getStore from './store';

const store = getStore();

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <BrowserRouter basename="/official-site">
      <Provider store={store}>
        <Wrapper>
          <Switch>
            <Route path="/" component={Header} />
          </Switch>
          <Container>
            <Switch>
              <Route
                path="/heyhey"
                component={() => (
                  <img style={{ width: '100%' }} alt="black" src={black} />
                )}
              />
              <Route path="/practice" component={PracticeRoute} />
              <Redirect to="/" />
            </Switch>
          </Container>
        </Wrapper>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
