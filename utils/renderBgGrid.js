import * as d3 from 'd3';

import { COLS, WIDTH } from './constants.js';

function renderBgGrid(svg, scale) {
  const dividersScale = d3
    .scaleLinear()
    .domain([0, COLS * 2])
    .range([0, WIDTH]);

  const dividers = d3
    .axisBottom(dividersScale)
    .ticks(COLS * 3)
    .tickSize(-5)
    .tickFormat(() => '');

  const dividersLarge = d3
    .axisBottom(scale.x)
    .ticks(COLS * 2)
    .tickSize(-15)
    .tickFormat(() => '');

  for (let i = 0; i < 4; i += 1) {
    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${scale.y(i)})`)
      .call(dividers);

    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${scale.y(i)})`)
      .call(dividersLarge);
  }
}

export default renderBgGrid;
