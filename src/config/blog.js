import Article1 from '../containers/blog/articles/Article1';
import Article2 from '../containers/blog/articles/Article2';
import Article3 from '../containers/blog/articles/Article3';
import logo from '../static/logo.png';

export const categories = {
  1: 'Notes',
};

export const tags = {
  1: 'React',
  2: 'Redux',
  3: 'Webpack',
  4: 'GraphQL',
  5: 'Apollo',
  6: 'React Hook',
};

export const articles = [{
  id: 3,
  cover: logo,
  categoryIds: [1],
  tagIds: [1, 4, 5],
  title: 'GraphQL Apollo Cache',
  description: '之前在用 Apollo Client 來串接 GraphQL API 碰到了一些有關快取的問題，在這邊筆記一下。',
  component: Article3,
  date: new Date('2020/02/23'),
}, {
  id: 2,
  cover: logo,
  categoryIds: [1],
  tagIds: [3],
  title: 'Webpack Config Note',
  description: '會想要寫這篇是因為在公司寫的 webpack config 有些變化，覺得還蠻值得筆記XD',
  component: Article2,
  date: new Date('2020/02/21'),
}, {
  id: 1,
  cover: logo,
  categoryIds: [1],
  tagIds: [1, 6],
  title: 'React Hook 順序重要性',
  description: '會想記錄是因為之前看 hook 的官方文件時，有些不懂的地方。',
  component: Article1,
  date: new Date('2020/02/15'),
}];
