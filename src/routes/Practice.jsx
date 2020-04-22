import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import CalendarDemoPage from '../containers/CalendarDemoPage.jsx';

function Practice({
  match: {
    url,
  },
}) {
  return (
    <Switch>
      <Route path={`${url}/calendar`} component={CalendarDemoPage} />
      <Redirect to={`${url}/calendar`} />
    </Switch>
  );
}

Practice.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default Practice;
