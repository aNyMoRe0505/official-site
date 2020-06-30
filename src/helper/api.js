import axios from 'axios';

import { checkAllImagesLoadCompleted } from './helper';
import {
  articles,
} from '../config/blog';

export const mockAPIGetArticleList = async ({
  page = 0,
  fetchMoreCachedList = [],
  limit = null,
  keyword = null,
  categories = [],
  tags = [],
}) => {
  let filteredArticles = page ? fetchMoreCachedList : articles;
  let caching = [];

  if (!page) {
    // 非fetch more才要重新整個filter
    if (keyword) {
      filteredArticles = filteredArticles.filter((article) => {
        const articleTitle = article.title.toUpperCase();
        const filterdKeyword = keyword.toUpperCase();
        return articleTitle.includes(filterdKeyword);
      });
    }
    if (categories.length) {
      filteredArticles = filteredArticles
        .filter((article) => article.categoryIds
          .some((categoryId) => ~categories.findIndex((category) => category === categoryId)));
    }
    if (tags.length) {
      filteredArticles = filteredArticles
        .filter((article) => article.tagIds
          .some((tagId) => ~tags.findIndex((tag) => tag === tagId)));
    }
    // 快取起來, fetch more時直接以快取的array做slice
    caching = filteredArticles;
  }

  if (limit) filteredArticles = filteredArticles.slice(page * limit, page * limit + limit);

  const articleCover = filteredArticles.map((article) => article.cover);

  await new Promise((resolve) => setTimeout(resolve, 200));
  await checkAllImagesLoadCompleted(articleCover);

  return {
    caching,
    filteredArticles,
  };
};

export const fetchYoutube = async (keyword, nextPageToken) => {
  const REQUEST_URL = 'https://www.googleapis.com/youtube/v3/search';

  const searchPayload = {
    q: keyword,
    part: 'snippet',
    maxResults: 15,
    key: 'AIzaSyCYQS-VKqmpDO7ESXcL9pJUwnN0PpU90XU',
  };

  if (nextPageToken) searchPayload.pageToken = nextPageToken;

  const qs = Object.keys(searchPayload).map((key) => `${key}=${searchPayload[key]}`).join('&');

  const result = await axios.get(`${REQUEST_URL}?${qs}`).catch((error) => {
    throw new Error(error.response?.data?.error?.message || 'Server Error');
  });

  return {
    list: result?.data?.items?.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      cover: item.snippet.thumbnails.high.url,
    })).filter((item) => item.id) || [],
    token: result?.data?.nextPageToken || '',
  };
};
