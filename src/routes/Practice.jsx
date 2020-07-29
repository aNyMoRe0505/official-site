import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

import Calendar from '../components/Calendar';
import YoutubeContainer from '../containers/practice/YoutubeContainer';
import HookForm from '../containers/practice/HookForm';
import IndexTool from '../containers/practice/IndexTool';
import Slide from '../containers/practice/Slide';
import Notification from '../containers/practice/Notification';
import RxJS from '../containers/practice/RxJS';

function Practice() {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${url}/rxjs`}>
        <RxJS />
      </Route>
      <Route path={`${url}/notification`}>
        <Notification />
      </Route>
      <Route path={`${url}/slide`}>
        <Slide />
      </Route>
      <Route path={`${url}/indexTool`}>
        <IndexTool />
      </Route>
      <Route path={`${url}/hook-form`}>
        <HookForm />
      </Route>
      <Route path={`${url}/youtube`}>
        <YoutubeContainer />
      </Route>
      <Route path={`${url}/calendar`}>
        <Calendar defaultShowStatus />
      </Route>
      <Redirect to={`${url}/calendar`} />
    </Switch>
  );
}

export default Practice;
