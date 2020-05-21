import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import Calendar from '../components/Calendar';
import YoutubeContainer from '../containers/practice/YoutubeContainer';
import HookForm from '../containers/practice/HookForm';
import IndexTool from '../containers/practice/IndexTool';
import Slide from '../containers/practice/Slide';
import Notification from '../containers/practice/Notification';
import RxJS from '../containers/practice/RxJS';

function Practice({
  match: {
    url,
  },
}) {
  return (
    <Switch>
      <Route path={`${url}/rxjs`} component={RxJS} />
      <Route path={`${url}/notification`} component={Notification} />
      <Route path={`${url}/slide`} component={Slide} />
      <Route path={`${url}/indexTool`} component={IndexTool} />
      <Route path={`${url}/hook-form`} component={HookForm} />
      <Route path={`${url}/youtube`} component={YoutubeContainer} />
      <Route path={`${url}/calendar`} component={() => <Calendar defaultShowStatus />} />
      <Redirect to={`${url}/calendar`} />
    </Switch>
  );
}

Practice.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};

export default Practice;
