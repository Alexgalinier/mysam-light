// Database connector and data manipulation library
const fakeDBDriver = { connect: () => {} };

// Mock db methods/properties
const db = {
  client: null,
  // Return the resource with identifier id if exists, instead null
  get: (resource, id) => {},

  /*
    Update can be done in many ways:
    - Update directly the entity
    - Create a new version with properties changed, the base object
    points to the latest version
    - Update directly the entity but store the action in a nearby 
    entity (like trips and trips_updates)
    The last 2 allow you to have a better tracabality of who did what,
    when and also to travel back in time.
  */
  update: (resource, obj, updatedProperties) => {}
};

module.exports.create = async (name, user, password) => {
  try {
    // Here we do the db connection and wait for it to be ready
    db.client = await fakeDBDriver.connect(name, user, password);
  } catch (e) {
    console.error(`DB can't start`, e.message);
    process.exit(1);
  }

  return db;
};
