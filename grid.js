/**
 * grid.js
 * Grid for p5js
 *
 * @version 0.0.5
 * @author temchik76
 * @url https://github.com/temchik76/p5js-grid-js
 */

/**
 * Generic rectangle bounds class
 */
class Bounds {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  
  /**
   * is (x, y) inside this rectangle?
   */
  contains(x, y) {
  	return x >= this.x && y >= this.y && x < this.x + this.w && y < this.y + this.h;
  }
  
  /**
   * center of the rectangle
   */
  center() {
  	return createVector(floor(x + w / 2), floor(y + h / 2));
  }
}

/**
 * Grid
 */
class Grid {
  /**
   * @param cols number of columns
   * @param rows number of rows
   * @param bounds Bounds rectangle of the grid
   * @param drawGridCell function to draw the grid cells, takes (col, row, bounds) parameters
   * @param drawHeaderRow function to draw the grid header row, takes (pos, bounds) parameters. If unspecified no header row is shown
   * @param drawHeaderCol function to draw the grid header column, takes (pos, bounds) parameters. If unspecified no header column is shown
   */
  constructor(cols, rows, bounds /* Bounds */, 
              drawGridCell /* function(col, row, bounds) */, drawHeaderRow /* function(pos, bounds) */, drawHeaderCol /* function(pos, bounds) */) {
    this.cols = cols;
    this.rows = rows;

    this.bounds = bounds;

    this.drawGridCell = drawGridCell;
    this.drawHeaderRow = drawHeaderRow;
    this.drawHeaderCol = drawHeaderCol;
    
    this.headerRow = drawHeaderRow ? 1 : 0;
    this.headerCol = drawHeaderCol ? 1 : 0;

    this.cellWidth = floor(this.bounds.w / (this.cols + this.headerCol));
    this.cellHeight = floor(this.bounds.h / (this.rows + this.headerRow));

    this.recalculateBounds();
  }

  /**
   * Move/Resize and recalculate
   */
  resize(bounds) {
  	this.bounds = bounds;
  	this.recalculateBounds();
  }
  
  /**
   * Calculate bounds of each cell and headers
   */
  recalculateBounds() {
    this.headerColCells = [];
    if (this.headerCol) {
      for (let row = 0; row < this.rows; row++) {
        this.headerColCells[row] = this.cellBounds(0, row + this.headerRow);
      }
    }

    this.headerRowCells = [];
    if (this.headerRow) {
      for (let col = 0; col < this.cols; col++) {
        this.headerRowCells[col] = this.cellBounds(col + this.headerCol, 0);
      }
    }

    this.cells = [];
    for (let col = 0; col < this.cols; col++) {
      this.cells[col] = [];
      for (let row = 0; row < this.rows; row++) {
        this.cells[col][row] = this.cellBounds(col + this.headerCol, row + this.headerRow);
      }
    }
  }

  /**
   * Calculate cell bounds of a col/row (absolute, including headers)
   */
  cellBounds(col, row) {
    return new Bounds(this.bounds.x + col * this.cellWidth,
      				  this.bounds.y + row * this.cellHeight,
      				  this.cellWidth,
      				  this.cellHeight);
  }

  /**
   * Draw the grid
   */
  draw() {
    for (let col = 0; col < this.headerRowCells.length; col++) {
      this.drawHeaderRow(col, this.headerRowCells[col]);
    }

    for (let row = 0; row < this.headerColCells.length; row++) {
      this.drawHeaderCol(row, this.headerColCells[row]);
    }

    for (let col = 0; col < this.cols; col++) {
      for (let row = 0; row < this.rows; row++) {
        this.drawGridCell(col, row, this.cells[col][row]);
      }
    }
  }
}