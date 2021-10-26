import inputData from './input/index.js';
import Branch from './branch/Branch.js';

const executeTask = () => {
  const branchOne = Branch();
  inputData.forEach((element) => {
    console.log(branchOne.transact(element));
  });
};

executeTask();
