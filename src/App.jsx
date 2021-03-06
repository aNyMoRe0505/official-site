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
import Archives from './containers/Archives';
import Footer from './containers/Footer';

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

function MainBoard() {
  // 先暫時為了用useRouteMatch拆開
  const darkMode = useContext(DarkModeContext);
  const matchArticleDetailRoute = useRouteMatch('/blog');

  return (
    <Container darkMode={darkMode && matchArticleDetailRoute}>
      <Switch>
        <Route path="/heyhey">
          <div style={{ height: '100%' }}>
            <img style={{ width: '100%' }} alt="black" src={black} />
          </div>
        </Route>
        <Route path="/archives">
          <Archives />
        </Route>
        <Route path="/blog">
          <BlogRoute />
        </Route>
        <Route path="/practice">
          <PracticeRoute />
        </Route>
        <Route path="/">
          <About />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Container>
  );
}

function App() {
  // 暫時只有Blog可切換darkMode
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  return (
    <BrowserRouter basename="/official-site">
      <GoToTop />
      <Provider store={store}>
        <DarkModeContext.Provider value={darkMode}>
          <DarkModeSwitcher darkMode={darkMode} setDarkMode={setDarkMode} />
          <Wrapper>
            <Header />
            <MainBoard />
            <Footer />
          </Wrapper>
        </DarkModeContext.Provider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
