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

// Для Google-входа создай бесплатный проект Firebase и вставь сюда его web-конфигурацию.
// Пока поля пустые, игра работает без регистрации и хранит прогресс в браузере.
const FIREBASE_CONFIG = { apiKey: '', authDomain: '', projectId: '', storageBucket: '', messagingSenderId: '', appId: '' };
const board = document.querySelector('#board');
const levelLabel = document.querySelector('#levelLabel');
const movesLabel = document.querySelector('#movesLabel');
const progressBar = document.querySelector('#progressBar');
const hint = document.querySelector('#hint');
const winDialog = document.querySelector('#winDialog');
const winMoves = document.querySelector('#winMoves');
const nextButton = document.querySelector('#nextButton');
const previousButton = document.querySelector('#previousButton');
const authButton = document.querySelector('#authButton');
const authStatus = document.querySelector('#authStatus');
const mineBoard = document.querySelector('#mineBoard');
const minesLeft = document.querySelector('#minesLeft');
const minesMessage = document.querySelector('#minesMessage');
const flagModeButton = document.querySelector('#flagModeButton');
const stateKey = 'kletki-progress';

function readProgress() {
  try {
    const current = JSON.parse(localStorage.getItem(stateKey) || '{}');
    const oldCompleted = Number(localStorage.getItem('kletki-sokoban-progress') || 0);
    return { completed: Math.max(0, Math.min(LEVELS.length, Number(current.completed || oldCompleted))), bestMoves: current.bestMoves || {}, minesWins: Number(current.minesWins || 0) };
  } catch (_) { return { completed: 0, bestMoves: {}, minesWins: 0 }; }
}

let progress = readProgress();
let completed = progress.completed;
let levelIndex = 0;
let state;
let currentUser = null;
let cloudDb = null;
let firebaseAuth = null;

function persistProgress() { localStorage.setItem(stateKey, JSON.stringify(progress)); saveCloudProgress(); }

