import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import BlogContainer from '../containers/Blog/Blog';

function Blog({
  match: {
    url,
  },
}) {
  return (
    <Switch>
      <Route path={`${url}/article/:articleId`} component={null} />
      <Route path={`${url}`} component={BlogContainer} />
      <Redirect to={`${url}`} />
    </Switch>
  );
}

Blog.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};

export default Blog;
