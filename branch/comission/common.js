import { calculateMaxRule } from './rule/index.js';

const getCashAmount = (newTransaction) => {
  const {
    operation: { amount: cashAmount },
  } = newTransaction;
  return cashAmount;
};

const getCashInCommonComission = (newTransaction) => {
  const cashAmount = getCashAmount(newTransaction);
  return calculateMaxRule(cashAmount);
};

export { getCashInCommonComission, getCashAmount };
