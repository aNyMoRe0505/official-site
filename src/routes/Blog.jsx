import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import BlogContainer from '../containers/blog/Blog';
import ArticleContainer from '../containers/blog/ArticleContainer';
import TagCategoryArticle from '../containers/blog/TagCategoryArticle';

function Blog({
  match: {
    url,
  },
}) {
  return (
    <Switch>
      <Route path={`${url}/categoryArticle/:categoryId`} component={TagCategoryArticle} />
      <Route path={`${url}/tagArticle/:tagId`} component={TagCategoryArticle} />
      <Route path={`${url}/article/:articleId`} component={ArticleContainer} />
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
