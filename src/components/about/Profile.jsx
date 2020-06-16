import React from 'react';
import styled, { keyframes, css } from 'styled-components';

import styles from '../../config/style';
import { useRepeatedAnimation } from '../../helper/hooks';

import profile from '../../static/profile.jpg';

import { MainBlock } from './style';

const ProfilePicture = styled.img`
  width: 400px;
  height: auto;
  margin: 0 0 15px;
  @media (max-width: 414px) {
    width: 100%;
  };
`;

const NameDesc = styled.p`
  font-size: 30px;
  font-weight: 300;
  margin: 0 0 15px;
  @media (max-width: 768px) {
    font-size: 27px;
  };
`;

const ProfileDesc = styled.p`
  margin: 0;
  font-size: 20px;
  text-align: start;
  font-weight: 300;
  margin: 0 0 15px;
  line-height: 1.5;
  @media (max-width: 768px) {
    font-size: 17px;
  };
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 15px;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  margin: 0 8px;
  :hover {
    opacity: 0.5;
  };
`;

const SkillWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0;
`;

const wave = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const SkillAnimation = css`
  animation-name: ${wave};
  animation-duration: 1.5s;
  animation-delay: ${({ delay }) => (delay)};
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
`;

const Skill = styled.div`
  width: 100px;
  height: 50px;
  padding: 10px;
  background-color: ${styles.mainColor};
  border-radius: 10px;
  margin: 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  ${({ actived }) => actived && SkillAnimation}
`;

const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Redux',
  'Node.js',
  'GraphQL',
  'MySQL',
  'Koa',
  'Git',
  'Webpack',
];

function SkillBlock() {
  const [animationElementRef, actived] = useRepeatedAnimation(1500);

  return (
    <SkillWrapper>
      {skills.map((skill, index) => (
        <Skill
          ref={(index + 1 === skills.length && animationElementRef) || null}
          actived={actived}
          delay={`${0.1 * index}s`}
          key={skill}
        >
          {skill}
        </Skill>
      ))}
    </SkillWrapper>
  );
}

function Profile() {
  return (
    <MainBlock first>
      <ProfilePicture src={profile} alt="profile" />
      <NameDesc>Paul Wang</NameDesc>
      <ProfileDesc>
        喜歡寫程式，擁有良好的溝通能力，樂於和同事分享、學習以及嘗試新的技術。前後端領域在求學階段以及畢業後都有接觸，具備基本專業知識。
      </ProfileDesc>
      <IconWrap>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=anymore0505@gmail.com"
        >
          <Icon src="https://img.icons8.com/material-rounded/96/000000/important-mail.png" alt="mail" />
        </a>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://medium.com/@anymore0505"
        >
          <Icon style={{ width: 30, height: 30 }} src="https://img.icons8.com/ios-filled/50/000000/medium-new.png" alt="medium" />
        </a>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/aNyMoRe0505"
        >
          <Icon src="https://img.icons8.com/ios-filled/100/000000/github.png" alt="github" />
        </a>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.facebook.com/profile.php?id=100000335534011"
        >
          <Icon src="https://img.icons8.com/ios-filled/50/000000/facebook-new.png" alt="facebook" />
        </a>
      </IconWrap>
      <SkillBlock />
    </MainBlock>
  );
}

export default Profile;
