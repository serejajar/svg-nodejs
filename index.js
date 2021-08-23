import fs from 'fs';
import { JSDOM } from 'jsdom';
import SVGtoPNG from 'convert-svg-to-png';
import * as d3 from 'd3';

import renderBgGrid from './utils/renderBgGrid.js';
import processRecords from './utils/processRecords.js';

import {
  HEIGHT,
  WIDTH,
  MARGIN,
  COLS,
  ROWS,
} from './utils/constants.js';

import data from './mocks/data.js';

const svg = renderGraph(data);

console.log(svg);

function renderGraph(data) {
  const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
  const body = dom.window.document.querySelector('body');

  const height = HEIGHT + MARGIN.top + MARGIN.bottom;
  const width = WIDTH + MARGIN.left + MARGIN.right;

  const svg = d3
    .select(body)
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMinYMin meet')
    // .attr('width', width)
    // .attr('height', height)
    .append('g')
    // .attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);

  const scale = {
    x: d3.scaleLinear().domain([0, COLS]).range([0, WIDTH]),
    y: d3.scaleLinear().domain([0, ROWS]).range([HEIGHT, 0]),
  };

  d3.axisTop(scale.x);
  d3.axisLeft(scale.y);

  const gridlinesX = d3
    .axisTop(scale.x)
    .ticks(COLS)
    .tickSize(-HEIGHT)
    .tickFormat(() => '');
  const gridlinesY = d3
    .axisLeft(scale.y)
    .ticks(ROWS)
    .tickSize(-WIDTH)
    .tickFormat(() => '');

  renderBgGrid(svg, scale);

  svg.append('g').attr('class', 'grid grid-y').call(gridlinesY);
  svg.append('g').attr('class', 'grid grid-x').call(gridlinesX);
  svg
    .append('rect')
    .attr('class', 'rect rect-d')
    .attr('x', scale.x(0))
    .attr('y', scale.y(ROWS - 2))
    .attr('width', scale.x(COLS))
    .attr('height', scale.y(ROWS - 1));
  svg
    .append('rect')
    .attr('class', 'rect rect-on')
    .attr('x', scale.x(0))
    .attr('y', scale.y(ROWS - 3))
    .attr('width', scale.x(COLS))
    .attr('height', scale.y(ROWS - 1));
  svg
    .append('rect')
    .attr('class', 'rect rect-violation')
    .attr('x', scale.x(7.5))
    .attr('y', scale.y(ROWS))
    .attr('width', scale.x(2.5))
    .attr('height', scale.y(0));

  renderLines(svg, scale, data);

  return body.innerHTML;
}

function renderLines(svg, scale, data) {
  const line = d3
    .line()
    .curve(d3.curveStepAfter)
    .x((d) => scale.x(d[0]))
    .y((d) => scale.y(d[1]));

  svg
    .selectAll('.line')
    .data([processRecords(data)])
    .enter()
    .append('path')
    .attr('class', 'segment')
    .attr('d', line);
}
