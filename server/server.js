import cfenv from 'cfenv';

// get app env - required for Cloud Foundry
appEnv = cfenv.getAppEnv();

if (appEnv.isLocal) {
  // if running locally get setting from Meteor env
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
  // get keys and settings from VCAP env variable if running on Cloud Foundry
  var ibmiotcred = appEnv.getServiceCreds("Internet of Things Platform-dl");

  if (ibmiotcred) {
    var mqttsettings = {
      keepalive: 1000,
      clientId: 'a:'+ibmiotcred.org+':meteor-app',
      username: ibmiotcred.apiKey,
      password: ibmiotcred.apiToken
    };
    
    // construct MQTT endpoint
    var mqttURL = "mqtt://"+ibmiotcred.mqtt_host+":"+ibmiotcred.mqtt_u_port;   
    
    console.log("Running in CF, using VCAP settings:", mqttURL);     
  }

}

// Connect Sensor collection with IBM Watson IoT MQTT broker
Sensors.mqttConnect(mqttURL, 'iot-2/type/+/id/+/evt/+/fmt/+', 
  {insert:true, insertLimit:500, raw:false}, mqttsettings);

// Publish Sensor collection
Meteor.publish("sensors", function () {
    return Sensors.find();
  });
