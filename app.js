var SerialPort = require('serialport');
var port = new SerialPort(""+process.argv.slice(2));

var ProgressBar = require('progress');


var bar = new ProgressBar('  score [:bar] :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 200,
    total: 100
  });


console.log(process.argv.slice(2))
port.on('open', function() {
  port.write('main screen turn on', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
  });
});

// open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

port.on('data', function(data) {
  //console.log('Data: ', data);
  bar.tick(0.1);
})
