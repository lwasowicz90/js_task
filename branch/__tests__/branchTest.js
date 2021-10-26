import Branch from '../Branch.js';
import * as utils from '../../utils/index.js';
import * as details from '../details.js';

const defaultCommissionPrecision = 2;
const dummyComission = 6.001;
const roundedDummyComission = 1.22;
const fixedRoundedDummyComission = '1.22';
const dummyUserTransactions = [];
utils.roundComission = jest.fn(() => roundedDummyComission);
details.transact = jest.fn(() => dummyComission);
details.getUserTypeTransactions = jest.fn(() => dummyUserTransactions);

describe('Branch', () => {
  it('checks if proper dependency methods are invoked', () => {
    const newTransaction = {
      date: 'dummy',
      type: 'cash_in,',
      user_id: 5,
      user_type: 'dummy,',
      operation: { amount: 100 },
    };
    const branch = Branch();

    const result = branch.transact(newTransaction);

    expect(details.getUserTypeTransactions).toHaveBeenCalled();
    expect(details.transact).toHaveBeenNthCalledWith(1, {
      newTransaction,
      userTransactions: dummyUserTransactions,
    });
    expect(utils.roundComission).toHaveBeenNthCalledWith(
      1,
      dummyComission,
      defaultCommissionPrecision
    );
    expect(result).toStrictEqual(fixedRoundedDummyComission);
  });
});
