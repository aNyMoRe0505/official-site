import React, { memo } from 'react';
import styled from 'styled-components';

import FadeInBlock from '../components/FadeInBlock';
import Profile from '../components/about/Profile';
import Education from '../components/about/Education';
import WorkExperience from '../components/about/WorkExperience';
import Works from '../components/about/Works';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

function About() {
  return (
    <Wrapper>
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
    </Wrapper>
  );
}

export default memo(About);
