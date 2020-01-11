/**
 * grid.js
 * Grid for p5js
 *
 * @version 2.0.2
 * @author temchik76
 * @url https://github.com/temchik76/p5js-grid
 */
/**
 * Grid
 */
var Grid = /** @class */ (function () {
    /**
     * @param cols number of columns
     * @param rows number of rows
     * @param bounds Bounds rectangle of the grid
     * @param enableHeaderRow grid has header row?
     * @param enableHeaderCol grid has header col?
     */
    function Grid(cols, rows, bounds, enableHeaderRow, enableHeaderCol) {
        if (enableHeaderRow === void 0) { enableHeaderRow = false; }
        if (enableHeaderCol === void 0) { enableHeaderCol = false; }
        this.cols = cols;
        this.rows = rows;
        this.bounds = bounds;
        this.enableHeaderRow = enableHeaderRow;
        this.enableHeaderCol = enableHeaderCol;
        this.mouseIn = null;
        this.headerRow = enableHeaderRow ? 1 : 0;
        this.headerCol = enableHeaderCol ? 1 : 0;
        this.cellWidth = Math.floor(this.bounds.w / (this.cols + this.headerCol));
        this.cellHeight = Math.floor(this.bounds.h / (this.rows + this.headerRow));
        this.eventHandlers = {};
        this.initCells();
        this.recalculateBounds();
    }
    /**
     * Register event handler
     *
     * @param evt event code
     * @param fn function
     */
    Grid.prototype.on = function (evt, fn) {
        this.eventHandlers[evt] = fn;
        return this;
    };
    /**
     * Move/Resize and recalculate
     */
    Grid.prototype.resize = function (bounds) {
        this.bounds = bounds;
        this.recalculateBounds();
    };
    /**
     * Draw the grid
     */
    Grid.prototype.draw = function () {
        for (var col = 0; col < this.cols + this.headerCol; col++) {
            for (var row = 0; row < this.rows + this.headerRow; row++) {
                var cell = this.cells[col][row];
                this.fireEvent('draw', cell.col, cell.row, cell.bounds);
            }
        }
    };
    /**
     * Call this from p5 mouseClicked() if you want to receive mouseClick cell events
     */
    Grid.prototype.mouseClicked = function (x, y) {
        if (this.bounds.contains(x, y)) {
            var cell = this.cellAt(x, y);
            this.fireEvent('mouseClicked', cell.col, cell.row);
        }
    };
    /**
     * Call this from p5 mouseMoved() if you want to receive mouseIn/mouseOut cell events
     */
    Grid.prototype.mouseMoved = function (x, y) {
        if (this.mouseIn && !this.mouseIn.bounds.contains(x, y)) {
            this.fireEvent('mouseOut', this.mouseIn.col, this.mouseIn.row);
            this.mouseIn = null;
        }
        if (this.bounds.contains(x, y) && !this.mouseIn) {
            this.mouseIn = this.cellAt(x, y);
            this.fireEvent('mouseIn', this.mouseIn.col, this.mouseIn.row);
        }
    };
    /**
     * Call this from p5 mousePressed() if you want to receive mousePress cell events
     */
    Grid.prototype.mousePressed = function (x, y) {
        if (this.bounds.contains(x, y)) {
            var cell = this.cellAt(x, y);
            this.fireEvent('mousePressed', cell.col, cell.row);
        }
    };
    /**
     * Call this from p5 mouseReleased() if you want to receive mouseRelease cell events
     */
    Grid.prototype.mouseReleased = function (x, y) {
        if (this.bounds.contains(x, y)) {
            var cell = this.cellAt(x, y);
            this.fireEvent('mouseReleased', cell.col, cell.row);
        }
    };
    /**
     * Initialize cells array, col/row are translated to include headers
     */
    Grid.prototype.initCells = function () {
        this.cells = [];
        for (var col = 0; col < this.cols + this.headerCol; col++) {
            this.cells[col] = [];
            for (var row = 0; row < this.rows + this.headerRow; row++) {
                this.cells[col][row] = new _GridCell(col - this.headerCol, row - this.headerRow);
            }
        }
    };
    /**
     * Calculate bounds of each cell and headers
     */
    Grid.prototype.recalculateBounds = function () {
        for (var col = 0; col < this.cols + this.headerRow; col++) {
            for (var row = 0; row < this.rows + this.headerRow; row++) {
                this.cells[col][row].bounds = this.cellBounds(col, row);
            }
        }
    };
    /**
     * Calculate cell bounds of a col/row (absolute, including headers)
     */
    Grid.prototype.cellBounds = function (col, row) {
        return new Bounds(this.bounds.x + col * this.cellWidth, this.bounds.y + row * this.cellHeight, this.cellWidth, this.cellHeight);
    };
    /**
     * calculate column at a given x coordinate
     * @param x x coordinate
     */
    Grid.prototype.colAt = function (x) {
        return Math.floor((this.bounds.x + x) / this.cellWidth);
    };
    /**
     * calculate row at a given y coordinate
     * @param y y coordinate
     */
    Grid.prototype.rowAt = function (y) {
        return Math.floor((this.bounds.y + y) / this.cellHeight);
    };
    /**
     * Find a cell at x,y coordinates
     * @param x
     * @param y
     */
    Grid.prototype.cellAt = function (x, y) {
        return this.bounds.contains(x, y) ? this.cells[this.colAt(x)][this.rowAt(y)] : undefined;
    };
    /**
     * Fire event to listener
     * @param evt event code
     * @param params varargs callback parameters
     */
    Grid.prototype.fireEvent = function (evt) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var fn = this.eventHandlers[evt];
        if (fn) {
            fn.apply(void 0, params);
        }
    };
    return Grid;
}());
/**
 * Generic rectangle bounds class
 */
var Bounds = /** @class */ (function () {
    function Bounds(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    /**
     * is (x, y) inside this rectangle?
     */
    Bounds.prototype.contains = function (x, y) {
        return x >= this.x && y >= this.y && x < this.x + this.w && y < this.y + this.h;
    };
    return Bounds;
}());
/**
 * private Grid cell class
 */
var _GridCell = /** @class */ (function () {
    /**
     * col/row are "logical" values, -1 being header cells
     * @param col logical column
     * @param row logical row
     * @param bounds bounds of the cell
     */
    function _GridCell(col, row, bounds) {
        if (bounds === void 0) { bounds = null; }
        this.col = col;
        this.row = row;
        this.bounds = bounds;
    }
    return _GridCell;
}());
