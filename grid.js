/**
 * grid.js
 * Grid for p5js
 *
 * @version 0.0.4
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
  
  center() {
  	return createVector(floor(x + w / 2), floor(y + h / 2));
  }
}

/**
 * Grid
 */
class Grid {
  constructor(cols, rows, bounds, 
               drawGridCell, drawHeaderRow, drawHeaderCol) {
    this.cols = cols;
    this.rows = rows;

    this.headerRow = drawHeaderRow ? 1 : 0;
    this.headerCol = drawHeaderCol ? 1 : 0;

    this.bounds = bounds;

    this.drawGridCell = drawGridCell;
    this.drawHeaderRow = drawHeaderRow;
    this.drawHeaderCol = drawHeaderCol;
    
    this.cellWidth = Math.floor(this.bounds.w / (this.cols + this.headerCol));
    this.cellHeight = Math.floor(this.bounds.h / (this.rows + this.headerRow));

    this.recalculateBounds();
  }

  resize(bounds) {
  	this.bounds = bounds;
  	this.recalculateBounds();
  }
  
  recalculateBounds() {
    this.headerColCells = [];
    if (this.headerCol) {
      for (let row = this.headerRow; row < this.rows + this.headerRow; row++) {
        this.headerColCells[row - this.headerRow] = this.cellBounds(0, row);
      }
    }

    this.headerRowCells = [];
    if (this.headerRow) {
      for (let col = this.headerCol; col < this.cols + this.headerCol; col++) {
        this.headerRowCells[col - this.headerCol] = this.cellBounds(col, 0);
      }
    }

    this.cells = [];
    for (let col = this.headerCol; col < this.cols + this.headerCol; col++) {
      this.cells[col - this.headerCol] = [];
      for (let row = this.headerRow; row < this.rows + this.headerRow; row++) {
        this.cells[col - this.headerCol][row - this.headerRow] = this.cellBounds(col, row);
      }
    }
  }

  cellBounds(col, row) {
    return new Bounds(col * this.cellWidth,
      row * this.cellHeight,
      this.cellWidth,
      this.cellHeight);
  }

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