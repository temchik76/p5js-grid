let grid;

function renderGridHeader(pos, bounds) {
  stroke(255);
  noFill();
  textAlign(CENTER, CENTER);
  textSize(18);
  text(pos + 1, bounds.x + bounds.w / 2, bounds.y + bounds.h / 2);
}

function renderGridCell(col, row, bounds) {
  defaultRenderGridCell(col, row, bounds);

  noStroke();
  fill(random(255), random(255), random(255));
  rect(bounds.x, bounds.y, bounds.w, bounds.h);
}

function setup() {
  createCanvas(420, 420);

  grid = new Grid(6, 6, 1, 1, new Bounds(0, 0, width, height),
                 renderGridCell, renderGridHeader, renderGridHeader);
}

function draw() {
  background(0);
  grid.draw();
}