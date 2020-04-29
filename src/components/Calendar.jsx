import React, { useState, useMemo } from 'react';
import styled, { css, keyframes } from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';

import styles from '../config/style';
import { dateArrayGenerator } from '../helper/calendar';

const scale = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
`;

const Wrapper = styled.div`
  /* width: 100%; */
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
`;

const CalendarWrapper = styled.div`
  width: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid gray;
  border-radius: 5px;
  box-shadow: 0px 0px 4px #80808078;
  padding: 10px;
  position: absolute;
  top: 50px;
  z-index: 998;
  background-color: white;
`;

const YearMonthSelectorWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const YearMonthBtnWrapper = styled.button`
  flex: 8;
  text-align: center;
  font-size: 16px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  animation: ${scale} 1s linear infinite;
`;

const PrevNextBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
  flex: 1;
  font-size: 16px;
`;

// days 6 * 7 = 42
const DayWeekContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 30px);;
  grid-template-rows: repeat(7, 30px);
  padding: 10px 0 0;
`;

const MonthContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 52px);;
  grid-template-rows: repeat(3, 52px);
  padding: 10px 0 0;
`;

const Week = styled.span`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CurrentStyle = css`
  background-color: ${styles.mainColor};
  color: white;
`;

const Day = styled.button`
  padding: 0px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  color: ${({ gray }) => (gray ? 'gray' : 'black')};
  border: none;
  outline: none;
  cursor: ${({ limitDate }) => (limitDate ? 'not-allowed' : 'pointer')};
  transition-duration: 0.3s;
  transition-property: color, background-color;
  transition-timing-function: ease-in-out;
  background-color: transparent;
  ${({ isCurrent }) => isCurrent && CurrentStyle} 
`;

const MonthYear = styled.button`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  border-radius: 100%;
  cursor: pointer;
  background-color: transparent;
  ${({ isCurrent }) => isCurrent && CurrentStyle} 
`;

const DateButton = styled.button`
  margin: 10px 0;
  width: 230px;
  height: 35px;
  outline: none;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid gray;
  border-radius: 5px;
  background-color: transparent;
