import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import CalendarDemoPage from '../containers/CalendarDemoPage';
import YoutubeContainer from '../containers/YoutubeContainer';
import HookForm from '../containers/HookForm';

function Practice({
  match: {
    url,
  },
}) {
  return (
    <Switch>
      <Route path={`${url}/hook-form`} component={HookForm} />
      <Route path={`${url}/youtube`} component={YoutubeContainer} />
      <Route path={`${url}/calendar`} component={CalendarDemoPage} />
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
