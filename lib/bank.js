// Bank library to handle money transfer

// Mock
const transactionDone = async () => {};

/*
- accountFrom : Account/Card which is debited
- accountTo : Account/Card which is credited
*/
module.exports.askForPayment = async (accountFrom, accountTo, amount) => {
  await transactionDone();
};
