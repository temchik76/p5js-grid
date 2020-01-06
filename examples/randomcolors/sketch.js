/// <reference path="../../node_modules/@types/p5/global.d.ts"/>
/// <reference path="../../src/ts/grid.ts"/>

var grid;

function setup() {
  createCanvas(420, 420);

  grid = new Grid(6, 6, new Bounds(0, 0, width, height), true, true)
      .on('drawHeaderCol', drawGridHeader)
      .on('drawHeaderRow', drawGridHeader)
      .on('drawCell', drawGridCell);
}

function draw() {
  background(0);
  grid.draw();
}

function drawGridHeader(pos, bounds) {
  stroke(255);
  noFill();
  textAlign(CENTER, CENTER);
  textSize(18);
  text(pos + 1, bounds.x + bounds.w / 2, bounds.y + bounds.h / 2);
}

function drawGridCell(col, row, bounds) {
  noFill();
  stroke(255);
  rect(bounds.x, bounds.y, bounds.w, bounds.h);

  noStroke();
  fill(random(255), random(255), random(255));
  rect(bounds.x, bounds.y, bounds.w, bounds.h);
}
