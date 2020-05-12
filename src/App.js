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
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 95px 25px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ darkMode }) => (darkMode && '#282c35') || 'white'};
  transition-duration: 0.2s;
  transition-property: background-color;
  transition-timing-function: ease;
`;

function MainBoard() {
  const darkMode = useContext(DarkModeContext);
  const matchArticleDetailRoute = useRouteMatch('/blog/article/:articleId');

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
  // 暫時只有Article文章可切換darkMode
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
          </Wrapper>
        </DarkModeContext.Provider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
