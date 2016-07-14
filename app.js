var SerialPort = require('serialport');
var portDKJ = new SerialPort('/dev/tty.usbmodem1411')
// var portWIO = new SerialPort('/dev/tty.usbmodem1421')

portDKJ.on('open', function() {
 portDKJ.write('main screen turn on', function(err) {
   if (err) {
     return console.log('Error on write: ', err.message);
   }
 });
});

// open errors will be emitted as an error event
portDKJ.on('error', function(err) {
 console.log('Error: ', err.message);
})

portDKJ.on('data', function(data) {
 console.log('Data: ', data);
})



// portWIO.on('open', function() {
//  portWIO.write('main screen turn on', function(err) {
//    if (err) {
//      return console.log('Error on write: ', err.message);
//    }
//  });
// });

// // open errors will be emitted as an error event
// portWIO.on('error', function(err) {
//  console.log('Error: ', err.message);
// })

// portWIO.on('data', function(data) {
//  console.log('Data: ', data);
// })