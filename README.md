# Simple Grid drawing for p5js

Include grid.js in your sketch html file

```
<script src="https://cdn.jsdelivr.net/gh/temchik76/p5js-grid@2.0.0/dist/grid.js"></script>
```

define cell and register event handlers

create the grid in `setup()`

```
let grid;

function drawCell(col, row, bounds) {
  // if you enabled headers then corresponding col / row will be -1 for headers  
}

function cellClicked(col, row) {
  
}

function setup() {
  ...
  grid = new Grid(6 /*columns*/, 6 /* rows */, new Bounds(0, 0, width, height), true /*enable header row*/, true /*enable header column*/)
            .on('draw', drawCell)
            .on('mouseClick', cellClicked);
   ...
}
```

then draw it

```
function draw() {
  ...
  grid.draw();
  ...
}
```

see examples
