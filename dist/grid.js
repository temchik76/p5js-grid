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
        return createVector(floor(this.x + this.w / 2), floor(this.y + this.h / 2));
    }
}
/**
 * Grid cell
 */
class _GridCell {
    constructor(col, row, bounds = null) {
        this.col = col;
        this.row = row;
        this.bounds = bounds;
    }
    isHeaderCorner() {
        return this.col == -1 && this.row == -1;
    }
    isHeaderCol() {
        return this.col == -1;
    }
    isHeaderRow() {
        return this.row == -1;
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
     * @param enableHeaderRow grid has header row?
     * @param enableHeaderCol grid has header col?
     */
    constructor(cols, rows, bounds, enableHeaderRow = false, enableHeaderCol = false) {
        this.cols = cols;
        this.rows = rows;
        this.bounds = bounds;
        this.enableHeaderRow = enableHeaderRow;
        this.enableHeaderCol = enableHeaderCol;
        this.headerRow = enableHeaderRow ? 1 : 0;
        this.headerCol = enableHeaderCol ? 1 : 0;
        this.cellWidth = floor(this.bounds.w / (this.cols + this.headerCol));
        this.cellHeight = floor(this.bounds.h / (this.rows + this.headerRow));
        this.eventHandlers = new Map();
        this.initCells();
        this.recalculateBounds();
    }
    rowAt(y) {
        return floor((this.bounds.y + y) / this.cellHeight);
    }
    cellAt(x, y) {
        return this.bounds.contains(x, y) ? this.cells[this.colAt(x)][this.rowAt(y)] : undefined;
    }
    /**
     * Initialize cells array
     */
    initCells() {
        this.cells = [];
        for (let col = 0; col < this.cols + this.headerCol; col++) {
            this.cells[col] = [];
            for (let row = 0; row < this.rows + this.headerRow; row++) {
                this.cells[col][row] = new _GridCell(col - this.headerCol, row - this.headerRow);
            }
        }
    }
    /**
     * Calculate bounds of each cell and headers
     */
    recalculateBounds() {
        for (let col = 0; col < this.cols + this.headerRow; col++) {
            for (let row = 0; row < this.rows + this.headerRow; row++) {
                this.cells[col][row].bounds = this.cellBounds(col, row);
            }
        }
    }
    /**
     * Calculate cell bounds of a col/row (absolute, including headers)
     */
    cellBounds(col, row) {
        return new Bounds(this.bounds.x + col * this.cellWidth, this.bounds.y + row * this.cellHeight, this.cellWidth, this.cellHeight);
    }
    /**
     * Move/Resize and recalculate
     */
    resize(bounds) {
        this.bounds = bounds;
        this.recalculateBounds();
    }
    /**
     * Draw the grid
     */
    draw() {
        this.fireEvent('beforeDraw');
        for (let col = 0; col < this.cols + this.headerCol; col++) {
            for (let row = 0; row < this.rows + this.headerRow; row++) {
                let cell = this.cells[col][row];
                if (cell.isHeaderCorner()) {
                    this.fireEvent('drawHeaderCorner', cell.bounds);
                }
                else if (cell.isHeaderCol()) {
                    this.fireEvent('drawHeaderCol', cell.row, cell.bounds);
                }
                else if (cell.isHeaderRow()) {
                    this.fireEvent('drawHeaderRow', cell.col, cell.bounds);
                }
                else {
                    this.fireEvent('drawCell', cell.col, cell.row, cell.bounds);
                }
            }
        }
        this.fireEvent('afterDraw');
    }
    mouseClicked() {
        if (this.bounds.contains(mouseX, mouseY)) {
            //this.fireEvent('click')
        }
    }
    mouseMoved() {
        if (this.bounds.contains(mouseX, mouseY)) {
            //this.fireEvent('click')
        }
    }
    mousePressed() {
        if (this.bounds.contains(mouseX, mouseY)) {
            //this.fireEvent('click')
        }
    }
    mouseReleased() {
        if (this.bounds.contains(mouseX, mouseY)) {
            //this.fireEvent('click')
        }
    }
    mouseDragged() {
    }
    colAt(x) {
        return floor((this.bounds.x + x) / this.cellWidth);
    }
    on(evt, fn) {
        this.eventHandlers.set(evt, fn);
        return this;
    }
    fireEvent(evt, ...params) {
        let fn = this.eventHandlers.get(evt);
        if (fn) {
            fn(...params);
        }
    }
}
