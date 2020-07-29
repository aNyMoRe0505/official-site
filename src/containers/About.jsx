import React, { memo } from 'react';
import styled from 'styled-components';

import FadeInBlock from '../components/FadeInBlock';
import LoadingBox from '../components/LoadingBox';
import Profile from '../components/about/Profile';
import Education from '../components/about/Education';
import WorkExperience from '../components/about/WorkExperience';
import Works from '../components/about/Works';

import { useImageLoadCompleted } from '../helper/hooks';

import profile from '../static/profile.jpg';
import gogoro from '../static/gogoro.png';
import rytass from '../static/rytass.png';
import klcivs from '../static/klcivs.gif';
import nccu from '../static/nccu.jpg';
import background from '../static/background.jpeg';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  ${({ imageLoaded }) => !imageLoaded && 'height: 0px'};
`;

const imgSources = [
  profile,
  gogoro,
  rytass,
  klcivs,
  nccu,
  background,
  'https://www.homeruntaiwan.com/ogImage.jpg',
  'https://i.ytimg.com/vi/6eXxJASf5aI/maxresdefault.jpg',
];

function About() {
  const imageLoaded = useImageLoadCompleted(imgSources);

  return (
    <>
      <LoadingBox loadingStatus={!imageLoaded} />
      <Wrapper imageLoaded={imageLoaded}>
        <FadeInBlock defaultStatus={imageLoaded}>
          <Profile />
        </FadeInBlock>
        <FadeInBlock>
          <Education />
        </FadeInBlock>
        <FadeInBlock>
          <WorkExperience />
        </FadeInBlock>
        <FadeInBlock>
          <Works />
        </FadeInBlock>
      </Wrapper>
    </>
  );
}

export default memo(About);
