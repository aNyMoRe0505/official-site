import React, { useState, useMemo } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';

import { dateArrayGenerator } from '../helper/calendar.js';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const CalendarWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid gray;
  border-radius: 5px;
  box-shadow: 0px 0px 4px #80808078;
  padding: 10px;
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
  grid-template-columns: repeat(7, 40px);;
  grid-template-rows: repeat(7, 40px);
  padding: 10px 0 0;
`;

const MonthContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 70px);;
  grid-template-rows: repeat(3, 70px);
  padding: 10px 0 0;
`;

const Week = styled.span`
  font-size: 16px;
  text-align: center;
  padding: 12px;
`;

const CurrentStyle = css`
  background-color: #b75e5e;
  color: white;
`;

const Day = styled.button`
  font-size: 16px;
  text-align: center;
  border-radius: 100%;
  color: ${({ isGray }) => isGray ? 'gray' : 'black'};
  border: none;
  outline: none;
  cursor: pointer;
  transition-duration: 0.3s;
  transition-property: color, background-color;
  ${({ isCurrent }) => isCurrent ? CurrentStyle : null} 
`;

const MonthYear = styled.button`
  font-size: 16px;
  text-align: center;
  border: none;
  outline: none;
  border-radius: 100%;
  cursor: pointer;
  ${({ isCurrent }) => isCurrent ? CurrentStyle : null} 
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

function CalendarDemoPage() {
  const [currentDate, setDate] = useState(new Date());
  const [contentDate, setContentDate] = useState(new Date());
  const [currentMode, setMode] = useState('DATE'); // DATE, MONTH, YEAR

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
    if (month > 11) {
      setContentDate(new Date(`${contentDate.getFullYear() + 1}-1`));
      return;
    }
    if (month < 0) {
      setContentDate(new Date(`${contentDate.getFullYear() - 1}-12`));
      return;
    }
    setContentDate(new Date(`${contentDate.getFullYear()}-${month + 1}`));
  }

  const getHeadrString = () => {
    switch (currentMode) {
      case 'DATE':
        return `${moment(contentDate).format('MMM YYYY')}`;

      case 'MONTH':
        return `${moment(contentDate).format('YYYY')}`;

      case 'YEAR':
        return `${moment(contentDate).format('YYYY')} - ${moment(contentDate).add(11, 'years').format('YYYY')}` 
    
      default:
        return `${moment(contentDate).format('MMM YYYY')}`;
    }
  };

  const dateArray = useMemo(() =>
    dateArrayGenerator(contentDate.getFullYear(), contentDate.getMonth() + 1), [contentDate]);
    
  return (
    <Wrapper>
      current: {moment(currentDate).format('YYYYMMDD')}
			<CalendarWrapper>
        <YearMonthSelectorWrapper>
          <PrevNextBtn
            onClick={() => {
              if (currentMode === 'DATE') {
                handleMonthChange(contentDate.getMonth() - 1);
                return;
              }
              setContentDate(new Date(`${contentDate.getFullYear() - (currentMode === 'MONTH' ? 1 : 11)}`));
            }}
            type="button">
            {'<'}
          </PrevNextBtn>
        <YearMonthBtnWrapper
          onClick={() => handleModeChange()}
          type="button">
          {getHeadrString()}
        </YearMonthBtnWrapper>
          <PrevNextBtn
            onClick={() => {
              if (currentMode === 'DATE') {
                handleMonthChange(contentDate.getMonth() + 1);
                return;
              }
              setContentDate(new Date(`${contentDate.getFullYear() + (currentMode === 'MONTH' ? 1 : 11)}`));
            }}
            type="button">
            {'>'}
          </PrevNextBtn>
        </YearMonthSelectorWrapper>
        {currentMode === 'DATE' ? (
          <DayWeekContentWrapper>
            {weeks.map(week => (
              <Week key={week}>
                {week}
              </Week>
            ))}
            {dateArray.map(date => (
            <Day
              type="button"
              isCurrent={moment(currentDate).format('YYYYMMDD') === moment(date).format('YYYYMMDD')}
              onClick={() => {
                setDate(date);
                if (date.getMonth() !== contentDate.getMonth()) setContentDate(date);
              }}
              isGray={date.getMonth() !== contentDate.getMonth()}
              key={date}>
              {date.getDate()}
            </Day>
            ))}
          </DayWeekContentWrapper>
        ) : (
          <MonthContentWrapper>
            {currentMode === 'MONTH' ? (
              <>
                {months.map(data => (
                  <MonthYear
                    isCurrent={currentDate.getMonth() === data.value && currentDate.getFullYear() === contentDate.getFullYear()}
                    onClick={() => {
                      handleMonthChange(data.value);
                      setMode('DATE');
                    }}
                    key={data.name}>
                    {data.name}
                  </MonthYear>
                ))}
              </>
            ) : (
              <>
                {Array.from(Array(12)).map((_, index) => (
                  <MonthYear
                    isCurrent={currentDate.getFullYear() === contentDate.getFullYear() + index}
                    onClick={() => {
                      setContentDate(new Date(`${contentDate.getFullYear() + index}`));
                      setMode('MONTH');
                    }}
                  key={`year-${contentDate.getFullYear() + index}`}>
                  {contentDate.getFullYear() + index}
                </MonthYear>
                ))}
              </>
            )}
          </MonthContentWrapper>
        )}
      </CalendarWrapper>
    </Wrapper>
  );
}

export default CalendarDemoPage;
