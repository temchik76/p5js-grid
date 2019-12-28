# Simple Grid drawing for p5js

Include grid.js in your sketch html file

```
<script src="https://cdn.jsdelivr.net/gh/temchik76/p5js-grid@0.0.5/grid.js"></script>
```

define cell and (optionally) headers draw functions

```
function drawHeaderRow(pos, bounds) {
}
```

```
function drawHeaderCol(pos, bounds) {
}
```

```
function drawCell(col, row, bounds) {
}
```

create the grid in `setup()` passing the draw functions. Omitting header draw functions will disable header row/column

```
let grid;

function setup() {
  ...
  grid = new Grid(6, 6, new Bounds(0, 0, width, height),
                 drawCell, drawHeaderRow, drawHeaderCol);
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
