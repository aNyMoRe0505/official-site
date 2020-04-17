import moment from 'moment';

export const dayCountCalculator = (year, month) => {
  // 取得某年某月有幾天
  // 西元年不可被 4 整除，平年。
  // 西元年可被 4 整除，且不可被 100 整除，閏年。
  // 西元年可被 100 整除，且不可被 400 整除，平年
  // 西元年可被 400 整除，閏年。
  if (month === 2) {
    if (
      (year % 4 === 0
      && year % 100 !== 0)
      || year % 400 === 0
    ) {
      // 閏年
      return 29;
    }
    // 平年
    return 28;
  }

  if (
    month === 4
    || month === 6
    || month === 9
    || month === 11
    ) {
      return 30;
    }

    return 31;
};

export const dateArrayGenerator = (year, month) => {  
  const daysCount = dayCountCalculator(year, month);
  const firstDayWeek = moment(new Date(`${year}/${month}/1`)).day(); // 0 ~ 6
  const dayArray = Array.from(Array(daysCount)).map((_, index) => moment(new Date(`${year}/${month}/${index + 1}`)));

  // 第一天不是星期天的狀況
  if (firstDayWeek) { // 1 - 6
    // 計算上個月的天數
    const preMonthYear = month === 1 ? year - 1 : year;
    const preMonth = month === 1 ? 12 : month - 1;
    const prevMonthDayCount = dayCountCalculator(preMonthYear, preMonth);

    const unshiftDayArray = Array.from(Array(firstDayWeek)).map((_, index) =>
      moment(new Date(`${preMonthYear}/${preMonth}/${prevMonthDayCount - (firstDayWeek - 1) + index}`))
    );
    dayArray.unshift(...unshiftDayArray); 
  }

  // 一個月顯示的天數要有42天
  if (dayArray.length !== 42) {
    const remainPushDayCount = 42 - dayArray.length;
    const nextMonthYear = month === 12 ? year + 1 : year;
    const nextMonth = month === 12 ? 1 : month + 1;

    const pushDayArray = Array.from(Array(remainPushDayCount)).map((_, index) => moment(new Date(`${nextMonthYear}/${nextMonth}/${index + 1}`)));
    dayArray.push(...pushDayArray);
  }

  return dayArray;
};
