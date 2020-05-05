import Article1 from '../containers/blog/articles/Article1';

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
  id: 1,
  tagIds: [1, 6],
  categoryIds: [1],
  title: 'React Hook 順序重要性',
  description: '會想記錄是因為之前看 hook 的官方文件時，有些不懂的地方。',
  component: Article1,
  date: new Date('2020/04/27'),
}];
