import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import black from './static/d1023796.jpg';

import PracticeRoute from './routes/Practice.jsx';
import Header from './components/Header.jsx';

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
      <Wrapper>
        <Switch>
          <Route path="/" component={Header} />
        </Switch>
        <Container>
          <Switch>
            <Route path="/heyhey" component={() => (
              <img alt="black" src={black} />
            )} />
            <Route path="/practice" component={PracticeRoute} />
          </Switch>
        </Container>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
