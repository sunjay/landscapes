export function renderPath(ctx, width, height, path) {
  // Define coordinate system
  // Factor is used to define the direction of the positive coordinates
  // and the scale of the drawing
  const xaxis = {ref: 0, factor: 1};
  const yaxis = {ref: Math.floor(height / 2), factor: -15};

  const xCoord = (v) => v * xaxis.factor + xaxis.ref;
  const yCoord = (v) => v * yaxis.factor + yaxis.ref;

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#2196f3';

  const step = width / (path.length - 1);
  drawPath(ctx, path.map((y, i) => ({x: xCoord(step * i), y: yCoord(y)})));
}

export function renderProgress(ctx, width, height, completed, total) {
  const size = 28;
  const padding = 10;
  ctx.font = `${size}px "Open Sans"`;
  ctx.fillText(`${completed} / ${total}`, padding, height - size/2);
}

function drawPath(ctx, coordinates) {
  ctx.beginPath();
  ctx.moveTo(coordinates[0].x, coordinates[0].y);

  for (const {x, y} of coordinates.slice(1)) {
    ctx.lineTo(x, y);
  }

  ctx.stroke();
}
