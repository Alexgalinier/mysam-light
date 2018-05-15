const TripModel = require('./trip.model');

/*
  This might be what you call a Controller or Manager.
  It lists all the actions that can happen on a Trip 
  from a business point of view
*/

/*
  I assume a trip is a "state machine" that stricly follow this worflow
  CREATED -> ACCEPTED -> ASSIGNED -> IN PROGRESS -> FINIHSED -> PAYED
  Thus it should not change its status if in a wrong state
*/
module.exports.accept = (tripModel, driverId, db) => {
  if (TripModel.canBeAccepted(tripModel))
    throw new Error('Invalid status to be accepted');

  /*
    This might throw an exception which should be handled by the caller.
    We could also have a "retry" politic if the error is related to 
    database timeout
  */
  db.update('trips', TripModel.toDB(tripModel), {
    status: 'ACCEPTED',
    driverId: driverId
  });
};

// module.exports.start
// module.exports.end
