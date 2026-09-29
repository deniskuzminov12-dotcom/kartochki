const CARDS = [
  { id: 'ember', name: 'Угольный огонёк', rarity: 'common', icon: '◆', color: '#6d82ad' },
  { id: 'moss', name: 'Лесной мох', rarity: 'common', icon: '❈', color: '#558d7d' },
  { id: 'shell', name: 'Раковина прилива', rarity: 'common', icon: '◒', color: '#697eaa' },
  { id: 'quartz', name: 'Белый кварц', rarity: 'common', icon: '◇', color: '#8294b7' },
  { id: 'feather', name: 'Синее перо', rarity: 'common', icon: '⌁', color: '#4d83a6' },
  { id: 'coin', name: 'Старая монета', rarity: 'common', icon: '◉', color: '#a17c4e' },
  { id: 'moon', name: 'Лунный камень', rarity: 'rare', icon: '☾', color: '#6874d9' },
  { id: 'rose', name: 'Роза странника', rarity: 'rare', icon: '✿', color: '#b95778' },
  { id: 'compass', name: 'Звёздный компас', rarity: 'rare', icon: '✥', color: '#528fa9' },
  { id: 'lantern', name: 'Фонарь глубин', rarity: 'rare', icon: '♢', color: '#c18a4a' },
  { id: 'crown', name: 'Корона волн', rarity: 'rare', icon: '♔', color: '#6583cf' },
  { id: 'mask', name: 'Маска ветра', rarity: 'rare', icon: '◈', color: '#986ab7' },
  { id: 'dragon', name: 'Драконий глаз', rarity: 'epic', icon: '◉', color: '#d25d62' },
  { id: 'meteor', name: 'Осколок метеора', rarity: 'epic', icon: '☄', color: '#dc7b4e' },
  { id: 'oracle', name: 'Кристалл оракула', rarity: 'epic', icon: '✧', color: '#9b6dd1' },
  { id: 'storm', name: 'Сердце грозы', rarity: 'epic', icon: 'ϟ', color: '#557bd1' },
  { id: 'phoenix', name: 'Перо феникса', rarity: 'epic', icon: '♨', color: '#d36a3c' },
  { id: 'void', name: 'Осколок пустоты', rarity: 'epic', icon: '✹', color: '#7059b2' },
  { id: 'atlas', name: 'Атлас миров', rarity: 'legendary', icon: '✺', color: '#d5a94d' },
  { id: 'star', name: 'Падшая звезда', rarity: 'legendary', icon: '★', color: '#e9c45e' },
  { id: 'crownfire', name: 'Корона пламени', rarity: 'legendary', icon: '♛', color: '#df654b' },
  { id: 'leviathan', name: 'Знак левиафана', rarity: 'legendary', icon: '♒', color: '#55b9b0' },
  { id: 'time', name: 'Часы вечности', rarity: 'legendary', icon: '◷', color: '#cf76ca' },
  { id: 'origin', name: 'Искра истока', rarity: 'legendary', icon: '✦', color: '#f0d878' }
  ,{ id: 'circuit', name: 'Живой контур', rarity: 'common', icon: '⌁', color: '#27b8cb' }
  ,{ id: 'pixel', name: 'Пиксельный ключ', rarity: 'common', icon: '▦', color: '#5279dc' }
  ,{ id: 'neonheart', name: 'Неоновое сердце', rarity: 'rare', icon: '♡', color: '#ec62d7' }
  ,{ id: 'datashard', name: 'Фрагмент данных', rarity: 'rare', icon: '◈', color: '#4fdfed' }
  ,{ id: 'hacker', name: 'Маска хакера', rarity: 'epic', icon: '⌬', color: '#9475ff' }
  ,{ id: 'quantum', name: 'Квантовый узел', rarity: 'epic', icon: '✣', color: '#55e5bd' }
  ,{ id: 'singularity', name: 'Сингулярность', rarity: 'legendary', icon: '⦿', color: '#f45ed1' }
  ,{ id: 'neoncore', name: 'Ядро мегаполиса', rarity: 'legendary', icon: '✹', color: '#64e7ff' }
  ,{ id: 'fern', name: 'Серебряный папоротник', rarity: 'common', icon: '❧', color: '#4ea96c' }
  ,{ id: 'berry', name: 'Лунная ягода', rarity: 'common', icon: '●', color: '#ae65a9' }
  ,{ id: 'totem', name: 'Костяной тотем', rarity: 'rare', icon: '♧', color: '#8c9b54' }
  ,{ id: 'spirit', name: 'Дух чащи', rarity: 'rare', icon: '♢', color: '#56c895' }
  ,{ id: 'ent', name: 'Сердце энта', rarity: 'epic', icon: '♜', color: '#6eaa58' }
  ,{ id: 'venom', name: 'Яд древней лозы', rarity: 'epic', icon: '☠', color: '#ba75d3' }
  ,{ id: 'worldtree', name: 'Мировое древо', rarity: 'legendary', icon: '♧', color: '#72d66d' }
  ,{ id: 'greenmoon', name: 'Зелёная луна', rarity: 'legendary', icon: '☽', color: '#b0ec76' }
  ,{ id: 'sand', name: 'Золотой песок', rarity: 'common', icon: '▪', color: '#c19b4c' }
  ,{ id: 'scarab', name: 'Солнечный скарабей', rarity: 'common', icon: '✥', color: '#bd7d39' }
  ,{ id: 'sphinx', name: 'Око сфинкса', rarity: 'rare', icon: '◉', color: '#e5a43e' }
  ,{ id: 'sunray', name: 'Луч рассвета', rarity: 'rare', icon: '☼', color: '#e9d160' }
  ,{ id: 'pharaoh', name: 'Печать фараона', rarity: 'epic', icon: '♕', color: '#d98b42' }
  ,{ id: 'solarwing', name: 'Крыло солнца', rarity: 'epic', icon: '✧', color: '#f1c85b' }
  ,{ id: 'ra', name: 'Глаз Ра', rarity: 'legendary', icon: '𓂀', color: '#f1b54f' }
  ,{ id: 'goldenage', name: 'Золотой век', rarity: 'legendary', icon: '✺', color: '#ffe07c' }
];
const RARITY = { common: { label: 'Обычная', chance: 58 }, rare: { label: 'Редкая', chance: 27 }, epic: { label: 'Эпическая', chance: 12 }, legendary: { label: 'Легенда', chance: 3 } };
const SELL_PRICE = { common: 8, rare: 18, epic: 45, legendary: 120 };
const CASES = {
  aurora: { title: 'Северное сияние', description: 'Ледяные реликвии из забытых северных храмов.', icon: '❄', cards: ['quartz', 'feather', 'moon', 'compass', 'crown', 'oracle', 'star', 'time', 'atlas'] },
  inferno: { title: 'Адский сундук', description: 'Огненные артефакты, закалённые в пламени.', icon: '♨', cards: ['ember', 'coin', 'rose', 'lantern', 'dragon', 'meteor', 'phoenix', 'crownfire'] },
  abyss: { title: 'Бездна', description: 'Тайны глубин и вещи, которым лучше не видеть свет.', icon: '◈', cards: ['moss', 'shell', 'mask', 'crown', 'storm', 'void', 'leviathan', 'origin'] },
  cyber: { title: 'Кибер-узел', description: 'Неоновые схемы из города, который никогда не спит.', icon: '⌁', cards: ['circuit', 'pixel', 'neonheart', 'datashard', 'hacker', 'quantum', 'singularity', 'neoncore'] },
  jungle: { title: 'Изумрудная чаща', description: 'Дикая коллекция, спрятанная среди древних лиан.', icon: '❈', cards: ['fern', 'berry', 'totem', 'spirit', 'ent', 'venom', 'worldtree', 'greenmoon'] },
  solar: { title: 'Солнечный храм', description: 'Золотые реликвии древнего храма под палящим солнцем.', icon: '☼', cards: ['sand', 'scarab', 'sphinx', 'sunray', 'pharaoh', 'solarwing', 'ra', 'goldenage'] }
};
const FIREBASE_CONFIG = { apiKey: '', authDomain: '', projectId: '', storageBucket: '', messagingSenderId: '', appId: '' };
const $ = selector => document.querySelector(selector);
const stateKey = 'artefacts-collection-v1';
let game = loadGame();
let cloudDb = null;
let firebaseAuth = null;
let currentUser = null;
let cloudSaveTimer = null;
let selectedCase = 'aurora';
let opening = false;

