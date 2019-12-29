/// <reference path="../../node_modules/@types/p5/global.d.ts"/>

const GRID_SIZE = 60;

var grid;

// cells, 1 = alive, 0 = dead
let cells = [];

function drawGridCell(col, row, bounds) {
  let val = cell(col, row);

  if (val) {
    fill(255);
  } else {
  	fill(0);
  }

  noStroke();

  rect(bounds.x + 1, bounds.y + 1, bounds.w - 1, bounds.h - 1);
}

function cell(col, row) {
	return col >= 0 && col < GRID_SIZE && row >= 0 && row < GRID_SIZE ? cells[col][row] : 0;
}

function neighbors(col, row) {
  let count = 0;
  
  count += cell(col - 1, row - 1);
  count += cell(col    , row - 1);
  count += cell(col + 1, row - 1);
  count += cell(col - 1, row    );
  count += cell(col    , row    );
  count += cell(col + 1, row    );
  count += cell(col - 1, row + 1);
  count += cell(col    , row + 1);
  count += cell(col + 1, row + 1);

  return count;
}

// one tick of GOL
function tick() {
   let newcells = new Array(GRID_SIZE).fill(undefined).map(() => new Array(GRID_SIZE).fill(0));

   for (let col = 0; col < GRID_SIZE; col++) {
	  for (let row = 0; row < GRID_SIZE; row++) {
	   // calculate all alive cells in and around this one
	   let neighborhood = neighbors(col, row);
	   
	   // if exactly 3 this cell will be alive
	   // if exactly 4 this cell keeps its state
	   // otherwise it's dead
	   if (neighborhood == 3) {
	     newcells[col][row] = 1;
	   } else if (neighborhood == 4) {
	     newcells[col][row] = cells[col][row];
	   } /*else {
	     newcells[col][row] = 0;
     }*/
    }
   }
   
   cells = newcells;
}

function setup() {
  createCanvas(600, 600);

  grid = new Grid(GRID_SIZE, GRID_SIZE, new Bounds(0, 0, width, height), drawGridCell);

  cells = new Array(GRID_SIZE).fill(undefined).map(() => new Array(GRID_SIZE).fill(undefined).map(() => 
              floor(random((2)))));
}

function draw() {
  background(0);

  grid.draw();
  
  tick();
}