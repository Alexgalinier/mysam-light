const TripModel = require('./trip.model');
const accept = require('./trip.actions').accept;
const payTrip = require('./../transactions/transaction.actions').payTrip;

module.exports = (server, db) => {
  // I would have called it /api/trips/{id}/accept by convention
  // But if the naming is clear for all actors it's fine
  server.endpoint('/api/trip/accept?tripId={id}', (req, res) => {
    /*
      This method is called before all the others endpoints and 
      perform multiple checks :
        - It should ensure the user is authenticated (as i assume this 
          is restricted enpoint) : Http Status 401
        - It should ensure user has the right to manpilate the data 
        (only drivers can accept i assume): Http Status 403
        - We should validate if req.params correspond to what we expect
      If one of those condiftions fails, the request should not go any further
    */

    const trip = db.get('trips', req.params.id);

    // We stop code early when it can't be processed
    if (!trip) return '404';

    const tripModel = TripModel.fromDB(trip);

    try {
      // The driver who accept the course is the logged user i assume
      accept(tripModel, req.user.id, db);
    } catch (e) {
      return '409';
    }

    return '200';
  });

  server.endpoint('/api/trip/start?tripId={id}', (req, res) => {
    /*
      As far as i understand this is just a state change done by 
      the driver once the course requester is in the car.
      Something close to accept with also a startTime saved in database i suppose.
    */
  });

  server.endpoint('/api/trip/end?tripId={id}', (req, res) => {
    /*
      Same as accept or start for the trip status.
      But then it will trigger payment.
      I also assume the user doesn't need to validate the course
      has really been done, or we don't check start/end delta 
      is less than few seconds.
    */

    /*
     In micro service infrastructure, or at least a decoupled one
     this trigger should be done by a message dispatch (Pub/Sub pattern)
     Here, to simplify, i access the actions directly
    */

    payTrip(tripModel, db);

    /*
      I consider we don't wait for the transactions to be validated.
      That's a UX point of view, it's green for the requester and the driver,
      users are happy and have a fast feedback.
      In rare cases of invalid transactions, there should be a notification system,
      or something else to think about.
    */
    return '200';
  });
};
