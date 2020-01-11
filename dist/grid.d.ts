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
declare class Grid {
    readonly cols: number;
    readonly rows: number;
    private bounds;
    readonly enableHeaderRow: boolean;
    readonly enableHeaderCol: boolean;
    private headerRow;
    private headerCol;
    private cellWidth;
    private cellHeight;
    private cells;
    private eventHandlers;
    private mouseIn;
    /**
     * @param cols number of columns
     * @param rows number of rows
     * @param bounds Bounds rectangle of the grid
     * @param enableHeaderRow grid has header row?
     * @param enableHeaderCol grid has header col?
     */
    constructor(cols: number, rows: number, bounds: Bounds, enableHeaderRow?: boolean, enableHeaderCol?: boolean);
    /**
     * Register event handler
     *
     * @param evt event code
     * @param fn function
     */
    on(evt: string, fn: Function): Grid;
    /**
     * Move/Resize and recalculate
     */
    resize(bounds: Bounds): void;
    /**
     * Draw the grid
     */
    draw(): void;
    /**
     * Call this from p5 mouseClicked() if you want to receive mouseClick cell events
     */
    mouseClicked(x: number, y: number): void;
    /**
     * Call this from p5 mouseMoved() if you want to receive mouseIn/mouseOut cell events
     */
    mouseMoved(x: number, y: number): void;
    /**
     * Call this from p5 mousePressed() if you want to receive mousePress cell events
     */
    mousePressed(x: number, y: number): void;
    /**
     * Call this from p5 mouseReleased() if you want to receive mouseRelease cell events
     */
    mouseReleased(x: number, y: number): void;
    /**
     * Initialize cells array, col/row are translated to include headers
     */
    private initCells;
    /**
     * Calculate bounds of each cell and headers
     */
    private recalculateBounds;
    /**
     * Calculate cell bounds of a col/row (absolute, including headers)
     */
    private cellBounds;
    /**
     * calculate column at a given x coordinate
     * @param x x coordinate
     */
    private colAt;
    /**
     * calculate row at a given y coordinate
     * @param y y coordinate
     */
    private rowAt;
    /**
     * Find a cell at x,y coordinates
     * @param x
     * @param y
     */
    private cellAt;
    /**
     * Fire event to listener
     * @param evt event code
     * @param params varargs callback parameters
     */
    private fireEvent;
}
/**
 * Generic rectangle bounds class
 */
declare class Bounds {
    x: number;
    y: number;
    w: number;
    h: number;
    constructor(x: number, y: number, w: number, h: number);
    /**
     * is (x, y) inside this rectangle?
     */
    contains(x: number, y: number): boolean;
}
/**
 * private Grid cell class
 */
declare class _GridCell {
    readonly col: number;
    readonly row: number;
    bounds: Bounds;
    /**
     * col/row are "logical" values, -1 being header cells
     * @param col logical column
     * @param row logical row
     * @param bounds bounds of the cell
     */
    constructor(col: number, row: number, bounds?: Bounds);
}
