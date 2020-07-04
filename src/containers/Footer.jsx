/* eslint-disable react/no-unescaped-entities */
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import footer from '../static/footer.png';

import { debounce } from '../helper/helper';

export const FOOTER_HEIGHT = 260;

const Wrapper = styled.div`
  width: 100%;
  height: ${FOOTER_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${footer});
  background-size: cover;
  background-position: bottom;
`;

const Mask = styled.div`
  width: calc(100% - 50px);
  height: ${FOOTER_HEIGHT - 50}px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
  z-index: 1;
  padding: 15px;
  @media (max-width: 768px) {
    padding: 10px;
  }
  span:last-child {
    margin: 0;
  }
  ::before {
    content: '';
    position: absolute;
    z-index: -1;
    width: ${({ wrapperWidth }) => `${wrapperWidth}px`};
    height: ${({ wrapperHeight }) => `${wrapperHeight}px`};
    background-image: url(${footer});
    background-size: cover;
    background-position: bottom;
    filter: blur(7px);
  };
`;

const Text = styled.span`
  color: white;
  margin: 0 0 10px 0;
  font-family: Copperplate;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const Link = styled.a`
  margin: 0 0 10px 0;
  color: ${({ white }) => (white && 'white') || 'rgb(87, 173, 92)'};
  font-family: Copperplate;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

function Footer() {
  const [wrapperRect, setWrapperRect] = useState({});
  const wrapperRef = useRef();

  useEffect(() => {
    setWrapperRect(wrapperRef.current.getBoundingClientRect());

    const resize = () => {
      setWrapperRect(wrapperRef.current.getBoundingClientRect());
    };
    const resizeWithDebounce = debounce(resize, 500);

    window.addEventListener('resize', resizeWithDebounce);

    return () => window.removeEventListener('resize', resizeWithDebounce);
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <Mask
        wrapperWidth={wrapperRect.width || 0}
        wrapperHeight={wrapperRect.height || 0}
      >
        <Text>Paul's Blog</Text>
        <Text>Feel free to contact me</Text>
        <Link
          white
          rel="noopener noreferrer"
          target="_blank"
          href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=anymore0505@gmail.com"
        >
          Mail: anymore0505@gmail.com
        </Link>
        <Text>
          Icons、Images
        </Text>
        <Text>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://icons8.com/"
          >
            Icons8
          </Link>
          {' & '}
          Google Images
        </Text>
        <Text>
          please advise to remove immediately
        </Text>
        <Text>
          if any infringement caused
        </Text>
      </Mask>
    </Wrapper>
  );
}

export default Footer;
