const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = { left: 50, right: 50, top: 50, bottom: 50 };

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

let frame = d3
  .select("#frame")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame");

d3.csv("data/data.csv").then((data) => {
  console.log(data);

  const MAX_VAL = d3.max(data, (d) => {
    return parseInt(d.Value);
  });

  const VAL_SCALE = d3.scaleLinear().domain([0, MAX_VAL]).range([0, VIS_WIDTH]);

  frame
    .selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("width", 50)
    .attr("height", (d) => {
      return VAL_SCALE(d.Value) + MARGINS.top;
    })
    .attr("x", 10 + MARGINS.left)
    .attr("y", VIS_HEIGHT - MARGINS.bottom - MARGINS.top)
    .attr("fill", "pink")
    .attr("class", "bar");

  frame
    .append("g")
    .attr(
      "transform",
      "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top + ")")
    )
    .call(d3.axisBottom(VAL_SCALE).ticks(4))
    .attr("font-size", "20px");
});
