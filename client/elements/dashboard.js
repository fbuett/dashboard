Template.widgets.helpers ({
/*
 return latest document from sensor collection
*/

'lastValues': function () {
  return Sensors.findOne({topic: /^iot-2\/type\/Photon/}, {sort: [["createdAt", "desc"]] });
  },
}); 