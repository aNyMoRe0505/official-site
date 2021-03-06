import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moment from 'moment';

import App from '../App';

describe('Header', () => {
  beforeEach(() => {
    render(
      <>
        <App />
      </>,
    );
  });

  test('Test blog link points to the correct page', () => {
    const link = screen.getByRole('link', { name: 'Blog' });
    userEvent.click(link);

    const filterKeyword = screen.getByText('關鍵字：');
    expect(filterKeyword).toBeInTheDocument();
  });

  test('Test archives link points to the correct page', () => {
    const link = screen.getByRole('link', { name: 'Archives' });
    userEvent.click(link);

    const articleSwitcher = screen.getByText('文章');
    expect(articleSwitcher).toBeInTheDocument();
  });

  test('Test practice link points to the correct page', () => {
    const link = screen.getByRole('link', { name: 'Practice' });
    userEvent.click(link);

    const now = screen.getByText(moment(new Date()).format('YYYY-MM-DD'));
    expect(now).toBeInTheDocument();
  });
});
