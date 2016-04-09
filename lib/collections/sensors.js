Sensors = new Mongo.Collection('sensors');


// Allow inserts from Client
// INSECURE - needs FIX
Sensors.allow({
  remove: function (userId, doc) {
    return true;
  }
});

// Add timestamps to document before INSERT
Sensors.before.insert( function(userId, doc) {
  doc.createdAt = new Date();
  doc.createdBy = userId;
  doc.modifiedAt = doc.createdAt;
  doc.modifiedBy = doc.createdBy;

  if(!doc.createdBy) doc.createdBy = userId;
});