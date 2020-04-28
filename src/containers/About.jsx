import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import moment from 'moment';

import styles from '../config/style';
import { useRepeatedAnimation } from '../helper/hooks';

import profile from '../static/profile.jpg';
import gogoro from '../static/gogoro.png';
import rytass from '../static/rytass.png';
import mail from '../static/mail.png';
import medium from '../static/medium.png';
import github from '../static/github.png';
import facebook from '../static/facebook.png';

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

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ProfilePicture = styled.img`
  width: 400px;
  height: auto;
  margin: 0 0 15px;
  @media (max-width: 414px) {
    width: 100%;
  };
`;

const NameDesc = styled.p`
  margin: 0;
  font-size: 30px;
  font-weight: 300;
  margin: 0 0 15px;
  @media (max-width: 768px) {
    font-size: 27px;
  };
`;

const Desc = styled.p`
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

const WorkExperienceWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 0 15px;
`;

const WorkExperienceTitle = styled.p`
  font-size: 25px;
  font-weight: 300;
  margin: 0 0 15px;
  @media (max-width: 768px) {
    font-size: 22px;
  };
`;

const WorkExperienceBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0px 0px 4px #80808078;
  margin: 0 0 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  };
`;

const WorkExperienceDescBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 15px;
  font-size: 18px;
  font-weight: 300;
  @media (max-width: 768px) {
    align-items: center;
    font-size: 15px;
  };
`;

const WorkExperienceDesc = styled.p`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 10px;
  @media (max-width: 768px) {
    justify-content: center;
  };
`;

const WorkingTimeWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0 0 10px;
  @media (max-width: 768px) {
    align-items: center;
  };
`;

const WorkingTimeTotal = styled.p`
  color: gray;
  margin: 0;
  letter-spacing: 2px;
`;

const CompanyLogo = styled.img`
  width: 200px;
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
  margin: 0 0 15px;
`;

const SkillAnimation = css`
  animation-name: ${wave};
  animation-duration: 1.5s;
  animation-delay: ${({ delay }) => (delay)};
  animation-iteration-count: 1;
  animation-timing-function: ease;
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

const workExperiences = [{
  id: 'gogoro',
  companyAbbrev: 'Gogoro',
  companyName: '睿能創意股份有限公司',
  companyLogo: gogoro,
  jobTitle: 'React 前端工程師',
  jobDesc: [
    '以 React 開發公司內部系統、對外網頁',
    '使用 Git 與其他工程師共台開發專案',
  ],
  from: new Date('2020/04/06'),
  to: new Date(),
}, {
  id: 'rytass',
  companyAbbrev: 'Rytass',
  companyName: '八拍子股份有限公司',
  companyLogo: rytass,
  jobTitle: '軟體工程師',
  jobDesc: [
    '以 React 開發客戶網頁、後台，串接 Restful、GraphQL API',
    '以 Node.js 開發後端資料庫 Restful、GraphQL API',
    '使用 Git 與其他工程師共台開發專案',
  ],
  from: new Date('2019/01/01'),
  to: new Date('2020/02/28'),
}];

function About() {
  const [animationElementRef, actived] = useRepeatedAnimation(1500);
  return (
    <Wrapper>
      <ProfilePicture src={profile} alt="profile" />
      <NameDesc>Paul Wang</NameDesc>
      <Desc>
        喜歡寫程式，擁有良好的溝通能力，樂於和同事分享、學習以及嘗試新的技術。前後端領域在求學階段以及畢業後都有接觸，具備基本專業知識。
      </Desc>
      <IconWrap>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=anymore0505@gmail.com"
        >
          <Icon src={mail} alt="mail" />
        </a>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://medium.com/@anymore0505"
        >
          <Icon style={{ width: 30, height: 30 }} src={medium} alt="medium" />
        </a>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/aNyMoRe0505"
        >
          <Icon src={github} alt="github" />
        </a>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.facebook.com/profile.php?id=100000335534011"
        >
          <Icon style={{ margin: '0px 0px 3px 0px' }} src={facebook} alt="facebook" />
        </a>
      </IconWrap>
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
      <WorkExperienceWrapper>
        <WorkExperienceTitle>工作經歷</WorkExperienceTitle>
        {workExperiences.map((experience) => {
          const monthDiff = moment(experience.to).diff(experience.from, 'months');
          const yearDiff = Math.floor(monthDiff / 12);
          return (
            <WorkExperienceBlock key={experience.id}>
              <CompanyLogo src={experience.companyLogo} alt="companyLogo" />
              <WorkExperienceDescBlock>
                <WorkExperienceDesc>{`${experience.companyAbbrev} - ${experience.companyName}`}</WorkExperienceDesc>
                <WorkExperienceDesc>{experience.jobTitle}</WorkExperienceDesc>
                <WorkingTimeWrap>
                  <WorkExperienceDesc style={{ margin: 0 }}>
                    {`${moment(experience.from).format('YYYY-MM-DD')} ~ ${moment(experience.to).format('YYYY-MM-DD')}`}
                  </WorkExperienceDesc>
                  <WorkingTimeTotal>
                    {`${yearDiff}年${monthDiff - 12 * yearDiff}個月`}
                  </WorkingTimeTotal>
                </WorkingTimeWrap>
                {experience.jobDesc.map((desc) => (
                  <WorkExperienceDesc key={desc}>
                    。
                    <span style={{ flex: 1 }}>{desc}</span>
                  </WorkExperienceDesc>
                ))}
              </WorkExperienceDescBlock>
            </WorkExperienceBlock>
          );
        })}
      </WorkExperienceWrapper>
    </Wrapper>
  );
}

export default About;
