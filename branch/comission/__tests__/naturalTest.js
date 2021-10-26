import naturalComissionObject from '../natural.js';
import * as common from '../common.js';

import * as calculateRules from '../rule/index.js';

describe('Comission natural', () => {
  const dummyAmount = 100;
  const newTransaction = { date: 'dummyDate', operation: { amount: dummyAmount } };
  const dummyValueReturned = 10;

  common.getCashInCommonComission = jest.fn(() => dummyValueReturned);
  calculateRules.calculateWeekLimitRule = jest.fn(() => dummyValueReturned);

  it('verifies cash in and usage of getCashInCommonComission', () => {
    const { cash_in: getCashInComissionFunc } = naturalComissionObject;

    const result = getCashInComissionFunc({ newTransaction });
    expect(common.getCashInCommonComission).toHaveBeenNthCalledWith(1, newTransaction);
    expect(result).toStrictEqual(dummyValueReturned);
  });

  it('verifies cash out and usage of calculateWeekLimitRule', () => {
    const { cash_out: getCashOutComissionFunc } = naturalComissionObject;
    const userTransactions = [];

    const result = getCashOutComissionFunc({ userTransactions, newTransaction });
    expect(calculateRules.calculateWeekLimitRule).toHaveBeenNthCalledWith(1, {
      cashAmount: dummyAmount,
      date: newTransaction.date,
      userTransactions,
    });
    expect(result).toStrictEqual(dummyValueReturned);
  });
});
