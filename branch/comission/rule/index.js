import moment from 'moment';
import { $, lte } from 'moneysafe';

import { percent2decimal } from '../../../utils/index.js';
import { minRule, maxRule, weekLimitRule } from './rules.js';

const ruleTypeIndex = 1;

const getRuleData = (rule) => {
  const { percents } = rule;
  const ruleTypeKey = Object.keys(rule)[ruleTypeIndex];

  const {
    [ruleTypeKey]: { amount: amountLimit },
  } = rule;
  return { percents, amountLimit };
};

const calculateMinRule = (cashAmount, rule = minRule) => {
  const { percents, amountLimit } = getRuleData(rule);
  const calculatedComission = $(percent2decimal(percents)).multipliedBy(cashAmount).valueOf();
  return calculatedComission < amountLimit ? amountLimit : calculatedComission;
};

const calculateMaxRule = (cashAmount, rule = maxRule) => {
  const { percents, amountLimit } = getRuleData(rule);
  const calculatedComission = $(percent2decimal(percents)).multipliedBy(cashAmount).valueOf();
  return calculatedComission > amountLimit ? amountLimit : calculatedComission;
};

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const daysBefore = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
};

const getThisWeekTransactions = ({ date, userTransactions }) => {
  const currentDay = new Date(date);
  const currentMomentDay = moment(currentDay);
  const dayName = weekDays[currentDay.getDay()];
  const daysBeforeNumber = daysBefore[dayName];
  const firstPossibleMoment = currentMomentDay.subtract(daysBeforeNumber, 'days');

  const matchingTransactions = userTransactions.filter((transcation) => {
    const dateToCheck = new Date(transcation.date);
    return moment(dateToCheck) >= firstPossibleMoment;
  });

  return matchingTransactions;
};

const calculateWeekLimitRule = ({ cashAmount, date, userTransactions }, rule = weekLimitRule) => {
  const { percents, amountLimit } = getRuleData(rule);
  const thisWeekTransactions = getThisWeekTransactions({ date, userTransactions });
  const cashSum = thisWeekTransactions.reduce(
    (prevValue, transaction) => $(prevValue).plus(transaction.operation.amount).valueOf(),
    0
  );

  const cashTotal = $(cashSum).plus(cashAmount).valueOf();

  if (cashTotal <= amountLimit) {
    return 0;
  }

  const cashExceeded = cashTotal - amountLimit;

  if (lte($(cashExceeded), $(cashAmount))) {
    return percent2decimal(percents) * cashExceeded;
  }

  const totalComission = $(percent2decimal(percents)).multipliedBy(cashExceeded);
  const transcactionComission = $(totalComission).multipliedBy(cashAmount).dividedBy(cashExceeded);
  return transcactionComission;
};

export { calculateMinRule, calculateMaxRule, calculateWeekLimitRule };
