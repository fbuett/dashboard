Template.sensortable.helpers({
  
  /*
    get all Photon events from sensor collection
  */    
  "photonData": function () {
      return Sensors.find({topic: /^iot-2\/type\/Photon/});
  },
  
  /*
    define settings for Photon log table
  */    
  photonTableSettings : function () {
    return {
        fields: [
          { key: 'topic', label: 'Topic' },
          { key: 'message', label: 'Temperature', fn: function (value, object, key) {return value.d.temperatur;}},            
          { key: 'message', label: 'Humidity', fn: function (value, object, key) {return value.d.humidity;}},
          { key: 'message', label: 'Ambient', fn: function (value, object, key) {return value.d.ambient;}},
          { key: 'createdAt', label: 'Timestamp', sortOrder: 0, sortDirection: 'descending'},
          { key: 'delete', label: 'Delete', fn: function () { return new Spacebars.SafeString('<button class="btn btn-danger" type="button"><span class="glyphicon glyphicon-trash" id="deletebtn"></span></button>') } }
        ],
        showRowCount: true,
        
      }
  },
  
  /*
    get all Smartphone events from sensor collection
  */
  "interactorData": function () {
      return Sensors.find({topic: /^iot-2\/type\/Smartphone/});
  },
  
  /*
    define settings for interactor log table
  */
  interactorTableSettings : function () {
    return {
        fields: [
          { key: 'topic', label: 'Topic' },
          { key: 'message', label: 'Zone', fn: function (value, object, key) {return value.data.zoneName;}},
          { key: 'createdAt', label: 'Timestamp', sortOrder: 0, sortDirection: 'descending'},
        ]
      }
  }        
});

Template.sensortable.events({
  'click .reactive-table tbody tr': function (event) {
    console.log(this);
    console.log(event);

    event.preventDefault();
    var post = this;
    // checks if the actual clicked element has the class `delete`
    if (event.target.id == "deletebtn") {
      Sensors.remove(post._id)
    }
  }
});
