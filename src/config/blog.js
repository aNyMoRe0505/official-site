import Article1 from '../containers/blog/articles/Article1';
import Article2 from '../containers/blog/articles/Article2';
import Article3 from '../containers/blog/articles/Article3';
import Article4 from '../containers/blog/articles/Article4';
import Article5 from '../containers/blog/articles/Article5';
import Article6 from '../containers/blog/articles/Article6';
import Article7 from '../containers/blog/articles/Article7';
import Article8 from '../containers/blog/articles/Article8';
import Article9 from '../containers/blog/articles/Article9';
import Article10 from '../containers/blog/articles/Article10';
import Article11 from '../containers/blog/articles/Article11';
import Article12 from '../containers/blog/articles/Article12';
import Article13 from '../containers/blog/articles/Article13';

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
  7: 'CSRF',
  8: 'CORS',
  9: 'Security',
  10: 'JWT',
  11: 'oAuth',
  12: 'CSS',
  13: 'Test',
  14: 'NPM',
};

export const articles = [{
  id: 13,
  cover: 'https://b.ecimg.tw/items/DEAH95A9008IHPN/000001_1509599317.jpg',
  categoryIds: [1],
  tagIds: [12],
  title: '商城產品放大鏡',
  description: '練習做商城產品放大鏡',
  component: Article13,
  date: new Date('2020/09/01'),
}, {
  id: 12,
  cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/1200px-Npm-logo.svg.png',
  categoryIds: [1],
  tagIds: [1, 6, 14],
  title: '開源初體驗 use-request',
  description: '記錄第一次開源過程',
  component: Article12,
  date: new Date('2020/07/28'),
}, {
  id: 11,
  cover: 'https://www.ibrahima-ndaw.com/static/4996d6d31bd748e276b9055ebfce4e42/31987/cover.png',
  categoryIds: [1],
  tagIds: [1, 13],
  title: 'React 前端測試初體驗',
  description: '記錄嘗試利用 jest 撰寫前端測試的過程',
  component: Article11,
  date: new Date('2020/07/06'),
}, {
  id: 10,
  cover: 'https://i.imgur.com/gdoyRS6.png',
  categoryIds: [1],
  tagIds: [12],
  title: 'CSS 毛玻璃',
  description: '記錄一下研究毛玻璃的過程，和筆記、整理相關的東西',
  component: Article10,
  date: new Date('2020/06/18'),
}, {
  id: 9,
  cover: 'https://cdn.auth0.com/blog/jwtalgos/logo.png',
  categoryIds: [1],
  tagIds: [9, 10, 11],
  title: '練習 JWT Auth 實作',
  description: '記錄練習過程',
  component: Article9,
  date: new Date('2020/06/09'),
}, {
  id: 8,
  cover: noteLogo,
  categoryIds: [1],
  tagIds: [7, 8, 9],
  title: 'CORS & CSRF 筆記',
  description: '筆記一下 CORS 和 CSRF 相關的東西',
  component: Article8,
  date: new Date('2020/06/04'),
}, {
  id: 7,
  cover: 'https://miro.medium.com/max/312/1*zcK3vvoVjsqkqB0oja8RWw.png',
  categoryIds: [1],
  tagIds: [1, 2],
  title: '用 redux-saga 製作通知系統',
  description: '記錄用 saga 製作通知系統的過程',
  component: Article7,
  date: new Date('2020/05/15'),
}, {
  id: 6,
  cover: 'https://miro.medium.com/max/3000/1*-Ijet6kVJqGgul6adezDLQ.png',
  categoryIds: [1],
  tagIds: [1, 6],
  title: 'usePrevious Hook',
  description: '探討如何在 function component 取得之前的 props/state',
  component: Article6,
  date: new Date('2020/05/07'),
}, {
  id: 5,
  cover: 'https://i.imgur.com/rs8Y9jU.png',
  categoryIds: [1],
  tagIds: [1],
  title: 'React state update on an unmounted component',
  description: '在做這個網站 About 的動畫時碰到這個 bug, 順便筆記一下',
  component: Article5,
  date: new Date('2020/05/06'),
}, {
  id: 4,
  cover: 'https://daqxzxzy8xq3u.cloudfront.net/wp-content/uploads/2019/08/19115633/react-pure-component-illustration.jpg',
  categoryIds: [1],
  tagIds: [1],
  title: 'React - PureComponent',
  description: '前陣子有朋友開始學 React 問到 PureComponent 和 Component 的差別在哪裡，剛好順便寫下來做個簡單筆記。',
  component: Article4,
  date: new Date('2020/02/29'),
}, {
  id: 3,
  cover: 'https://miro.medium.com/max/1360/1*BzeM8yhiSwERTGvM3h1V4A.jpeg',
  categoryIds: [1],
  tagIds: [1, 4, 5],
  title: 'GraphQL Apollo Cache',
  description: '之前在用 Apollo Client 來串接 GraphQL API 碰到了一些有關快取的問題，在這邊筆記一下。',
  component: Article3,
  date: new Date('2019/12/20'),
}, {
  id: 2,
  cover: 'https://webpack.js.org/dcd5e077cf9f54ebe52d4f7ebe8c3080.png',
  categoryIds: [1],
  tagIds: [3],
  title: 'Webpack Config Note',
  description: '會想要寫這篇是因為在公司寫的 webpack config 有些變化，覺得還蠻值得筆記XD',
  component: Article2,
  date: new Date('2019/10/12'),
}, {
  id: 1,
  cover: 'https://miro.medium.com/max/3000/1*-Ijet6kVJqGgul6adezDLQ.png',
  categoryIds: [1],
  tagIds: [1, 6],
  title: 'React Hook 順序重要性',
  description: '會想記錄是因為之前看 hook 的官方文件時，有些不懂的地方。',
  component: Article1,
  date: new Date('2019/08/15'),
}];
