import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

import BlogContainer from '../containers/blog/Blog';
import ArticleContainer from '../containers/blog/ArticleContainer';
import TagCategoryArticle from '../containers/blog/TagCategoryArticle';

function Blog() {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${url}/categoryArticle/:categoryId`}>
        <TagCategoryArticle />
      </Route>
      <Route path={`${url}/tagArticle/:tagId`}>
        <TagCategoryArticle />
      </Route>
      <Route path={`${url}/article/:articleId`}>
        <ArticleContainer />
      </Route>
      <Route path={`${url}`}>
        <BlogContainer />
      </Route>
      <Redirect to={`${url}`} />
    </Switch>
  );
}

export default Blog;
