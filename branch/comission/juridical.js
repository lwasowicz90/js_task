import { getCashInCommonComission, getCashAmount } from './common.js';
import { calculateMinRule } from './rule/index.js';

const getCashInComission = ({ newTransaction }) => getCashInCommonComission(newTransaction);

const getCashOutComission = ({ newTransaction }) => {
  const cashAmount = getCashAmount(newTransaction);
  return calculateMinRule(cashAmount);
};

export default { cash_in: getCashInComission, cash_out: getCashOutComission };
