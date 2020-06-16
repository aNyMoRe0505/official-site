import React from 'react';
import styled from 'styled-components';

import FadeInBlock from '../components/FadeInBlock';
import LoadingBox from '../components/LoadingBox';
import Profile from '../components/about/Profile';
import Education from '../components/about/Education';
import WorkExperience from '../components/about/WorkExperience';

import { useImageLoadCompleted } from '../helper/hooks';

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

function About() {
  const imageLoaded = useImageLoadCompleted();

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
      </Wrapper>
    </>
  );
}

export default About;
