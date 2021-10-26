import juridicalComissionObject from '../juridical.js';
import * as common from '../common.js';

import * as calculateRules from '../rule/index.js';

describe('Comission juridical', () => {
  const dummyAmount = 100;
  const newTransaction = { operation: { amount: dummyAmount } };
  const dummyValueReturned = 10;

  common.getCashInCommonComission = jest.fn(() => dummyValueReturned);
  calculateRules.calculateMinRule = jest.fn(() => dummyValueReturned);

  it('verifies cash in and usage of getCashInCommonComission', () => {
    const { cash_in: getCashInComissionFunc } = juridicalComissionObject;

    const result = getCashInComissionFunc({ newTransaction });
    expect(common.getCashInCommonComission).toHaveBeenNthCalledWith(1, newTransaction);
    expect(result).toStrictEqual(dummyValueReturned);
  });

  it('verifies cash out and usage of calculateMinRule', () => {
    const { cash_out: getCashOutComissionFunc } = juridicalComissionObject;

    const result = getCashOutComissionFunc({ newTransaction });
    expect(calculateRules.calculateMinRule).toHaveBeenNthCalledWith(1, dummyAmount);
    expect(result).toStrictEqual(dummyValueReturned);
  });
});
