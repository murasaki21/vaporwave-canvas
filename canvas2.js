//toggle button vars
var bkgd1;
var bkgd2;
var gui;
var switchToDark;

//canvas vars
var canvas, stage;
var drawingCanvas;
var oldPt;
var oldMidPt;
var title;
var canvasColor;
var canvasStroke;
var colors;
var index;

//////toggle button code///////

function preload(){
  bkgd1 = loadImage("images/light_canvas.png");
  bkgd2 = loadImage("images/dark_canvas.png");
}

function setup() {
  createCanvas(1500, 800);
  image(bkgd1, 0, 0);
  gui = createGui();
  // Create toggle button (x,y,width,height)
  switchToDark = createToggle("Switch to Dark", 630, 5, 250, 40);
}

function draw() {
  background(7, 19, 105);
  drawGui();
  image(bkgd1, 0, 55);

  //button styling
  switchToDark.setStyle({
      //default button
      strokeWeight: 0,
      fillBgOff: color("#ddadff"),
      fillLabelOff: color("#FFFFFF"),
      rounding: 10,
      textSize: 15,
      font:'"Press Start 2P", cursive',

      //hover Button to Dark
      fillBgOffHover: color("#373fc4"),
      fillLabelOffHover: color("#FFFFFF"),

      //Shift to dark
      fillBgOffActive: color("#373fc4"),
      fillLabelOffActive: color("FFFFFF"),

      //Dark Mode On button
      fillBgOn: color("#373fc4"),
      fillLabelOn: color("#FFFFFF"),

      //hover Button to Light
      fillBgOnHover: color("#ddadff"),
      fillLabelOnHover: color("#FFFFFF"),

      //shift to light
      fillBgOnActive: color("#ddadff"),
      fillLabelOnActive: color("FFFFFF"),
  });

  if (switchToDark.isPressed) {
    switchToDark.labelOn = "Switch to Light";
  }

  if (switchToDark.val) {
    // switch to darkCanvas
    fill(255, 0, 0);
    image(bkgd2, 0, 55);
  }
}

/// Add these lines below sketch to prevent scrolling on mobile
function touchMoved() {
  // do some stuff
  return false;
}

///////Canvas code//////////

function init() {
  canvas = document.getElementById("Canvas");
  index = 0;
  colors = ["#f848fe", "#ddadff", "#ab12e2", "#4b08af", "#373fc4","black", "#4b8cfb", "#99B9FF", "white"];

  //check to see if we are running in a browser with touch support
  stage = new createjs.Stage(canvas);
  stage.autoClear = false;
  stage.enableDOMEvents(true);

  createjs.Touch.enable(stage);
  createjs.Ticker.framerate = 24;

  drawingCanvas = new createjs.Shape();

  stage.addEventListener("stagemousedown", handleMouseDown);
  stage.addEventListener("stagemouseup", handleMouseUp);

  //"Begin drawing" title styling and placement
  title = new createjs.Text("begin drawing", "30px 'Press Start 2P', cursive", "gray");
  title.x = 570;
  title.y = 300;
  stage.addChild(title);

  stage.addChild(drawingCanvas);
  stage.update();
}

function handleMouseDown(event) {
  if (!event.primary) {
    return;
  }
  if (stage.contains(title)) {
    stage.clear();
    stage.removeChild(title);
  }
  canvasColor = colors[(index++) % colors.length];
  canvasStroke = 10;
  oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
  oldMidPt = oldPt.clone();
  stage.addEventListener("stagemousemove", handleMouseMove);
}

function handleMouseMove(event) {
  if (!event.primary) {
    return;
  }
  var midPt = new createjs.Point(oldPt.x + stage.mouseX >> 1, oldPt.y + stage.mouseY >> 1);

  drawingCanvas.graphics.clear().setStrokeStyle(canvasStroke, 'square', 'square').beginStroke(canvasColor).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

  oldPt.x = stage.mouseX;
  oldPt.y = stage.mouseY;

  oldMidPt.x = midPt.x;
  oldMidPt.y = midPt.y;

  stage.update();
}

function handleMouseUp(event) {
  if (!event.primary) {
    return;
  }
  stage.removeEventListener("stagemousemove", handleMouseMove);
}
