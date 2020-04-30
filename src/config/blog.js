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
  tagIds: [1, 2, 3],
  categoryIds: [1],
  title: '第一篇文章',
  description: '第一篇文章的描述描述描述',
  component: null,
  date: new Date('2020/04/29'),
}, {
  id: 2,
  tagIds: [1, 2],
  categoryIds: [1],
  title: '第二篇文章',
  description: '第二篇文章的描述描述描述',
  component: null,
  date: new Date('2020/04/30'),
}, {
  id: 3,
  tagIds: [1],
  categoryIds: [1],
  title: '第三篇文章',
  description: '第三篇文章的描述描述描述',
  component: null,
  date: new Date('2020/04/28'),
}, {
  id: 4,
  tagIds: [1, 2, 3],
  categoryIds: [1],
  title: '第四篇文章',
  description: '第四篇文章的描述描述描述',
  component: null,
  date: new Date('2020/04/29'),
}];
