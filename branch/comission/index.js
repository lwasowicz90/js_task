import comissionCalculatorProvider from './provider.js';

const countComission = ({ userTransactions, newTransaction }) => {
  const transactionType = newTransaction.type;
  const userType = newTransaction.user_type;

  const comissionCalculator = comissionCalculatorProvider[userType];
  const calculateComission = comissionCalculator[transactionType];
  return calculateComission({ userTransactions, newTransaction });
};

export default countComission;
