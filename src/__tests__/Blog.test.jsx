import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import getStore from '../store';
import Blog from '../containers/blog/Blog';

// 還有一些問題待解決QQQQ
describe('Blog', () => {
  test('Should call dispatch to fetch articles when first render and click search button after changing keyword', () => {
    const store = getStore();
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Blog />
      </Provider>,
    );

    expect(store.dispatch).toHaveBeenCalledTimes(1);

    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();

    const keywordInput = screen.getByLabelText('關鍵字：');
    userEvent.type(keywordInput, 'hello 你好嗎');

    const submitButton = screen.getByRole('button', { name: '搜尋' });
    userEvent.click(submitButton);

    // 因為dispatch mock了 所以其實關鍵字沒有改動 (dispatch cacheSearcher) 所以才會只打2次
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    // since we mock store.dispatch to jest.fn(), we should render 查無文章
    const noArticlText = screen.getByText('查無文章');
    expect(noArticlText).toBeInTheDocument();
  });
});
