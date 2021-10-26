import { add, transact, getUserTypeTransactions } from '../details.js';
import * as countComission from '../comission/index.js';

describe('Branch details', () => {
  const dummyValue = 4;
  countComission.default = jest.fn(() => dummyValue);

  it('adds item to container', () => {
    const container = [];
    const element = 'a';
    const element2 = 'b';

    expect(container.length).toStrictEqual(0);
    add({ newTransaction: element, userTransactions: container });
    add({ newTransaction: element2, userTransactions: container });

    expect(container[0]).toStrictEqual(element);
    expect(container[1]).toStrictEqual(element2);
  });

  it('transacts', () => {
    const container = [];
    const transaction = 'dummy';
    const result = transact({ userTransactions: container, newTransaction: transaction });

    expect(countComission.default).toHaveBeenNthCalledWith(1, {
      userTransactions: container,
      newTransaction: transaction,
    });
    expect(result).toStrictEqual(result);
  });

  it('gets user transactions for given type', () => {
    const userTransaction = { id: 1 };
    const notUserTransaction = { id: 2 };
    const transactions = {
      cash_in: { 1: [userTransaction], 2: [notUserTransaction] },
      cash_out: {},
    };
    const newTransaction = { user_id: 1, type: 'cash_in', date: 'dummy' };

    const result = getUserTypeTransactions({
      newTransaction,
      transactions,
    });

    const expected = [userTransaction];
    expect(result).toStrictEqual(expected);
  });
});
