// setting constants
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = { left: 50, right: 50, top: 50, bottom: 50 };

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

// frame
let frame = d3
  .select("#frame")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame")
  .append("g")
  .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")");

// defining scales for the bar chart
let xScale = d3.scaleBand().range([0, VIS_WIDTH]).padding(0.4);
let yScale = d3.scaleLinear().range([VIS_HEIGHT, 0]);

// reading in data
d3.csv("data/data.csv").then((data) => {
  console.log(data);

  // specifying the domain for the data
  xScale.domain(
    data.map(function (d) {
      return d.Category;
    })
  );
  yScale.domain([
    0,
    d3.max(data, function (d) {
      return d.Value;
    }),
  ]);

  // adding the bars
  frame
    .selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (d) {
      return xScale(d.Category);
    })
    .attr("y", function (d) {
      return yScale(d.Value);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      return VIS_HEIGHT - yScale(d.Value);
    })
    .attr("fill", "pink");

  // add the x axis
  frame
    .append("g")
    .attr("transform", "translate(0," + VIS_WIDTH + ")")
    .call(d3.axisBottom(xScale));

  // add the y axis
  frame.append("g").call(d3.axisLeft(yScale));
});
