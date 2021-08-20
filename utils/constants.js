const COLS_LABELS = [
  'M',
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  'N',
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  'M',
];

const CELL_SIZE = 42;
const CELL_WIDTH = CELL_SIZE;
const CELL_HEIGHT = CELL_SIZE;

export const MARGIN = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};
export const ROWS = 4;
export const COLS = COLS_LABELS.length;

export const WIDTH = COLS * CELL_WIDTH - MARGIN.left - MARGIN.right;
export const HEIGHT = ROWS * CELL_HEIGHT - MARGIN.top - MARGIN.bottom;