async function saveCloudProgress() {
  if (!cloudDb || !currentUser) return;
  try {
    await cloudDb.collection('users').doc(currentUser.uid).set({ completed: progress.completed, bestMoves: progress.bestMoves, minesWins: progress.minesWins, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
  } catch (_) { authStatus.textContent = 'Вход выполнен, но синхронизация пока недоступна'; }
}

function mergeProgress(remote) {
  if (!remote) return;
  progress.completed = Math.max(progress.completed, Number(remote.completed || 0));
  progress.minesWins = Math.max(progress.minesWins, Number(remote.minesWins || 0));
  Object.entries(remote.bestMoves || {}).forEach(([level, moves]) => {
    const old = Number(progress.bestMoves[level] || 0);
    if (!old || Number(moves) < old) progress.bestMoves[level] = Number(moves);
  });
  completed = progress.completed;
  localStorage.setItem(stateKey, JSON.stringify(progress));
}

async function loadCloudProgress() {
  if (!cloudDb || !currentUser) return;
  try {
    const snapshot = await cloudDb.collection('users').doc(currentUser.uid).get();
    mergeProgress(snapshot.exists ? snapshot.data() : null);
    renderProgress();
    await saveCloudProgress();
  } catch (_) { authStatus.textContent = 'Вход выполнен, прогресс пока только на этом устройстве'; }
}

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
function cellAt(row, col) { return state.cells.find(cell => cell.row === row && cell.col === col); }
function loadLevel(index) { levelIndex = Math.max(0, Math.min(LEVELS.length - 1, index)); state = parseLevel(LEVELS[levelIndex]); winDialog.hidden = true; render(); }

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
  if (levelIndex === completed) { completed = Math.min(LEVELS.length, completed + 1); progress.completed = completed; }
  const scoreKey = String(levelIndex + 1);
  const oldBest = Number(progress.bestMoves[scoreKey] || 0);
  if (!oldBest || state.moves < oldBest) progress.bestMoves[scoreKey] = state.moves;
  persistProgress();
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

document.querySelectorAll('[data-direction]').forEach(button => button.addEventListener('click', () => move(button.dataset.direction)));
document.querySelector('#resetButton').addEventListener('click', () => loadLevel(levelIndex));
previousButton.addEventListener('click', () => loadLevel(levelIndex - 1));
nextButton.addEventListener('click', () => { if (levelIndex < completed) loadLevel(levelIndex + 1); });
document.querySelector('#continueButton').addEventListener('click', () => { winDialog.hidden = true; if (levelIndex < LEVELS.length - 1) loadLevel(levelIndex + 1); else render(); });
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

// Сапёр
let mineState = { size: 8, mineCount: 10, cells: [], gameOver: false, flagMode: false };
function mineCellAt(row, col) { if (row < 0 || col < 0 || row >= mineState.size || col >= mineState.size) return null; return mineState.cells[row * mineState.size + col]; }
function mineNeighbours(cell) {
  const result = [];
  for (let row = cell.row - 1; row <= cell.row + 1; row += 1) for (let col = cell.col - 1; col <= cell.col + 1; col += 1) { const neighbour = mineCellAt(row, col); if (neighbour && neighbour !== cell) result.push(neighbour); }
  return result;
}
function newMinesGame() {
  const total = mineState.size * mineState.size;
  mineState.cells = Array.from({ length: total }, (_, index) => ({ index, row: Math.floor(index / mineState.size), col: index % mineState.size, mine: false, open: false, flagged: false, adjacent: 0 }));
  [...mineState.cells].sort(() => Math.random() - 0.5).slice(0, mineState.mineCount).forEach(cell => { cell.mine = true; });
  mineState.cells.forEach(cell => { cell.adjacent = mineNeighbours(cell).filter(item => item.mine).length; });
  mineState.gameOver = false;
  minesMessage.textContent = 'Открой безопасные клетки';
  renderMines();
}
function toggleMineFlag(index) { const cell = mineState.cells[index]; if (!cell || cell.open || mineState.gameOver) return; cell.flagged = !cell.flagged; renderMines(); }
function revealMine(index) {
  const first = mineState.cells[index];
  if (!first || first.open || first.flagged || mineState.gameOver) return;
  if (first.mine) { mineState.gameOver = true; mineState.cells.forEach(cell => { if (cell.mine) cell.open = true; }); minesMessage.textContent = 'Мина! Нажми «Новая игра»'; renderMines(); return; }
  const queue = [first];
  while (queue.length) { const cell = queue.shift(); if (cell.open || cell.flagged) continue; cell.open = true; if (cell.adjacent === 0) mineNeighbours(cell).forEach(neighbour => { if (!neighbour.mine && !neighbour.open) queue.push(neighbour); }); }
  if (mineState.cells.filter(cell => !cell.mine).every(cell => cell.open)) { mineState.gameOver = true; progress.minesWins += 1; persistProgress(); minesMessage.textContent = `Победа! Всего побед: ${progress.minesWins}`; }
  renderMines();
}
function renderMines() {
  mineBoard.style.gridTemplateColumns = `repeat(${mineState.size}, 1fr)`;
  mineBoard.innerHTML = '';
  mineState.cells.forEach(cell => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'mine-cell';
    if (cell.open) button.classList.add('open');
    if (cell.flagged) button.classList.add('flagged');
    if (cell.open && cell.mine) { button.classList.add('mine'); button.textContent = '✹'; }
    else if (cell.flagged) button.textContent = '⚑';
    else if (cell.open && cell.adjacent) { button.classList.add(`number-${Math.min(cell.adjacent, 3)}`); button.textContent = cell.adjacent; }
    button.addEventListener('click', () => mineState.flagMode ? toggleMineFlag(cell.index) : revealMine(cell.index));
    button.addEventListener('contextmenu', event => { event.preventDefault(); toggleMineFlag(cell.index); });
    mineBoard.appendChild(button);
  });
  minesLeft.textContent = mineState.mineCount - mineState.cells.filter(cell => cell.flagged).length;
  flagModeButton.textContent = `🚩 Режим флажков: ${mineState.flagMode ? 'вкл.' : 'выкл.'}`;
}
document.querySelector('#newMinesButton').addEventListener('click', newMinesGame);
flagModeButton.addEventListener('click', () => { mineState.flagMode = !mineState.flagMode; renderMines(); });

function switchGame(name) {
  const sokoban = name === 'sokoban';
  document.querySelector('#sokobanGame').hidden = !sokoban;
  document.querySelector('#minesGame').hidden = sokoban;
  document.querySelector('#sokobanTab').classList.toggle('active', sokoban);
  document.querySelector('#minesTab').classList.toggle('active', !sokoban);
}
document.querySelector('#sokobanTab').addEventListener('click', () => switchGame('sokoban'));
document.querySelector('#minesTab').addEventListener('click', () => switchGame('mines'));

function setupFirebase() {
  const configured = FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.authDomain && FIREBASE_CONFIG.projectId && window.firebase;
  if (!configured) { authButton.addEventListener('click', () => { authStatus.textContent = 'Google-вход подключается через Firebase — см. инструкцию'; }); return; }
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
    firebaseAuth = firebase.auth();
    cloudDb = firebase.firestore();
    firebaseAuth.onAuthStateChanged(async user => {
      currentUser = user;
      if (user) { authButton.textContent = 'Выйти'; authStatus.textContent = `${user.displayName || user.email} · синхронизация включена`; await loadCloudProgress(); }
      else { authButton.textContent = 'Войти'; authStatus.textContent = 'Прогресс сохраняется на этом устройстве'; }
    });
    authButton.addEventListener('click', async () => {
      try { if (currentUser) await firebaseAuth.signOut(); else await firebaseAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()); }
      catch (_) { authStatus.textContent = 'Не удалось выполнить вход Google'; }
    });
  } catch (_) { authStatus.textContent = 'Firebase настроен с ошибкой — локальное сохранение работает'; }
}

loadLevel(0);
newMinesGame();
setupFirebase();
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
