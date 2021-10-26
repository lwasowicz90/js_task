import countComission from './comission/index.js';

const add = ({ userTransactions, newTransaction }) => {
  userTransactions.push(newTransaction);
};

const transact = ({ userTransactions, newTransaction }) => {
  const c = countComission({
    userTransactions,
    newTransaction,
  });
  add({ userTransactions, newTransaction });
  return c;
};

const getUserTypeTransactions = ({ newTransaction, transactions }) => {
  const transactionType = newTransaction.type;
  const usersTranscations = transactions[transactionType];
  const userId = newTransaction.user_id;
  usersTranscations[userId] = [...(usersTranscations[userId] || [])];

  const userTransactions = usersTranscations[userId];
  return userTransactions;
};

export { add, transact, getUserTypeTransactions };