function loadGame() {
  try {
    const saved = JSON.parse(localStorage.getItem(stateKey) || '{}');
    return { coins: Number.isFinite(saved.coins) ? saved.coins : 100, cards: saved.cards || {}, opens: Number(saved.opens || 0), duplicates: Number(saved.duplicates || 0), lastFree: saved.lastFree || '', name: saved.name || 'Исследователь' };
  } catch (_) { return { coins: 100, cards: {}, opens: 0, duplicates: 0, lastFree: '', name: 'Исследователь' }; }
}
function persist() {
  localStorage.setItem(stateKey, JSON.stringify(game));
  clearTimeout(cloudSaveTimer);
  cloudSaveTimer = setTimeout(saveCloud, 150);
}
async function saveCloud() {
  if (!cloudDb || !currentUser) return;
  try { await cloudDb.collection('users').doc(currentUser.uid).set({ collection: game, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true }); } catch (_) { $('#authStatus').textContent = 'Вход выполнен, но синхронизация пока недоступна'; }
}
function mergeCloud(data) {
  if (!data || !data.collection) return;
  const remote = data.collection;
  game.coins = Math.max(game.coins, Number(remote.coins || 0));
  game.opens = Math.max(game.opens, Number(remote.opens || 0));
  game.duplicates = Math.max(game.duplicates, Number(remote.duplicates || 0));
  if (remote.name && (!game.name || game.name === 'Исследователь')) game.name = String(remote.name).slice(0, 24);
  Object.entries(remote.cards || {}).forEach(([id, count]) => { game.cards[id] = Math.max(Number(game.cards[id] || 0), Number(count || 0)); });
  localStorage.setItem(stateKey, JSON.stringify(game));
}
function rarityPick() {
  const roll = Math.random() * 100;
  let total = 0;
  for (const rarity of ['common', 'rare', 'epic', 'legendary']) { total += RARITY[rarity].chance; if (roll < total) return rarity; }
  return 'common';
}
function chooseCard(caseId = selectedCase) {
  const rarity = rarityPick();
  const cardIds = CASES[caseId].cards;
  let pool = CARDS.filter(card => card.rarity === rarity && cardIds.includes(card.id));
  if (!pool.length) pool = CARDS.filter(card => cardIds.includes(card.id));
  return pool[Math.floor(Math.random() * pool.length)];
}
function today() { return new Date().toISOString().slice(0, 10); }
function freeCaseAvailable() { return game.lastFree !== today(); }
function renderStats() {
  const owned = CARDS.filter(card => game.cards[card.id]).length;
  $('#collectionCount').textContent = `${owned} / ${CARDS.length}`;
  $('#collectionBar').style.width = `${owned / CARDS.length * 100}%`;
  $('#coinsLabel').textContent = game.coins;
  $('#duplicateLabel').textContent = `Дубликаты: ${game.duplicates}`;
  const free = freeCaseAvailable();
  $('#openCaseButton').innerHTML = free ? 'Открыть бесплатный кейс <span class="button-cost">◆ 0</span>' : 'Открыть кейс <span class="button-cost">◆ 20</span>';
  $('#caseHint').textContent = free ? 'Бесплатный кейс доступен сегодня' : 'Следующий бесплатный кейс — завтра';
  $('#openCaseButton').disabled = opening;
  renderProfile();
}
function renderProfile() {
  const owned = CARDS.filter(card => game.cards[card.id]).length;
  $('#profileName').textContent = game.name || 'Исследователь';
  $('#profileAvatar').textContent = (game.name || 'И').trim().charAt(0).toUpperCase();
  if (document.activeElement !== $('#profileNameInput')) $('#profileNameInput').value = game.name || 'Исследователь';
  $('#profileOpens').textContent = game.opens;
  $('#profileOwned').textContent = `${owned} / ${CARDS.length}`;
  $('#profileCoins').textContent = game.coins;
}
function renderSellGrid() {
  const owned = CARDS.filter(card => Number(game.cards[card.id] || 0) > 0);
  $('#sellGrid').innerHTML = owned.length ? owned.map(card => {
    const count = Number(game.cards[card.id]);
    return `<div class="sell-card rarity-${card.rarity}" style="--card-color:${card.color}"><span class="sell-icon">${card.icon}</span><span class="sell-name">${card.name}<small>×${count} · ◆ ${SELL_PRICE[card.rarity]}</small></span><button class="sell-button" data-sell="${card.id}" type="button" ${count < 2 ? 'disabled title="Оставь одну копию"' : ''}>Продать</button></div>`;
  }).join('') : '<p class="empty-sell">Открой первый кейс, чтобы здесь появились карты.</p>';
}
function renderCase() {
  const current = CASES[selectedCase];
  $('#caseTitle').textContent = current.title;
  $('#caseDescription').textContent = current.description;
  $('.case-art').className = `case-art theme-${selectedCase}`;
  $('.case-art span').textContent = current.icon;
  document.querySelectorAll('.case-choice').forEach(button => button.classList.toggle('active', button.dataset.case === selectedCase));
}
function cardMarkup(card, count) {
  const origin = Object.values(CASES).filter(item => item.cards.includes(card.id)).map(item => item.title).join(' / ');
  return `<article class="collect-card rarity-${card.rarity} ${count ? '' : 'locked'}" style="--card-color:${card.color}"><div class="card-shine"></div><div class="card-icon">${count ? card.icon : '?'}</div><div class="card-info"><strong>${count ? card.name : 'Неизвестный артефакт'}</strong><span>${RARITY[card.rarity].label}${count ? ` · ×${count}` : ''}</span><span class="card-origin">${origin}</span></div></article>`;
}
function renderCollection(filter = 'all') {
  const cards = CARDS.filter(card => filter === 'all' || card.rarity === filter);
  $('#collectionGrid').innerHTML = cards.map(card => cardMarkup(card, Number(game.cards[card.id] || 0))).join('');
}
function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2500); }
function addCrystalFromTap() {
  game.coins = Math.round((game.coins + 0.1) * 10) / 10;
  persist();
  $('#coinsLabel').textContent = game.coins;
  $('#profileCoins').textContent = game.coins;
  const float = document.createElement('span');
  float.className = 'crystal-float';
  float.textContent = '+0,1 ◆';
  $('#crystalWindow').appendChild(float);
  setTimeout(() => float.remove(), 700);
}
function reveal(card, isDuplicate) {
  $('#revealedCard').innerHTML = `<div class="big-card rarity-${card.rarity}" style="--card-color:${card.color}"><div class="big-card-top"><span>${RARITY[card.rarity].label}</span><b>${card.icon}</b></div><div class="big-card-symbol">${card.icon}</div><h3>${card.name}</h3><p>Артефакт исследователя</p></div><p class="reveal-note">${isDuplicate ? 'Дубликат добавлен в счётчик коллекции' : 'Новая карта добавлена в коллекцию!'}</p>`;
  $('#revealPanel').hidden = false;
  if (!$('#profilePanel').open) $('#revealPanel').scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function rouletteCardMarkup(card) {
  return `<div class="roulette-item rarity-${card.rarity}" style="--card-color:${card.color}"><span>${card.icon}</span><small>${RARITY[card.rarity].label}</small></div>`;
}
function spinRoulette(card, caseId) {
  const track = $('#rouletteTrack');
  const panel = $('#roulettePanel');
  const pool = CASES[caseId].cards.map(id => CARDS.find(item => item.id === id));
  const items = Array.from({ length: 34 }, () => pool[Math.floor(Math.random() * pool.length)]);
  const targetIndex = 27;
  items[targetIndex] = card;
  track.innerHTML = items.map(rouletteCardMarkup).join('');
  track.classList.remove('spinning');
  track.style.transform = 'translateX(0)';
  panel.hidden = false;
  requestAnimationFrame(() => {
    const item = track.children[targetIndex];
    const distance = item.offsetLeft - (panel.querySelector('.roulette-window').clientWidth / 2 - item.offsetWidth / 2);
    track.classList.add('spinning');
    track.style.transform = `translateX(-${distance}px)`;
  });
}
function openCase() {
  if (opening) return;
  const free = freeCaseAvailable();
  if (!free && game.coins < 20) { showToast('Недостаточно кристаллов'); return; }
  opening = true;
  renderStats();
  if (free) game.lastFree = today(); else game.coins -= 20;
  const card = chooseCard(selectedCase);
  const duplicate = Boolean(game.cards[card.id]);
  game.cards[card.id] = Number(game.cards[card.id] || 0) + 1;
  game.opens += 1;
  if (duplicate) { game.duplicates += 1; game.coins += 5; }
  persist();
  spinRoulette(card, selectedCase);
  $('#rouletteStatus').textContent = `${CASES[selectedCase].title} прокручивается...`;
  setTimeout(() => {
    $('#rouletteStatus').textContent = `${RARITY[card.rarity].label}: ${card.name}`;
    opening = false;
    renderStats(); renderCollection($('.rarity-tab.active').dataset.filter); reveal(card, duplicate);
  }, 2350);
}
function setupFirebase() {
  const ready = FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.authDomain && FIREBASE_CONFIG.projectId && window.firebase;
  if (!ready) { $('#authButton').addEventListener('click', () => { $('#authStatus').textContent = 'Google-вход подключается через Firebase — добавь конфигурацию в app.js'; }); return; }
  try {
    firebase.initializeApp(FIREBASE_CONFIG); firebaseAuth = firebase.auth(); cloudDb = firebase.firestore();
    firebaseAuth.onAuthStateChanged(async user => { currentUser = user; if (user) { $('#authButton').textContent = 'Выйти'; $('#authStatus').textContent = `${user.displayName || user.email} · синхронизация включена`; const snapshot = await cloudDb.collection('users').doc(user.uid).get(); mergeCloud(snapshot.exists ? snapshot.data() : null); renderStats(); renderCollection(); await saveCloud(); } else { $('#authButton').textContent = 'Войти'; $('#authStatus').textContent = 'Прогресс сохраняется на этом устройстве'; } });
    $('#authButton').addEventListener('click', async () => { try { if (currentUser) await firebaseAuth.signOut(); else await firebaseAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()); } catch (_) { $('#authStatus').textContent = 'Не удалось выполнить вход Google'; } });
  } catch (_) { $('#authStatus').textContent = 'Firebase настроен с ошибкой — локальное сохранение работает'; }
}

