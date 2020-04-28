/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import styles from '../../config/style';

import Button from '../Button';
import Input from './Input';

const StyledButton = styled(Button)`
  width: 25px;
  height: 25px;
  font-size: 12px;
  border-radius: 100%;
`;

const DeleteButton = styled(Button)`
  width: 25px;
  height: 25px;
  font-size: 12px;
  border-radius: 100%;
  background-color: ${styles.mainRed};
  position: absolute;
  top: 10px;
  right: 0px;
`;

const StyledInput = styled(Input)`
  margin: 0 0 10px 0;
`;

const labelStyle = css`
  width: 90px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const TitleWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 10px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 16px;
`;

const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0 0;
`;

const Card = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  flex-wrap: wrap;
  margin: 0 0 15px 0;
  box-shadow: 0px 0px 25px #80808078;
  padding: 15px;
  border-radius: 5px;
  :last-child {
    margin: 0;
  }
`;

function WorkExperience({
  register,
  name,
  fields,
  append,
  remove,
}) {
  return (
    <Wrapper>
      <TitleWrap>
        <Title>WorkExperiences</Title>
        <StyledButton
          onClick={() => append({ companyName: '', jobTitle: '' })}
          label="＋"
          type="button"
        />
      </TitleWrap>
      <CardWrapper>
        {fields.map((item, index) => (
          <Card key={item.id}>
            <DeleteButton
              label="－"
              type="button"
              onClick={() => {
                if (confirm('確定刪除嗎？')) {
                  remove(index);
                }
              }}
            />
            <StyledInput
              labelStyle={labelStyle}
              defaultValue={item.companyName}
              label="公司名稱"
              name={`${name}[${index}].companyName`}
              register={register}
            />
            <StyledInput
              labelStyle={labelStyle}
              defaultValue={item.jobTitle}
              label="職稱"
              name={`${name}[${index}].jobTitle`}
              register={register}
            />
          </Card>
        ))}
      </CardWrapper>
    </Wrapper>
  );
}

WorkExperience.propTypes = {
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  append: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

WorkExperience.defaultProps = {
};

export default WorkExperience;
