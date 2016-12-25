export function renderPath(ctx, width, height, path) {
  // Define coordinate system
  // Factor is used to define the direction of the positive coordinates
  // and the scale of the drawing
  const xaxis = {ref: 0, factor: 1};
  const yaxis = {ref: Math.floor(height / 2), factor: -1};

  const xCoord = (v) => v * xaxis.factor + xaxis.ref;
  const yCoord = (v) => v * yaxis.factor + yaxis.ref;

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#3e2723';
  ctx.fillStyle = '#795548';

  const step = width / (path.length - 1);
  const coords = path.map((y, i) => ({x: xCoord(step * i), y: yCoord(y)}));
  drawPath(ctx, coords, width, height);
}

export function renderProgress(ctx, width, height, completed, total) {
  const size = 24;
  const padding = 10;
  ctx.font = `${size}px "Open Sans"`;
  ctx.textAlign = 'end';
  ctx.fillStyle = 'black';
  ctx.fillText(`${completed} / ${total}`, width - padding, padding * 2 + size/2);
}

function drawPath(ctx, coordinates, width, height) {
  ctx.beginPath();
  ctx.moveTo(0, height);

  for (const {x, y} of coordinates) {
    ctx.lineTo(x, y);
  }

  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.fill();
  ctx.stroke();
}
