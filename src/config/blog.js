import Article1 from '../containers/blog/articles/Article1';
import Article2 from '../containers/blog/articles/Article2';
import Article3 from '../containers/blog/articles/Article3';
import Article4 from '../containers/blog/articles/Article4';
import Article5 from '../containers/blog/articles/Article5';
import Article6 from '../containers/blog/articles/Article6';
import Article7 from '../containers/blog/articles/Article7';

import noteLogo from '../static/noteLogo.png';

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
  id: 7,
  cover: noteLogo,
  categoryIds: [1],
  tagIds: [1, 2],
  title: '用 redux-saga 製作通知系統',
  description: '記錄用 saga 製作通知系統的過程',
  component: Article7,
  date: new Date('2020/05/15'),
}, {
  id: 6,
  cover: noteLogo,
  categoryIds: [1],
  tagIds: [1, 6],
  title: 'usePrevious Hook',
  description: '探討如何在 function component 取得之前的 props/state',
  component: Article6,
  date: new Date('2020/05/07'),
}, {
  id: 5,
  cover: noteLogo,
  categoryIds: [1],
  tagIds: [1],
  title: 'React state update on an unmounted component',
  description: '在做這個網站 About 的動畫時碰到這個 bug, 順便筆記一下',
  component: Article5,
  date: new Date('2020/05/06'),
}, {
  id: 4,
  cover: noteLogo,
  categoryIds: [1],
  tagIds: [1],
  title: 'React - PureComponent',
  description: '前陣子有朋友開始學 React 問到 PureComponent 和 Component 的差別在哪裡，剛好順便寫下來做個簡單筆記。',
  component: Article4,
  date: new Date('2020/02/29'),
}, {
  id: 3,
  cover: noteLogo,
  categoryIds: [1],
  tagIds: [1, 4, 5],
  title: 'GraphQL Apollo Cache',
  description: '之前在用 Apollo Client 來串接 GraphQL API 碰到了一些有關快取的問題，在這邊筆記一下。',
  component: Article3,
  date: new Date('2020/02/23'),
}, {
  id: 2,
  cover: noteLogo,
  categoryIds: [1],
  tagIds: [3],
  title: 'Webpack Config Note',
  description: '會想要寫這篇是因為在公司寫的 webpack config 有些變化，覺得還蠻值得筆記XD',
  component: Article2,
  date: new Date('2020/02/21'),
}, {
  id: 1,
  cover: noteLogo,
  categoryIds: [1],
  tagIds: [1, 6],
  title: 'React Hook 順序重要性',
  description: '會想記錄是因為之前看 hook 的官方文件時，有些不懂的地方。',
  component: Article1,
  date: new Date('2020/02/15'),
}];
