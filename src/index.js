require('../scss/index.scss');

const {renderPath, renderProgress} = require('./renderer');
const {displaceMidpoints} = require('./landscape');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

let playState = 'running';
let path = [0, 0];
let iterations = 0;

loop();
render();

document.getElementById('play').addEventListener('click', () => {
  playState = playState === 'running' ? 'paused' : 'running';
});

document.getElementById('reset').addEventListener('click', () => {
  path = [0, 0];
  iterations = 0;
});

function loop() {
  const iterationsLimit = Number(document.getElementById('iterations').value);

  if (playState === 'running' && iterations < iterationsLimit) {
    path = displaceMidpoints(path);
    iterations += 1;
  }

  const fps = Number(document.getElementById('fps').value) || 15;
  setTimeout(loop, 1000 / fps);
}

function render() {
  window.requestAnimationFrame(render);

  ctx.clearRect(0, 0, width, height);
  renderPath(ctx, width, height, path);

  const iterationsLimit = Number(document.getElementById('iterations').value);
  renderProgress(ctx, width, height, iterations, iterationsLimit);
}
