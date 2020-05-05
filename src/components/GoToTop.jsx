import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  useLocation,
} from 'react-router-dom';

import goTop from '../helper/goToTop';

import styles from '../config/style';

const GoTopBtn = styled.button`
  width: 30px;
  height: 30px;
  padding: 0px;
  border-radius: 100%;
  background-color: ${styles.mainColor};
  position: fixed;
  color: white;
  bottom: 10px;
  right: 15px;
  outline: none;
  border: none;
  display: none;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  };
`;

function GoToTop() {
  const { pathname } = useLocation();
  const btnRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const trackScrollTop = () => {
      const element = document.scrollingElement || document.documentElement;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

      if (element.scrollTop > (scrollHeight - clientHeight) / 3) {
        btnRef.current.style.display = 'block';
      } else {
        btnRef.current.style.display = 'none';
      }
    };

    window.addEventListener('scroll', trackScrollTop);

    return () => {
      window.removeEventListener('scroll', trackScrollTop);
    };
  }, []);

  return (
    <GoTopBtn onClick={() => goTop(1000)} ref={btnRef} type="button">Top</GoTopBtn>
  );
}

export default GoToTop;