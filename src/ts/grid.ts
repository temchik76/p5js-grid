/**
 * grid.js
 * Grid for p5js
 *
 * @version 2.0.0
 * @author temchik76
 * @url https://github.com/temchik76/p5js-grid
 */

/// <reference path="../../node_modules/@types/p5/global.d.ts"/>

/**
 * Generic rectangle bounds class
 */
class Bounds {
  constructor(public x: number, public y: number, public w: number, public h: number) {}
  
  /**
   * is (x, y) inside this rectangle?
   */
  contains(x: number, y: number): boolean {
  	return x >= this.x && y >= this.y && x < this.x + this.w && y < this.y + this.h;
  }
  
  /**
   * center of the rectangle
   */
  center()/*: p5.Vector */ { // TODO: importing p5 breaks createVector and floor for some reason
  	return createVector(floor(this.x + this.w / 2), floor(this.y + this.h / 2));
  }
}

/**
 * private Grid cell class
 */
class _GridCell {
  constructor(readonly col: number, readonly row: number, public bounds: Bounds = null) {}
}

/**
 * Grid
 */
class Grid {
  private headerRow: number;
  private headerCol: number;
  private cellWidth: number;
  private cellHeight: number;
  private cells: _GridCell[][];
  private eventHandlers: Map<string, Function>;
  private mouseIn: _GridCell;

  /**
   * @param cols number of columns
   * @param rows number of rows
   * @param bounds Bounds rectangle of the grid
   * @param enableHeaderRow grid has header row?
   * @param enableHeaderCol grid has header col?
   */
  constructor(readonly cols: number, readonly rows: number, private bounds: Bounds, 
              readonly enableHeaderRow: boolean = false,
              readonly enableHeaderCol: boolean = false) {
    this.headerRow = enableHeaderRow ? 1 : 0;
    this.headerCol = enableHeaderCol ? 1 : 0;

    this.cellWidth = floor(this.bounds.w / (this.cols + this.headerCol));
    this.cellHeight = floor(this.bounds.h / (this.rows + this.headerRow));

    this.eventHandlers = new Map<string, Function>();

    this.initCells();
    this.recalculateBounds();
  }

  /**
   * Initialize cells array
   */
  private initCells(): void {
    this.cells = [];
    for (let col = 0; col < this.cols + this.headerCol; col ++) {
      this.cells[col] = [];
      for (let row = 0; row < this.rows + this.headerRow; row ++) {
        this.cells[col][row] = new _GridCell(col - this.headerCol, row - this.headerRow);
      }
    }
  }

  /**
   * Calculate bounds of each cell and headers
   */
  private recalculateBounds(): void {
    for (let col = 0; col < this.cols + this.headerRow; col++) {
      for (let row = 0; row < this.rows + this.headerRow; row++) {
        this.cells[col][row].bounds = this.cellBounds(col, row);
      }
    }
  }

  /**
   * Calculate cell bounds of a col/row (absolute, including headers)
   */
  private cellBounds(col: number, row: number): Bounds {
    return new Bounds(this.bounds.x + col * this.cellWidth,
      				  this.bounds.y + row * this.cellHeight,
      				  this.cellWidth,
      				  this.cellHeight);
  }

  /**
   * Move/Resize and recalculate
   */
  resize(bounds: Bounds): void {
  	this.bounds = bounds;
  	this.recalculateBounds();
  }
  
  /**
   * Draw the grid
   */
  draw(): void {
    this.fireEvent('beforeDraw');

    for (let col: number = 0; col < this.cols + this.headerCol; col++) {
      for (let row: number = 0; row < this.rows + this.headerRow; row++) {
        let cell = this.cells[col][row];
        this.fireEvent('draw', cell.col, cell.row, cell.bounds);
      }
    }

    this.fireEvent('afterDraw');
  }

  mouseClicked() {
    if (this.bounds.contains(mouseX, mouseY)) {
      let cell = this.cellAt(mouseX, mouseY);

      this.fireEvent('mouseClick', cell.col, cell.row);
    } 
  }
  
  mouseMoved() {
    if (this.mouseIn && !this.mouseIn.bounds.contains(mouseX, mouseY)) {
      this.fireEvent('mouseOut', this.mouseIn.col, this.mouseIn.row);
      this.mouseIn = null;
    }
  
    if (this.bounds.contains(mouseX, mouseY) && !this.mouseIn) {
      this.mouseIn = this.cellAt(mouseX, mouseY);
      this.fireEvent('mouseIn', this.mouseIn.col, this.mouseIn.row);
    }
  }
  
  mousePressed() {
    if (this.bounds.contains(mouseX, mouseY)) {
      let cell = this.cellAt(mouseX, mouseY);

      this.fireEvent('mousePress', cell.col, cell.row);
    } 
  }
  
  mouseReleased() {
    if (this.bounds.contains(mouseX, mouseY)) {
      let cell = this.cellAt(mouseX, mouseY);

      this.fireEvent('mouseRelease', cell.col, cell.row);
    } 
  }
  
  private colAt(x: number): number {
    return floor((this.bounds.x + x) / this.cellWidth);
  }

  private rowAt(y: number): number {
    return floor((this.bounds.y + y) / this.cellHeight);
  }

  private cellAt(x: number, y: number): _GridCell {
    return this.bounds.contains(x, y) ? this.cells[this.colAt(x)][this.rowAt(y)] : undefined;
  }

  on(evt: string, fn: Function): Grid {
    this.eventHandlers.set(evt, fn);
    return this;
  }

  private fireEvent(evt: string, ...params: any[]): void {
    let fn: Function = this.eventHandlers.get(evt);
    if (fn) {
      fn(...params);
    }
  }
}