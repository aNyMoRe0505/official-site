import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import moment from 'moment';

import styles from '../config/style';
import { useRepeatedAnimation } from '../helper/hooks';

import Button from '../components/Button';

import profile from '../static/profile.jpg';
import gogoro from '../static/gogoro.png';
import rytass from '../static/rytass.png';
import mail from '../static/mail.png';
import medium from '../static/medium.png';
import github from '../static/github.png';
import facebook from '../static/facebook.png';
import klcivs from '../static/klcivs.gif';
import nccu from '../static/nccu.jpg';

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

const FadeIn = css`
  max-height: 100%;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
`;

const FadeOut = css`
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0s 0.5s, opacity 0.5s ease-in-out;
`;

const BlockWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 0 15px;
  ${({ status }) => (status && FadeIn) || FadeOut}
`;

const BlockTitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 15px;
`;

const StyledBlcokMarkBtn = styled(Button)`
  width: 26px;
  height: 26px;
  border-radius: 100%;
  background-color: ${({ status }) => (status ? styles.mainRed : styles.mainColor)};
  transform: ${({ status }) => (status ? 'rotate(135deg)' : 'rotate(0deg)')};
  transition-duration: 0.3s;
  transition-property: transform;
  transition-timing-function: ease-in-out;
`;

const BlockTitle = styled.p`
  margin: 0;
  font-size: 25px;
  font-weight: 300;
  @media (max-width: 768px) {
    font-size: 22px;
  };
`;

const Card = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0px 0px 4px #80808078;
  margin: 0 0 20px;
  padding: 15px;
  @media (max-width: 768px) {
    flex-direction: column;
  };
`;

const DescBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 18px;
  font-weight: 300;
  @media (max-width: 768px) {
    align-items: center;
    font-size: 15px;
  };
`;

const Desc = styled.p`
  width: 100%;
  display: flex;
  align-items: flex-start;
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

const Logo = styled.img`
  width: 200px;
  margin: 0 15px 0 0;
  @media (max-width: 768px) {
    margin: 0 0 15px;
    flex-direction: column;
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
  margin: 0 0 15px;
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

const educationHistory = [{
  id: 'KLCIVS',
  logo: klcivs,
  name: '國立基隆高級商工職業學校',
  department: '綜合高中科',
  from: '2011-09',
  to: '2014-06',
}, {
  id: 'NCCU',
  logo: nccu,
  name: '國立政治大學',
  department: '資訊管理學系',
  from: '2014-09',
  to: '2018-06',
}];

const workExperiences = [{
  id: 'gogoro',
  companyAbbrev: 'Gogoro',
  companyName: '睿能創意股份有限公司',
  logo: gogoro,
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
  logo: rytass,
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
  const [workExperienceExpanded, setWorkExperienceExpanded] = useState(true);
  const [educationExpanded, setEducationExpanded] = useState(true);

  return (
    <Wrapper>
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
      <BlockTitleWrap>
        <BlockTitle>教育背景</BlockTitle>
        <StyledBlcokMarkBtn
          status={educationExpanded}
          onClick={() => setEducationExpanded(!educationExpanded)}
          label="＋"
        />
      </BlockTitleWrap>
      <BlockWrapper status={educationExpanded}>
        {educationHistory.map((education) => (
          <Card key={education.id}>
            <Logo src={education.logo} alt="logo" />
            <DescBlock>
              <Desc>{`${education.id} - ${education.name}`}</Desc>
              <Desc>{education.department}</Desc>
              <Desc>{`${education.from} ~ ${education.to}`}</Desc>
            </DescBlock>
          </Card>
        ))}
      </BlockWrapper>
      <BlockTitleWrap>
        <BlockTitle>工作經歷</BlockTitle>
        <StyledBlcokMarkBtn
          status={workExperienceExpanded}
          onClick={() => setWorkExperienceExpanded(!workExperienceExpanded)}
          label="＋"
        />
      </BlockTitleWrap>
      <BlockWrapper status={workExperienceExpanded}>
        {workExperiences.map((experience) => {
          const monthDiff = moment(experience.to).diff(experience.from, 'months');
          const yearDiff = Math.floor(monthDiff / 12);
          return (
            <Card key={experience.id}>
              <Logo src={experience.logo} alt="logo" />
              <DescBlock>
                <Desc>{`${experience.companyAbbrev} - ${experience.companyName}`}</Desc>
                <Desc>{experience.jobTitle}</Desc>
                <WorkingTimeWrap>
                  <Desc style={{ margin: 0 }}>
                    {`${moment(experience.from).format('YYYY-MM-DD')} ~ ${moment(experience.to).format('YYYY-MM-DD')}`}
                  </Desc>
                  <WorkingTimeTotal>
                    {`${yearDiff}年${monthDiff - 12 * yearDiff}個月`}
                  </WorkingTimeTotal>
                </WorkingTimeWrap>
                {experience.jobDesc.map((desc) => (
                  <Desc key={desc}>
                    。
                    <span style={{ flex: 1 }}>{desc}</span>
                  </Desc>
                ))}
              </DescBlock>
            </Card>
          );
        })}
      </BlockWrapper>
    </Wrapper>
  );
}

export default About;
