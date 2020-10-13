import React, { memo } from 'react';
import styled from 'styled-components';

import FadeInBlock from '../components/FadeInBlock';
import Profile from '../components/about/Profile';
import Education from '../components/about/Education';
import WorkExperience from '../components/about/WorkExperience';
import Works from '../components/about/Works';
import LoadingBox from '../components/LoadingBox';

import { useImageLoadCompleted } from '../helper/hooks';

import profile from '../static/profile.jpg';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const StyledLoadingBox = styled(LoadingBox)`
  position: fixed;
  top: 95px;
`;

const sources = [profile];

function About() {
  const imgLoaded = useImageLoadCompleted(sources);

  return (
    <Wrapper>
      <StyledLoadingBox loadingStatus={!imgLoaded} />
      {imgLoaded && (
        <>
          <FadeInBlock>
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
        </>
      )}
    </Wrapper>
  );
}

export default memo(About);
