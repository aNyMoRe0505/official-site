import React, { useState } from 'react';

import klcivs from '../../static/klcivs.gif';
import nccu from '../../static/nccu.jpg';

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

const educationHistory = [{
  id: 'NCCU',
  logo: nccu,
  name: '國立政治大學',
  department: '資訊管理學系',
  from: '2014-09',
  to: '2018-06',
}, {
  id: 'KLCIVS',
  logo: klcivs,
  name: '國立基隆高級商工職業學校',
  department: '綜合高中科',
  from: '2011-09',
  to: '2014-06',
}];

function Education() {
  const [educationExpanded, setEducationExpanded] = useState(true);

  return (
    <MainBlock>
      <BlockTitleWrap>
        <BlockTitle>教育背景</BlockTitle>
        <StyledPlusMarkBtn
          status={educationExpanded}
          onClick={() => setEducationExpanded(!educationExpanded)}
        >
          <img style={{ width: '100%' }} alt="plus" src="https://img.icons8.com/ios/80/000000/plus.png" />
        </StyledPlusMarkBtn>
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
    </MainBlock>
  );
}

export default Education;
