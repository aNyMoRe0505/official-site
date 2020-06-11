import React, { useState, useContext } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';

import black from './static/d1023796.jpg';

import GoToTop from './components/GoToTop';
import DarkModeSwitcher from './components/DarkModeSwitcher';
import Header from './containers/Header';
import About from './containers/About';

import PracticeRoute from './routes/Practice';
import BlogRoute from './routes/Blog';

import getStore from './store';

import { DarkModeContext } from './config/context';

const store = getStore();

const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 95px 25px 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ darkMode }) => (darkMode && '#1e2330') || 'white'};
  transition-duration: 0.2s;
  transition-property: background-color;
  transition-timing-function: ease;
`;

const IconProviderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 15px;
  left: 15px;
  color: gray;
  white-space: pre-wrap;
`;

function MainBoard() {
  // 先暫時為了用useRouteMatch拆開
  const darkMode = useContext(DarkModeContext);
  const matchArticleDetailRoute = useRouteMatch('/blog');

  return (
    <Container darkMode={darkMode && matchArticleDetailRoute}>
      <Switch>
        <Route
          path="/heyhey"
          component={() => (
            <div style={{ height: '100%' }}>
              <img style={{ width: '100%' }} alt="black" src={black} />
            </div>
          )}
        />
        <Route path="/blog" component={BlogRoute} />
        <Route path="/practice" component={PracticeRoute} />
        <Route path="/" component={About} />
        <Redirect to="/" />
      </Switch>
    </Container>
  );
}

function App() {
  // 暫時只有Blog可切換darkMode
  const [darkMode, setDarkMode] = useState(false);

  return (
    <BrowserRouter basename="/official-site">
      <GoToTop />
      <Provider store={store}>
        <DarkModeContext.Provider value={darkMode}>
          <DarkModeSwitcher darkMode={darkMode} setDarkMode={setDarkMode} />
          <Wrapper>
            <Header />
            <MainBoard />
            <IconProviderWrap>
              Icon:
              <a
                style={{ margin: '0 0 0 5px', color: 'rgb(87, 173, 92)' }}
                rel="noopener noreferrer"
                target="_blank"
                href="https://icons8.com/"
              >
                Icons8
              </a>
              {' & '}
              Google Images
            </IconProviderWrap>
          </Wrapper>
        </DarkModeContext.Provider>
      </Provider>
    </BrowserRouter>
  );
}

export default hot(App);