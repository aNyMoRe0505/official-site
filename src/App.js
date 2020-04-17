import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import CalendarDemoPage from './components/CalendarDemoPage.jsx';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Switch>
          <Route path="/test" component={null} />
          <Route path="/" component={CalendarDemoPage} />
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
