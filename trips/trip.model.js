/*
  This method filters/organise an object received from db
  We could imagine data is stored in a manner that is fast for
  different operations but which is not conveniant to use in code.
*/
module.exports.fromDB = obj => {
  return {
    id: obj.id,
    status: obj.status,
    price: obj.price,
    requester: obj.requesterId
  };
};

// The opposite of `fromDB`
module.exports.toDB = tripModel => {
  return {
    id: tripModel.id,
    status: tripModel.status,
    price: tripModel.price,
    requester: tripModel.requesterId
  };
};

// Validation methods belongs to the model but are not
// part of the object itself
module.exports.canBeAccepted = tripModel => {
  return tripModel.status !== 'CREATED';
};
