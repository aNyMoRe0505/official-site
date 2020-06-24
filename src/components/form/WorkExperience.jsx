/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useFieldArray, Controller } from 'react-hook-form';
import moment from 'moment';

import styles from '../../config/style';

import Button from '../Button';
import Input from './Input';
import Calendar from '../Calendar';

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
  font-size: 16px;
  width: 90px;
`;

const Label = styled.span`
  ${labelStyle}
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
  align-items: flex-start;
  justify-content: flex-start;
  margin: 10px 0 0;
`;

const Card = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
  margin: 0 0 15px 0;
  box-shadow: 0px 0px 25px #80808078;
  padding: 15px;
  border-radius: 5px;
  :last-child {
    margin: 0;
  }
`;

const DateWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DateError = styled.p`
  width: 100%;
  color: red;
`;

function WorkExperience({
  register,
  control,
  errors,
  clearError,
}) {
  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'workExperiences',
  });

  return (
    <Wrapper>
      <TitleWrap>
        <Title>WorkExperiences</Title>
        <StyledButton
          onClick={() => append({
            companyName: '',
            jobTitle: '',
            startDate: moment().subtract(1, 'days').toDate(),
            endDate: moment().toDate(),
          })}
          label="＋"
          type="button"
        />
      </TitleWrap>
      <CardWrapper>
        {fields.map((item, index) => (
          <Card key={item.id}>
            {fields.length !== 1 && (
              <DeleteButton
                label="－"
                type="button"
                onClick={() => {
                  if (confirm('確定刪除嗎？')) {
                    remove(index);
                  }
                }}
              />
            )}
            <StyledInput
              labelStyle={labelStyle}
              defaultValue={item.companyName}
              label="公司名稱"
              error={errors[index]?.companyName || null}
              name={`workExperiences[${index}].companyName`}
              register={register()}
            />
            <StyledInput
              labelStyle={labelStyle}
              defaultValue={item.jobTitle}
              label="職稱"
              error={errors[index]?.jobTitle || null}
              name={`workExperiences[${index}].jobTitle`}
              register={register()}
            />
            {(errors[index]?.startDate || errors[index]?.endDate) && (
              <DateError>
                {errors[index]?.startDate?.message || errors[index]?.endDate?.message}
              </DateError>
            )}
            <DateWrap>
              <Label>開始日期：</Label>
              <Controller
                defaultValue={item.startDate}
                initialDate={item.startDate}
                control={control}
                onChange={([date]) => {
                  if (date < item.endDate) clearError([`workExperiences[${index}].startDate`, `workExperiences[${index}].endDate`]);
                  return date;
                }}
                name={`workExperiences[${index}].startDate`}
                as={Calendar}
              />
            </DateWrap>
            <DateWrap>
              <Label>結束日期：</Label>
              <Controller
                defaultValue={item.endDate}
                initialDate={item.endDate}
                control={control}
                onChange={([date]) => {
                  if (date > item.startDate) clearError([`workExperiences[${index}].startDate`, `workExperiences[${index}].endDate`]);
                  return date;
                }}
                name={`workExperiences[${index}].endDate`}
                as={Calendar}
              />
            </DateWrap>
          </Card>
        ))}
      </CardWrapper>
    </Wrapper>
  );
}

WorkExperience.propTypes = {
  register: PropTypes.func.isRequired,
  control: PropTypes.shape({}).isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape({})),
  clearError: PropTypes.func.isRequired,
};

WorkExperience.defaultProps = {
  errors: [],
};

export default WorkExperience;
