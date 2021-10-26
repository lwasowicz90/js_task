import countComission from '../index.js';
import * as provider from '../provider.js';

const dummyValue = 5;
const juridicalCashInMock = jest.fn(() => dummyValue);
const juridicalCashOutMock = jest.fn(() => dummyValue);
const naturalCashInMock = jest.fn(() => dummyValue);
const naturalCashOutMock = jest.fn(() => dummyValue);
provider.default = {
  juridical: { cash_in: juridicalCashInMock, cash_out: juridicalCashOutMock },
  natural: { cash_in: naturalCashInMock, cash_out: naturalCashOutMock },
};

describe('Count method decision for comission', () => {
  it('if natural cash in method is selected', () => {
    const userTransactions = [];
    const newTransaction = {
      type: 'cash_in',
      user_type: 'natural',
    };

    const result = countComission({ userTransactions, newTransaction });
    expect(naturalCashInMock).toHaveBeenNthCalledWith(1, {
      userTransactions,
      newTransaction,
    });
    expect(result).toStrictEqual(dummyValue);
  });
});

describe('Count method decision for comission', () => {
  it('if natural cash out method is selected', () => {
    const userTransactions = [];
    const newTransaction = {
      type: 'cash_out',
      user_type: 'natural',
    };

    const result = countComission({ userTransactions, newTransaction });
    expect(naturalCashOutMock).toHaveBeenNthCalledWith(1, {
      userTransactions,
      newTransaction,
    });
    expect(result).toStrictEqual(dummyValue);
  });
});

describe('Count method decision for comission', () => {
  it('if juridical cash in method is selected', () => {
    const userTransactions = [];
    const newTransaction = {
      type: 'cash_in',
      user_type: 'juridical',
    };

    const result = countComission({ userTransactions, newTransaction });
    expect(juridicalCashInMock).toHaveBeenNthCalledWith(1, {
      userTransactions,
      newTransaction,
    });
    expect(result).toStrictEqual(dummyValue);
  });
});

describe('Count method decision for comission', () => {
  it('if juridical cash out method is selected', () => {
    const userTransactions = [];
    const newTransaction = {
      type: 'cash_out',
      user_type: 'juridical',
    };

    const result = countComission({ userTransactions, newTransaction });
    expect(juridicalCashOutMock).toHaveBeenNthCalledWith(1, {
      userTransactions,
      newTransaction,
    });
    expect(result).toStrictEqual(dummyValue);
  });
});
