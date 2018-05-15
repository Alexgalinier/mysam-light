const askForPayment = require('./../lib/bank').askForPayment;
const config = require('./../config');

module.exports.payTrip = async (tripModel, db) => {
  /*
    Here i thought MySam would have a bank account, which leads to
    one transaction from the requester to this account, and a transaction
    from this account to the driver account of 85% of the course price.
    As we talk about 3 transactions, i assume there is someking of account
    buffer which receives requester payment and once it has the money we 
    trigger MySam and Driver payment.
  */

  // Create transaction in database
  // db.insert(...)

  const driver = db.get(tripModel.driverId);
  const requester = db.get(tripModel.requesterId);

  // We wait for the first payment to be done to ensure money is present
  await askForPayment(requester.account, config.bufferAccount, tripModel.price);
  // Then the two others can be done in parallel
  askForPayment(
    config.bufferAccount,
    driver.account,
    // This should be more properly rounded
    tripModel.price * (100 - config.mySamPaymentPercent) / 100
  );
  askForPayment(
    config.bufferAccount,
    config.mySamAccount,
    // This should be more properly rounded
    tripModel.price * config.mySamPaymentPercent / 100
  );

  // Each time a payment is completed or failed, its status
  // in database must be updated

  // Once all of this is done, without fail, the trip should be changed to PAYED
};
