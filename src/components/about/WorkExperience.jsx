import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import gogoro from '../../static/gogoro.png';
import rytass from '../../static/rytass.png';

import {
  MainBlock,
  BlockTitleWrap,
  BlockTitle,
  StyledPlusMarkBtn,
  BlockWrapper,
  Card,
  Logo,
  Desc,
  DescBlock,
} from './style';

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
  to: new Date('2020/09/09'),
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

function WorkExperience() {
  const [workExperienceExpanded, setWorkExperienceExpanded] = useState(true);

  return (
    <MainBlock>
      <BlockTitleWrap>
        <BlockTitle>工作經歷</BlockTitle>
        <StyledPlusMarkBtn
          status={workExperienceExpanded}
          onClick={() => setWorkExperienceExpanded(!workExperienceExpanded)}
        >
          <img style={{ width: '100%' }} alt="plus" src="https://img.icons8.com/ios/80/000000/plus.png" />
        </StyledPlusMarkBtn>
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
    </MainBlock>
  );
}

export default WorkExperience;
