// target:
//   first render should call api to fetch articles (only call one time) and need to show loading text, response arrives the data is rendered.
//   when scroll down to bottom, should call api to fetch more articles (only call one time) and need to show loading text response arrives the data is rendered.
//   after change keyword and click search btn, should call api to fetch articles (only call one time) and need to show loading text response arrives the data is rendered.
//   click article should render detail (optional?)
//   and saga ??
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// import Blog from '../containers/blog/Blog';
import App from '../App';

describe('Blog', () => {
  test('hi blog', () => {
    render(
      <>
        <App />
      </>,
    );
    const link = screen.getByRole('link', { name: 'Blog' });
    userEvent.click(link);

    const filterKeyword = screen.getByText('關鍵字：');
    expect(filterKeyword).toBeInTheDocument();
  });
});
