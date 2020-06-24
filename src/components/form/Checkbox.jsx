import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import styles from '../../config/style';

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const OptionWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const OptionBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px 10px 0;
`;

const OptionLable = styled.span`
  font-size: 16px;
`;

const OptionBtn = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  cursor: pointer;
  outline: none;
  margin: 0 0 0 5px;
  border: 1px solid black;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const ActivedBox = styled.div`
  width: 16px;
  height: 16px;
  background-color: #5896c1;
  opacity: ${({ actived }) => (actived ? 1 : 0)};
  transition-duration: 0.1s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
`;

const StyledLabel = styled.span`
  font-size: 16px;
`;

function Checkbox({
  label,
  value,
  onChange,
  options,
  error,
  onBlur,
}) {
  return (
    <CheckboxWrapper>
      {error && (
        <span style={{ color: styles.mainRed }}>！</span>
      )}
      {label && (
        <StyledLabel>{`${label}：`}</StyledLabel>
      )}
      <OptionWrapper>
        {options.map((option) => {
          const existIndex = value.findIndex((v) => v === option.value);
          return (
            <OptionBtnWrapper key={option.value}>
              <OptionLable>{option.name}</OptionLable>
              <OptionBtn
                onBlur={() => {
                  if (onBlur) onBlur();
                }}
                onClick={() => {
                  if (onChange) {
                    if (existIndex !== -1) {
                      onChange(
                        ...value.slice(0, existIndex),
                        ...value.slice(existIndex + 1),
                      );
                      return;
                    }

                    onChange(...value, option.value);
                  }
                }}
                type="button"
              >
                <ActivedBox actived={existIndex !== -1} />
              </OptionBtn>
            </OptionBtnWrapper>
          );
        })}
      </OptionWrapper>
    </CheckboxWrapper>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  error: PropTypes.shape({}),
  onBlur: PropTypes.func,
};

Checkbox.defaultProps = {
  label: '',
  value: [],
  onChange: null,
  onBlur: null,
  error: {},
};

export default Checkbox;
