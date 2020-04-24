import axios from 'axios';

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
    list: result?.items?.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      cover: item.snippet.thumbnails.high.url,
    })).filter((item) => item.id) || [],
    token: result?.nextPageToken || '',
  };
};
