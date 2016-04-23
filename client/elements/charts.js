Template.sensorchart.helpers({
  /* 
    build the Photon sensor data chart
  */

  "photonChart": function() {
    var cols = [];
    var colAmbient = ["Ambient"];
    var colTemp = ["Temperature"];
    var colHum = ["Humidity"];
    var colX = ["x"];

    var data = _.pluck(Sensors.find({ topic: /^iot-2\/type\/Photon/}).fetch(), "message");
    var time = _.pluck(Sensors.find({ topic: /^iot-2\/type\/Photon/}).fetch(), "createdAt");
    
    _.each(time, function(g) {
      colX.push(g);
    });

    _.each(data, function(g) {
      colAmbient.push(parseInt(g.d.ambient));
      colTemp.push(parseFloat(g.d.temperatur));
      colHum.push(parseFloat(g.d.humidity));
    });

    cols.push(colX,colAmbient,colTemp,colHum);
    
    return {
      data: {
        x: 'x',
        columns: cols,
        type: 'line'
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%d %H:%M'
          }
        }
      },
      subchart: {show: true},
    };
  }
});