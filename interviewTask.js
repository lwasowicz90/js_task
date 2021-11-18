// Fizz Buzz
// For numbers from 1 to 100:

// Print that number
// If number divides from 3, print Fizz instead
// If number divides from 5, print Buzz instead
// If number divides from both 3 and 5, print FizzBuzz instead
// Expected output:
//1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz 16 ... 98 Fizz Buzz

// const byThreeHandler = (value) => {
//   if (value % 3 === 0) {
//     return 'Fizz';
//   }
//   return '';
// };

// const byFiveHandler = (value) => {
//   if (value % 5 === 0) {
//     return 'Buzz';
//   }
//   return '';
// };

// const process = (value) => {
//   const result_1 = byThreeHandler(value);
//   const result_2 = byFiveHandler(value);

//   if (result_1 === '' && result_2 === '') {
//     return value;
//   }

//   return `${result_1}${result_2}`;
// };

// let answers = [];
// for (let i = 1; i < 101; i++) {
//   answers.push(process(i));
// }

// console.log(answers.join(' '));
//1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz 16 ... 98 Fizz Buzz

// Maintain the code from task v1, it's still used in the system.

// For numbers from 1 to 100:

// Print that number
// If number divides from 7, print Bar instead
// If number divides from 11, print Baz instead
// If number divides from both 7 and 11, print BarBaz instead
// Expected output:

// 1 2 3 4 5 6 Bar 8 9 10 Baz 12 13 Bar 15 ... 76 BarBaz 78 ... Bar Baz 100
// As task v1 should be mainained, full expected output would be something like this:

// Fizz Buzz:
// 1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz 16 ... 98 Fizz Buzz

// Bar Bazz:
// 1 2 3 4 5 6 Bar 8 9 10 Baz 12 13 Bar 15 ... 76 BarBaz 78 ... Bar Baz 100
// It would be really great if there would be no copy-and-paste.

// Fizz Buzz with different logic
// Maintain the code from task v1 and v2, as it's still used in the system. For numbers from 1 to 100:

// Print that number
// If number is between 3 and 6, print Fizz instead
// If number is ends with 5, print Buzz instead
// If both conditions are true, print FizzBuzz instead
// Expected output:

// 1 2 Fizz Fizz FizzBuzz Fizz 7 8 9 10 11 12 13 14 Buzz 16 ... 100
// As task v1 and v2 should be mainained, full expected output would be something like this:

// Fizz Buzz:
// 1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz 16 ... 98 Fizz Buzz

// Bar Baz:
// 1 2 3 4 5 6 Bar 8 9 10 Baz 12 13 Bar 15 ... 76 BarBaz 78 ... Bar Baz 100

// Fizz Buzz with different logic:
// 1 2 Fizz Fizz FizzBuzz Fizz 7 8 9 10 11 12 13 14 Buzz 16 ... 100
// It would be really great if there would be no copy-and-paste.

// Parameters and logic can be changed or added - it's best if your code would be easily maintanable, extensible and optionally testable.

// For example, more conditions can be added for new tasks (less than 3, between 5 and 11, is primary etc.), this should be easily added to the code.

// Print that number
// If number is between 3 and 6, print Fizz instead
// If number is ends with 5, print Buzz instead
// If both conditions are true, print FizzBuzz instead

// const storage = {
//   7: 'Bar',
//   11: 'Baz',
// };

const divideStorage = {
  3: 'Fizz',
  5: 'Buzz',
  7: 'Bar',
  11: 'Baz',
};

const dividerHandler = (value, divider) => {
  if (value % divider === 0) {
    return divideStorage[divider];
  }

  return '';
};

const betweenHandler = (value, left, right) => {
  if (left >= 3 && value <= right) {
    return 'Fizz';
  }

  return '';
};

const endsHandler = (value, ends) => {
  const valueText = `${value}`;
  const lastNumber = valueText.slice(-1);
  if (lastNumber === ends) {
    return 'Buzz';
  }

  return '';
};

const process = (value, localHandlersMap) => {
  const results = Object.values(localHandlersMap).map((handler) => {
    return handler(value);
  });

  const emptyResults = results.filter((item) => item === '');

  if (emptyResults.length === results.length) {
    return value;
  }
  return results.join('');
};

let answers_1 = [];
const localHandlers_1 = {
  0: (value) => dividerHandler(value, 3),
  1: (value) => dividerHandler(value, 5),
};

for (let i = 1; i < 101; i++) {
  answers_1.push(process(i, localHandlers_1));
}

console.log(answers_1.join(' '));

let answers_2 = [];
const localHandlers_2 = {
  0: (value) => dividerHandler(value, 7),
  1: (value) => dividerHandler(value, 11),
};
for (let i = 1; i < 101; i++) {
  answers_2.push(process(i, localHandlers_2));
}

console.log();
console.log(answers_2.join(' '));

let answers_3 = [];
const localHandlers_3 = {
  0: (value) => betweenHandler(value, 3, 6),
  1: (value) => endsHandler(value, 5),
};
for (let i = 1; i < 101; i++) {
  answers_3.push(process(i, localHandlers_3));
}

console.log();
console.log(answers_3.join(' '));
