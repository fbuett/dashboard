import cfenv from 'cfenv';

Meteor.startup(function () {
  // code to run on server at startup
});

Meteor.publish("sensors", function () {
    return Sensors.find();
  });

appEnv = cfenv.getAppEnv();

if (appEnv.isLocal) {

  var mqttsettings = {
    keepalive: 1000,
    clientId: Meteor.settings.clientId,
    username: Meteor.settings.username,
    password: Meteor.settings.password
  };
  
  var mqttURL = Meteor.settings.url;

  console.log("Running locally, using METEOR settings");  
}
else {
  var ibmiotcred = appEnv.getServiceCreds("Internet of Things Platform-dl");

  if (ibmiotcred) {
    var mqttsettings = {
      keepalive: 1000,
      clientId: 'a:'+ibmiotcred.org+':meteor-app',
      username: ibmiotcred.apiKey,
      password: ibmiotcred.apiToken
    };
    
    var mqttURL = "mqtt://"+ibmiotcred.mqtt_host+":"+ibmiotcred.mqtt_u_port;   
    
    console.log("Running in CF, using VCAP settings:", mqttURL);     
  }

}

Sensors.allow({
  remove: function (userId, doc) {
    return true;
  }
});

Sensors.mqttConnect(mqttURL, 'iot-2/type/+/id/+/evt/+/fmt/+', 
  {insert:true, insertLimit:500, raw:false}, mqttsettings);

Sensors.before.insert( function(userId, doc) {
  doc.createdAt = new Date();
  doc.createdBy = userId;
  doc.modifiedAt = doc.createdAt;
  doc.modifiedBy = doc.createdBy;

  if(!doc.createdBy) doc.createdBy = userId;
});
