import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { DarkModeContext } from '../../config/context';

const Wrapper = styled.div`
  width: 100%;
  margin: 30px 0 0;
  padding: 25px 0px;
  border-width: 1px 0px;
  border-style: solid;
  border-color: gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    margin: 15px 0 0;
  };
`;

const Arrow = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  ${({ disabled }) => disabled && 'pointer-events: none'};
`;

const Text = styled.span`
  margin: 0 5px;
  font-size: 20px;
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const ArticleTitle = styled.span`
  font-size: 20px;
  color: ${({ darkMode }) => (darkMode ? 'white' : 'black')};
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

function PrevNextArticle({
  targetArticle,
  prevArticle,
  nextArticle,
}) {
  const [currentArticleTitle, setArticleTitle] = useState(targetArticle.title);
  const darkMode = useContext(DarkModeContext);

  const strokeTextColor = darkMode ? 'white' : 'black';

  return (
    <Wrapper>
      <Arrow
        onMouseEnter={() => {
          if (prevArticle) setArticleTitle(prevArticle.title);
        }}
        onMouseLeave={() => setArticleTitle(targetArticle.title)}
        disabled={!prevArticle}
        to={`/blog/article/${prevArticle?.id}`}
      >
        <svg
          style={{ transform: 'rotate(180deg)' }}
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          stroke={prevArticle ? strokeTextColor : 'gray'}
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 16 16 12 12 8" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
        <Text color={prevArticle ? strokeTextColor : 'gray'}>
          Prev
        </Text>
      </Arrow>
      <ArticleTitle darkMode={darkMode}>
        {currentArticleTitle}
      </ArticleTitle>
      <Arrow
        onMouseEnter={() => {
          if (nextArticle) setArticleTitle(nextArticle.title);
        }}
        onMouseLeave={() => setArticleTitle(targetArticle.title)}
        disabled={!nextArticle}
        to={`/blog/article/${nextArticle?.id}`}
      >
        <Text color={nextArticle ? strokeTextColor : 'gray'}>
          Next
        </Text>
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          stroke={nextArticle ? strokeTextColor : 'gray'}
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 16 16 12 12 8" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      </Arrow>
    </Wrapper>
  );
}

PrevNextArticle.propTypes = {
  targetArticle: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  prevArticle: PropTypes.shape({
    title: PropTypes.string,
  }),
  nextArticle: PropTypes.shape({
    title: PropTypes.string,
  }),
};

PrevNextArticle.defaultProps = {
  prevArticle: null,
  nextArticle: null,
};

export default PrevNextArticle;