let touchOpenedCase = false;
$('#openCaseButton').addEventListener('pointerup', event => {
  if (event.pointerType === 'touch' || event.pointerType === 'pen') {
    event.preventDefault();
    touchOpenedCase = true;
    openCase();
    setTimeout(() => { touchOpenedCase = false; }, 500);
  }
});
$('#openCaseButton').addEventListener('click', () => { if (!touchOpenedCase) openCase(); });
$('#crystalWindow').addEventListener('click', addCrystalFromTap);
// manipulation disables double-tap zoom, while preserving pinch and scrolling.
document.addEventListener('dblclick', event => {
  if (!event.target.closest('input, textarea')) event.preventDefault();
});
$('#closeRevealButton').addEventListener('click', () => { $('#revealPanel').hidden = true; });
document.querySelector('.case-selector').addEventListener('click', event => {
  const button = event.target.closest('.case-choice');
  if (!button || opening) return;
  selectedCase = button.dataset.case;
  renderCase();
});
$('#profileButton').addEventListener('click', () => {
  renderProfile(); renderSellGrid();
  $('#profilePanel').showModal();
  document.body.classList.add('profile-open');
  $('.profile-panel').scrollTop = 0;
  $('#closeProfileButton').focus({ preventScroll: true });
});
$('#closeProfileButton').addEventListener('click', () => $('#profilePanel').close());
$('#profilePanel').addEventListener('click', event => { if (event.target.id === 'profilePanel') event.currentTarget.close(); });
$('#profilePanel').addEventListener('close', () => {
  document.body.classList.remove('profile-open');
  $('#profileButton').focus({ preventScroll: true });
});
$('#saveNameButton').addEventListener('click', () => { const value = $('#profileNameInput').value.trim().slice(0, 24); if (!value) { showToast('Введите имя'); return; } game.name = value; persist(); renderProfile(); showToast('Имя сохранено'); });
$('#sellGrid').addEventListener('click', event => {
  const button = event.target.closest('[data-sell]');
  if (!button) return;
  const card = CARDS.find(item => item.id === button.dataset.sell);
  if (!card) return;
  const count = Number(game.cards[card.id] || 0);
  if (!card || count < 2) { showToast('Оставь хотя бы одну копию'); return; }
  game.cards[card.id] = count - 1;
  game.coins += SELL_PRICE[card.rarity];
  game.duplicates = Math.max(0, game.duplicates - 1);
  persist(); renderStats(); renderCollection($('.rarity-tab.active').dataset.filter); renderSellGrid(); showToast(`Карта продана за ◆ ${SELL_PRICE[card.rarity]}`);
});
$('.rarity-tabs').addEventListener('click', event => { const button = event.target.closest('.rarity-tab'); if (!button) return; document.querySelectorAll('.rarity-tab').forEach(tab => tab.classList.remove('active')); button.classList.add('active'); renderCollection(button.dataset.filter); });
renderCase(); renderStats(); renderCollection(); setupFirebase();
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
