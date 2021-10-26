import { roundComission } from '../utils/index.js';
import { transact, getUserTypeTransactions } from './details.js';

const commissionPrecision = 2;
const Branch = () => {
  const transactions = { cash_out: {}, cash_in: {} };

  return {
    transact: (newTransaction) => {
      const userTransactions = getUserTypeTransactions({ newTransaction, transactions });
      const comission = transact({ userTransactions, newTransaction });
      return roundComission(comission, commissionPrecision).toFixed(commissionPrecision);
    },
  };
};

export default Branch;