`;

const weeks = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const months = [{
  name: 'Jan',
  value: 0,
}, {
  name: 'Feb',
  value: 1,
}, {
  name: 'Mar',
  value: 2,
}, {
  name: 'Apr',
  value: 3,
}, {
  name: 'May',
  value: 4,
}, {
  name: 'Jun',
  value: 5,
}, {
  name: 'Jul',
  value: 6,
}, {
  name: 'Aug',
  value: 7,
}, {
  name: 'Sep',
  value: 8,
}, {
  name: 'Oct',
  value: 9,
}, {
  name: 'Nov',
  value: 10,
}, {
  name: 'Dec',
  value: 11,
}];

function Calendar({
  initialDate,
  maxDate,
  minDate,
  onChange,
  defaultShowStatus
}) {
  const [currentDate, setDate] = useState(moment(initialDate || new Date()));
  const [contentDate, setContentDate] = useState(moment(initialDate || new Date()));
  const [currentMode, setMode] = useState('DATE'); // DATE, MONTH, YEAR
  const [showCalendar, setShowCalendar] = useState(defaultShowStatus);

  const handleModeChange = () => {
    if (currentMode === 'DATE') {
      setMode('MONTH');
      return;
    }

    if (currentMode === 'MONTH') {
      setMode('YEAR');
      return;
    }

    if (currentMode === 'YEAR') {
      setMode('MONTH');
    }
  };

  const handleMonthChange = (month) => {
    let newDate = moment(new Date(`${contentDate.weekYear()}/${month + 1}/1`));

    if (month > 11) {
      newDate = moment(new Date(`${contentDate.weekYear() + 1}/1/1`));
    }

    if (month < 0) {
      newDate = moment(new Date(`${contentDate.weekYear() - 1}/12/1`));
    }

    setContentDate(newDate);
  };

  const getHeadrString = () => {
    switch (currentMode) {
      case 'DATE':
        return `${moment(contentDate).format('MMM YYYY')}`;

      case 'MONTH':
        return `${moment(contentDate).format('YYYY')}`;

      case 'YEAR':
        return `${moment(contentDate).format('YYYY')} - ${moment(contentDate).add(11, 'years').format('YYYY')}`;

      default:
        return `${moment(contentDate).format('MMM YYYY')}`;
    }
  };

  const dateArray = useMemo(() => dateArrayGenerator(contentDate.weekYear(), contentDate.month() + 1), [contentDate]);

  return (
    <Wrapper>
      <DateButton
        type="button"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        {moment(currentDate).format('YYYY-MM-DD')}
      </DateButton>
      {showCalendar && (
        <CalendarWrapper>
          <YearMonthSelectorWrapper>
            <PrevNextBtn
              onClick={() => {
                if (currentMode === 'DATE') {
                  handleMonthChange(contentDate.month() - 1);
                  return;
                }
                setContentDate(moment(new Date(`${contentDate.weekYear() - (currentMode === 'MONTH' ? 1 : 11)}`)));
              }}
              type="button"
            >
              {'<'}
            </PrevNextBtn>
            <YearMonthBtnWrapper
              onClick={() => handleModeChange()}
              type="button"
            >
              {getHeadrString()}
            </YearMonthBtnWrapper>
            <PrevNextBtn
              onClick={() => {
                if (currentMode === 'DATE') {
                  handleMonthChange(contentDate.month() + 1);
                  return;
                }
                setContentDate(moment(new Date(`${contentDate.weekYear() + (currentMode === 'MONTH' ? 1 : 11)}`)));
              }}
              type="button"
            >
              {'>'}
            </PrevNextBtn>
          </YearMonthSelectorWrapper>
          {currentMode === 'DATE' ? (
            <DayWeekContentWrapper>
              {weeks.map((week) => (
                <Week key={week}>
                  {week}
                </Week>
              ))}
              {dateArray.map((date) => (
                <Day
                  disabled={(maxDate && maxDate < date) || (minDate && minDate > date)}
                  type="button"
                  isCurrent={moment(currentDate).format('YYYYMMDD') === moment(date).format('YYYYMMDD')}
                  onClick={() => {
                    setDate(date);
                    setShowCalendar(false);
                    if (date.month() !== contentDate.month()) setContentDate(date);
                    if (onChange) onChange(date.toDate());
                  }}
                  limitDate={(maxDate && maxDate < date) || (minDate && minDate > date)}
                  gray={date.month() !== contentDate.month()}
                  key={date}
                >
                  {date.date()}
                </Day>
              ))}
            </DayWeekContentWrapper>
          ) : (
            <MonthContentWrapper>
              {currentMode === 'MONTH' ? (
                <>
                  {months.map((data) => (
                    <MonthYear
                      isCurrent={currentDate.month() === data.value && currentDate.weekYear() === contentDate.weekYear()}
                      onClick={() => {
                        handleMonthChange(data.value);
                        setMode('DATE');
                      }}
                      key={data.name}
                    >
                      {data.name}
                    </MonthYear>
                  ))}
                </>
              ) : (
                <>
                  {Array.from(Array(12)).map((_, index) => (
                    <MonthYear
                      isCurrent={currentDate.weekYear() === contentDate.weekYear() + index}
                      onClick={() => {
                        setContentDate(moment(new Date(`${contentDate.weekYear() + index}`)));
                        setMode('MONTH');
                      }}
                      key={`year-${contentDate.weekYear() + index}`}
                    >
                      {contentDate.weekYear() + index}
                    </MonthYear>
                  ))}
                </>
              )}
            </MonthContentWrapper>
          )}
        </CalendarWrapper>
      )}
    </Wrapper>
  );
}

Calendar.propTypes = {
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  initialDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  defaultShowStatus: PropTypes.bool,
};

Calendar.defaultProps = {
  maxDate: null,
  minDate: null,
  initialDate: null,
  onChange: null,
  defaultShowStatus: false,
};

export default Calendar;
