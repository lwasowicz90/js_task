import { $ } from 'moneysafe';
import { calculateMinRule, calculateMaxRule, calculateWeekLimitRule } from '../index.js';

const countTestComission = (amount, percents) =>
  $(amount).multipliedBy(percents).dividedBy(100).valueOf();

describe('Comission rule - calculateMinRule', () => {
  const testMinRule = {
    percents: 0.3,
    min: {
      amount: 0.5,
    },
  };
  it('calculates min rule when amount lt min', () => {
    const cashAmount = 1;
    const expected = testMinRule.min.amount;

    expect(calculateMinRule(cashAmount, testMinRule)).toStrictEqual(expected);
  });

  it('calculates min rule when amount gt min', () => {
    const cashAmount = 1100;
    const expected = countTestComission(cashAmount, testMinRule.percents);

    expect(calculateMinRule(cashAmount, testMinRule)).toStrictEqual(expected);
  });
});

describe('Comission rule - calculateMaxRule', () => {
  const testMaxRule = {
    percents: 0.03,
    max: {
      amount: 5,
      currency: 'EUR',
    },
  };

  it('calculates max rule when amount gt max', () => {
    const cashAmount = 110000;
    const expected = testMaxRule.max.amount;

    expect(calculateMaxRule(cashAmount)).toStrictEqual(expected);
  });

  it('calculates max rule when amount lt max', () => {
    const cashAmount = 190;
    const expected = countTestComission(cashAmount, testMaxRule.percents);

    expect(calculateMaxRule(cashAmount)).toStrictEqual(expected);
  });
});

describe('Comission rule - calculateWeekLimitRule', () => {
  const testWeekLimitRule = {
    percents: 0.3,
    week_limit: {
      amount: 1000,
    },
  };
  it('calculates week limit rule when first operation.', () => {
    const cashAmount = 500;
    const date = '2020-06-01';
    const userTransactions = [];
    const expected = 0;

    expect(calculateWeekLimitRule({ cashAmount, date, userTransactions })).toStrictEqual(expected);
  });

  it('calculates week limit rule when limit exceeded last week', () => {
    const cashAmount = 500;
    const date = '2020-06-01';
    const userTransactions = [{ date: '2020-05-31', operation: { amount: 10000 } }];
    const expected = 0;

    expect(calculateWeekLimitRule({ cashAmount, date, userTransactions })).toStrictEqual(expected);
  });

  it('calculates week limit rule when limit exceeded with first operation', () => {
    const cashAmount = 1500;
    const date = '2020-06-01';
    const userTransactions = [];
    const expected = countTestComission(
      cashAmount - testWeekLimitRule.week_limit.amount,
      testWeekLimitRule.percents
    );

    expect(calculateWeekLimitRule({ cashAmount, date, userTransactions })).toStrictEqual(expected);
  });

  it('calculates week limit rule when limit exceeded after other operations', () => {
    const cashAmount = 2564;
    const date = '2020-06-05';
    const userTransactions = [
      { date: '2020-06-01', operation: { amount: 200 } },
      { date: '2020-06-02', operation: { amount: 300 } },
      { date: '2020-06-03', operation: { amount: 50 } },
      { date: '2020-06-04', operation: { amount: 150 } },
    ];
    const amount =
      cashAmount -
      (testWeekLimitRule.week_limit.amount -
        userTransactions.reduce((prev, current) => prev + current.operation.amount, 0));
    const expected = countTestComission(amount, testWeekLimitRule.percents);

    expect(calculateWeekLimitRule({ cashAmount, date, userTransactions })).toStrictEqual(expected);
  });

  it('calculates week limit rule when limit exceeded for big number', () => {
    const cashAmount = 2500000012;
    const date = '2020-06-05';
    const userTransactions = [];
    const expected = countTestComission(
      cashAmount - testWeekLimitRule.week_limit.amount,
      testWeekLimitRule.percents
    );

    expect(calculateWeekLimitRule({ cashAmount, date, userTransactions })).toStrictEqual(expected);
  });
});
