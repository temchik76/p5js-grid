/// <reference path="../../node_modules/@types/p5/global.d.ts"/>
/// <reference path="../../src/ts/grid.ts"/>

var grid;

function drawGridCell(col, row, bounds) {
  noFill();
  stroke(255);
  rect(bounds.x, bounds.y, bounds.w, bounds.h);

  noStroke();
  fill(random(255), random(255), random(255));
  rect(bounds.x, bounds.y, bounds.w, bounds.h);
}

let origX;
let origY;
let mouseDownX = -1;
let mouseDownY = -1;
let offsetX;
let offsetY;

function mousePressed() {
  if (grid.bounds.contains(mouseX, mouseY)) {
    mouseDownX = mouseX;
    mouseDownY = mouseY;
    origX = grid.bounds.x;
    origY = grid.bounds.y;
  } else {
    mouseDownX = -1;
    mouseDownY = -1;
  }  
}

function mouseDragged() {
  if (mouseDownX != -1 && mouseDownY != -1) {
    offsetX = mouseX - mouseDownX;
    offsetY = mouseY - mouseDownY;
  
    grid.resize(new Bounds(origX + offsetX, origY + offsetY, grid.bounds.w, grid.bounds.h));
  }
}

function mouseReleased() {
  mouseDownX = -1;
  mouseDownY = -1;
}

function setup() {
  createCanvas(420, 420);

  grid = new Grid(6, 6, new Bounds(0, 0, 120, 120))
    .on('drawCell', drawGridCell);
}

function draw() {
  background(0);
  grid.draw();
}