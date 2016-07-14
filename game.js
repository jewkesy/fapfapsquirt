A5.write(0); // GND
A7.write(1); // VCC
A6.write(0); // Turn on the backlight


var g; // Graphics - define globally, so it can be used by other functions
var pitches = {
  'a':220.00,
  'b':246.94,
  'c':261.63,
  'd':293.66,
  'e':329.63,
  'f':349.23,
  'g':392.00,
  'A':440.00,
  'B':493.88,
  'C':523.25,
  'D':587.33,
  'E':659.26,
  'F':698.46,
  'G':783.99
};

function step() {
  var ch = tune[pos];
  if (ch !== undefined) pos++;
  if (ch in pitches) freq(pitches[ch]);
  else freq(0); // off
}

var tune = "EE EE  E E AA    CC G G  ";
var pos = 0;
var i = 0;
var win = 10;

function onInit() {
  // Setup SPI
  var spi = new SPI();
  spi.setup({ sck:B1, mosi:B10 });
  // Initialise the LCD
  g = require("PCD8544").connect(spi,B13,B14,B15, function() {
    // When it's initialised, clear it and write some text
    g.clear();
    g.drawString('Hello World!',0,0);
    // send the graphics to the display
    g.flip();
  });
    i = 0;
    pos = 0;
}

onInit();

pinMode(B4, "input_pulldown");
var BUZZER = B7;

setWatch(function(e) {
  i++;
  if (i > win) return;
  if (!g) return; // graphics not initialised yet
  g.clear();
  if (i == win) {
    g.drawString('You Won!!! ' + i,0,0);
    digitalWrite(BUZZER, 0.5);
    setInterval(function(e) {
      //freq(1500);
      step(100);
    }, 100);


  }
  else
   g.drawString('Hello Fullstack! ' + i,0,0);
  // send the graphics to the display
  g.flip();
  console.log('pressed ', i);
}, B4, { repeat: true, debounce : 50, edge: "rising" });

setWatch(function(e) {
  console.log('BTN pressed');
  onInit();
}, BTN, { repeat: true, debounce : 50, edge: "rising" });

function freq(f) { 
  console.log('calling freq', f);
  if (f===0) digitalWrite(BUZZER,0);
  else analogWrite(BUZZER, 0.5, { freq: f } );
}