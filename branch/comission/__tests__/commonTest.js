import { getCashAmount, getCashInCommonComission } from '../common.js';

import * as calculateRules from '../rule/index.js';

describe('Comission common', () => {
  const dummyTransaction = { operation: { amount: 100 } };
  const dummyValueReturned = 10;
  calculateRules.calculateMaxRule = jest.fn(() => dummyValueReturned);

  it('verifies usage of max rule', () => {
    const result = getCashInCommonComission(dummyTransaction);
    expect(calculateRules.calculateMaxRule).toHaveBeenNthCalledWith(
      1,
      dummyTransaction.operation.amount
    );
    expect(result).toStrictEqual(dummyValueReturned);
  });
});

describe('Comission common utils', () => {
  it('return cash amount from transaction', () => {
    const expected = 500;
    const transaction = { operation: { amount: expected } };
    expect(getCashAmount(transaction)).toStrictEqual(expected);
  });
});
