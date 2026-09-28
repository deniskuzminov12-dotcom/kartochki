const LEVELS = [
  ["#######", "#     #", "# . $ #", "#   @ #", "#######"],
  ["########", "#  .   #", "#  $   #", "#      #", "#  $ .@#", "#      #", "########"],
  ["#########", "#   .   #", "# $ # $ #", "#   #   #", "# .   @ #", "#########"],
  ["#########", "# .     #", "# ###$  #", "#   $ . #", "#  @    #", "#########"],
  ["##########", "#   .    #", "# $###$  #", "#   @  . #", "#        #", "##########"],
  ["##########", "# .   .  #", "# $ # $  #", "#   @    #", "#        #", "##########"],
  ["##########", "#  .     #", "#  ###$  #", "#  $  .  #", "#   @    #", "##########"],
  ["###########", "# .     . #", "# $ ### $ #", "#   @     #", "#         #", "###########"],
  ["###########", "# .  #    #", "# $  # $ .#", "#    @    #", "#         #", "###########"],
  ["############", "# .   #   .#", "# $   # $  #", "#     @    #", "#          #", "############"]
];

const board = document.querySelector('#board');
const levelLabel = document.querySelector('#levelLabel');
const movesLabel = document.querySelector('#movesLabel');
const progressBar = document.querySelector('#progressBar');
const hint = document.querySelector('#hint');
const winDialog = document.querySelector('#winDialog');
const winMoves = document.querySelector('#winMoves');
const nextButton = document.querySelector('#nextButton');
const previousButton = document.querySelector('#previousButton');
const stateKey = 'kletki-sokoban-progress';
let levelIndex = 0;
let state;
let completed = Number(localStorage.getItem(stateKey) || 0);

function parseLevel(lines) {
  const width = Math.max(...lines.map(line => line.length));
  const cells = [];
  let player = null;
  for (let row = 0; row < lines.length; row += 1) {
    for (let col = 0; col < width; col += 1) {
      const char = lines[row][col] || '#';
      const cell = { row, col, wall: char === '#', goal: '.+*'.includes(char), box: '$*'.includes(char) };
      if ('@+'.includes(char)) player = { row, col };
      cells.push(cell);
    }
  }
  return { width, height: lines.length, cells, player, moves: 0 };
}

function loadLevel(index) {
  levelIndex = Math.max(0, Math.min(LEVELS.length - 1, index));
  state = parseLevel(LEVELS[levelIndex]);
  winDialog.hidden = true;
  render();
}

function cellAt(row, col) { return state.cells.find(cell => cell.row === row && cell.col === col); }

function move(direction) {
  const deltas = { up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] };
  const [dr, dc] = deltas[direction] || [];
  if (dr === undefined || winDialog.hidden === false) return;
  const next = cellAt(state.player.row + dr, state.player.col + dc);
  if (!next || next.wall) return;
  if (next.box) {
    const beyond = cellAt(next.row + dr, next.col + dc);
    if (!beyond || beyond.wall || beyond.box) return;
    next.box = false;
    beyond.box = true;
  }
  state.player = { row: next.row, col: next.col };
  state.moves += 1;
  render();
  if (state.cells.filter(cell => cell.goal).every(cell => cell.box)) finishLevel();
}

function finishLevel() {
  if (levelIndex === completed) {
    completed = Math.min(LEVELS.length, completed + 1);
    localStorage.setItem(stateKey, String(completed));
  }
  winMoves.textContent = state.moves;
  winDialog.hidden = false;
  renderProgress();
}

function renderProgress() {
  levelLabel.textContent = `${levelIndex + 1} / ${LEVELS.length}`;
  movesLabel.textContent = state.moves;
  progressBar.style.width = `${((levelIndex + 1) / LEVELS.length) * 100}%`;
  previousButton.disabled = levelIndex === 0;
  nextButton.disabled = levelIndex >= completed || levelIndex === LEVELS.length - 1;
}

function render() {
  board.style.gridTemplateColumns = `repeat(${state.width}, 1fr)`;
  board.innerHTML = '';
  state.cells.forEach(cell => {
    const tile = document.createElement('div');
    tile.className = `tile ${cell.wall ? 'wall' : 'floor'}${cell.goal ? ' goal' : ''}${cell.box ? ' box' : ''}`;
    if (cell.box && cell.goal) tile.classList.add('box-on-goal');
    if (state.player.row === cell.row && state.player.col === cell.col) tile.classList.add('player');
    tile.setAttribute('role', 'gridcell');
    board.appendChild(tile);
  });
  hint.textContent = completed > levelIndex ? 'Уровень уже пройден — можешь улучшить результат' : 'Передвинь все ящики на светящиеся клетки';
  renderProgress();
}

document.querySelectorAll('[data-direction]').forEach(button => {
  button.addEventListener('click', () => move(button.dataset.direction));
});
document.querySelector('#resetButton').addEventListener('click', () => loadLevel(levelIndex));
previousButton.addEventListener('click', () => loadLevel(levelIndex - 1));
nextButton.addEventListener('click', () => { if (levelIndex < completed) loadLevel(levelIndex + 1); });
document.querySelector('#continueButton').addEventListener('click', () => {
  winDialog.hidden = true;
  if (levelIndex < LEVELS.length - 1) loadLevel(levelIndex + 1);
  else render();
});
document.addEventListener('keydown', event => {
  const keys = { ArrowUp: 'up', w: 'up', ArrowDown: 'down', s: 'down', ArrowLeft: 'left', a: 'left', ArrowRight: 'right', d: 'right' };
  if (keys[event.key]) { event.preventDefault(); move(keys[event.key]); }
});

let touchStart = null;
board.addEventListener('touchstart', event => { touchStart = event.changedTouches[0]; }, { passive: true });
board.addEventListener('touchend', event => {
  if (!touchStart) return;
  const touch = event.changedTouches[0];
  const dx = touch.clientX - touchStart.clientX;
  const dy = touch.clientY - touchStart.clientY;
  touchStart = null;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;
  move(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
}, { passive: true });

loadLevel(0);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
