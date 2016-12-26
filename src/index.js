require('../scss/index.scss');

const {renderPath, renderProgress} = require('./renderer');
const {displaceMidpoints} = require('./landscape');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

let playState = 'running';
let path = [0, 0];
let iteration = 0;

loop();
render();

document.getElementById('play').addEventListener('click', () => {
  playState = playState === 'running' ? 'paused' : 'running';
});

document.getElementById('reset').addEventListener('click', reset);

document.getElementById('iterations').addEventListener('input', (e) => {
  document.getElementById('iterations-value').value = e.target.value;
  reset();
});

document.getElementById('fps').addEventListener('input', (e) => {
  document.getElementById('fps-value').value = e.target.value;
});

function loop() {
  const iterationLimit = Number(document.getElementById('iterations').value);

  if (playState === 'running' && iteration < iterationLimit) {
    path = displaceMidpoints(path, iteration, width, height);
    iteration += 1;
  }

  const fps = Number(document.getElementById('fps').value) || 15;
  setTimeout(loop, 1000 / fps);
}

function reset() {
  path = [0, 0];
  iteration = 0;
}

function render() {
  window.requestAnimationFrame(render);

  ctx.clearRect(0, 0, width, height);
  renderPath(ctx, width, height, path);

  const iterationLimit = Number(document.getElementById('iterations').value);
  renderProgress(ctx, width, height, iteration, iterationLimit);
}
