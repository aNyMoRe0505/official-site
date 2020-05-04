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
  id: 5,
  tagIds: [1, 2, 3],
  categoryIds: [1],
  title: '第4篇文章',
  description: '第4篇文章的描述描述描述',
  component: null,
  date: new Date('2020/04/30'),
}, {
  id: 4,
  tagIds: [1, 2, 3],
  categoryIds: [1],
  title: '第4篇文章',
  description: '第4篇文章的描述描述描述',
  component: null,
  date: new Date('2020/04/30'),
}, {
  id: 3,
  tagIds: [1, 2],
  categoryIds: [1],
  title: '第3篇文章',
  description: '第3篇文章的描述描述描述',
  component: null,
  date: new Date('2020/04/29'),
}, {
  id: 2,
  tagIds: [1],
  categoryIds: [1],
  title: '第2篇文章',
  description: '第2篇文章的描述描述描述',
  component: null,
  date: new Date('2020/04/28'),
}, {
  id: 1,
  tagIds: [1, 2, 3],
  categoryIds: [1],
  title: '第1篇文章',
  description: '第1篇文章的描述描述描述',
  component: null,
  date: new Date('2020/04/27'),
}];
