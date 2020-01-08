/// <reference path="../../node_modules/@types/p5/global.d.ts"/>
/// <reference path="../../src/ts/grid.ts"/>

var grid;
var highlighted = null;
var selected = null;

function setup() {
  createCanvas(420, 420);

  grid = new Grid(6, 6, new Bounds(0, 0, width, height), true, true)
      .on('draw', drawCell)
      .on('mouseIn', function(col, row) {
        highlighted = {col: col, row: row};
      })
      .on('mouseOut', function(col, row) {
        highlighted = null;
      })
      .on('mouseClicked', function(col, row) {
        if (selected && selected.col == col && selected.row == row) {
          selected = null;
        } else {
          selected = {col: col, row: row};
        }
      });
}

function draw() {
  background(0);
  grid.draw();
}

function mouseMoved() {
  grid.mouseMoved(mouseX, mouseY);
}

function mouseClicked() {
  grid.mouseClicked(mouseX, mouseY);
}

function drawCell(col, row, bounds) {

  if (col != -1 && row != -1) {
    stroke(255);
  }
  else {
    noStroke();
  }
 
  if (selected && (selected.row != -1 && selected.col != -1) && 
      (selected.row == row && selected.col == col)) {
    fill(200);
  } else if (highlighted && (highlighted.row != -1 && highlighted.col != -1) && 
      (highlighted.row == row || highlighted.col == col)) {
    fill(50);
  } else {
    noFill();
  }  

  rect(bounds.x, bounds.y, bounds.w, bounds.h);

  stroke(255);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(18);

  text(`${col}, ${row}`, bounds.x + bounds.w / 2, bounds.y + bounds.h / 2);
}
