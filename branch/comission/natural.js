import { getCashInCommonComission, getCashAmount } from './common.js';
import { calculateWeekLimitRule } from './rule/index.js';

const getCashInComission = ({ newTransaction }) => getCashInCommonComission(newTransaction);
const getCashOutComission = ({ userTransactions, newTransaction }) => {
  const cashAmount = getCashAmount(newTransaction);
  const { date } = newTransaction;
  return calculateWeekLimitRule({ cashAmount, date, userTransactions });
};

export default { cash_in: getCashInComission, cash_out: getCashOutComission };
