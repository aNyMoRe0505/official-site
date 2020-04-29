import React from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import moment from 'moment';

import Input from '../components/form/Input';
import Selector from '../components/form/Selector';
import Checkbox from '../components/form/Checkbox';
import WorkExperience from '../components/form/WorkExperience';
import Button from '../components/Button';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Form = styled.form`
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-shadow: 0px 0px 25px #80808078;
  padding: 40px;
  border-radius: 5px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

const RowWrap = styled.div`
  width: ${({ width }) => (width || '100%')};
  margin: 0 0 20px 0;
`;

const FormFunctionWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 18px;
`;

const genderOptions = [{
  value: 'male',
  name: '男性',
}, {
  value: 'female',
  name: '女性',
}];

const categoryOptions = [{
  value: '分類一',
  name: '分類一',
}, {
  value: '分類二',
  name: '分類二',
}, {
  value: '分類三',
  name: '分類三',
}, {
  value: '分類四',
  name: '分類四',
}, {
  value: '分類五',
  name: '分類五',
}, {
  value: '分類六',
  name: '分類六',
}, {
  value: '分類七',
  name: '分類七',
}];

function HookForm() {
  const {
    register,
    handleSubmit,
    errors,
    control,
    getValues,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      workExperiences: [{
        companyName: '',
        jobTitle: '',
        startDate: moment().subtract(1, 'days').toDate(),
        endDate: moment().toDate(),
      }],
    },
  });

  const onSubmit = (data) => {
    const alertData = {
      ...data,
      workExperiences: data.workExperiences.map((workExperience) => ({
        ...workExperience,
        startDate: moment(workExperience.startDate).format('YYYY-MM-DD'),
        endDate: moment(workExperience.endDate).format('YYYY-MM-DD'),
      })),
    };

    alert(JSON.stringify(alertData));
  };

  return (
    <Wrapper>
      <Title>Hook Form Practice</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <RowWrap>
          <Input
            error={errors?.name || null}
            label="姓名"
            name="name"
            register={register({ required: '姓名為必填！' })}
          />
        </RowWrap>
        <RowWrap width="200px">
          <Selector
            options={genderOptions}
            register={register}
            label="性別"
            name="gender"
          />
        </RowWrap>
        <RowWrap>
          <Controller
            rules={{
              validate: {
                minLength: (value) => value.length > 0 || '至少選擇一個分類！',
              },
            }}
            error={errors?.category || null}
            label="分類"
            options={categoryOptions}
            defaultValue={[]}
            name="category"
            as={Checkbox}
            control={control}
            onChange={(value) => value}
          />
        </RowWrap>
        <RowWrap>
          <WorkExperience
            getValues={getValues}
            errors={errors.workExperiences || []}
            control={control}
            register={register}
          />
        </RowWrap>
        <FormFunctionWrap>
          <Button
            label="送出"
            type="submit"
          />
        </FormFunctionWrap>
      </Form>
    </Wrapper>
  );
}

export default HookForm;
