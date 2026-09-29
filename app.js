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
];
const RARITY = { common: { label: 'Обычная', chance: 58 }, rare: { label: 'Редкая', chance: 27 }, epic: { label: 'Эпическая', chance: 12 }, legendary: { label: 'Легенда', chance: 3 } };
const FIREBASE_CONFIG = { apiKey: '', authDomain: '', projectId: '', storageBucket: '', messagingSenderId: '', appId: '' };
const $ = selector => document.querySelector(selector);
const stateKey = 'artefacts-collection-v1';
let game = loadGame();
let cloudDb = null;
let firebaseAuth = null;
let currentUser = null;
let cloudSaveTimer = null;

function loadGame() {
  try {
    const saved = JSON.parse(localStorage.getItem(stateKey) || '{}');
    return { coins: Number.isFinite(saved.coins) ? saved.coins : 100, cards: saved.cards || {}, opens: Number(saved.opens || 0), duplicates: Number(saved.duplicates || 0), lastFree: saved.lastFree || '' };
  } catch (_) { return { coins: 100, cards: {}, opens: 0, duplicates: 0, lastFree: '' }; }
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
  Object.entries(remote.cards || {}).forEach(([id, count]) => { game.cards[id] = Math.max(Number(game.cards[id] || 0), Number(count || 0)); });
  localStorage.setItem(stateKey, JSON.stringify(game));
}
function rarityPick() {
  const roll = Math.random() * 100;
  let total = 0;
  for (const rarity of ['common', 'rare', 'epic', 'legendary']) { total += RARITY[rarity].chance; if (roll < total) return rarity; }
  return 'common';
}
function chooseCard() {
  const rarity = rarityPick();
  const pool = CARDS.filter(card => card.rarity === rarity);
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
}
function cardMarkup(card, count) {
  return `<article class="collect-card rarity-${card.rarity} ${count ? '' : 'locked'}" style="--card-color:${card.color}"><div class="card-shine"></div><div class="card-icon">${count ? card.icon : '?'}</div><div class="card-info"><strong>${count ? card.name : 'Неизвестный артефакт'}</strong><span>${RARITY[card.rarity].label}${count ? ` · ×${count}` : ''}</span></div></article>`;
}
function renderCollection(filter = 'all') {
  const cards = CARDS.filter(card => filter === 'all' || card.rarity === filter);
  $('#collectionGrid').innerHTML = cards.map(card => cardMarkup(card, Number(game.cards[card.id] || 0))).join('');
}
function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2500); }
function reveal(card, isDuplicate) {
  $('#revealedCard').innerHTML = `<div class="big-card rarity-${card.rarity}" style="--card-color:${card.color}"><div class="big-card-top"><span>${RARITY[card.rarity].label}</span><b>${card.icon}</b></div><div class="big-card-symbol">${card.icon}</div><h3>${card.name}</h3><p>Артефакт исследователя</p></div><p class="reveal-note">${isDuplicate ? 'Дубликат добавлен в счётчик коллекции' : 'Новая карта добавлена в коллекцию!'}</p>`;
  $('#revealPanel').hidden = false;
  $('#revealPanel').scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function openCase() {
  const free = freeCaseAvailable();
  if (!free && game.coins < 20) { showToast('Недостаточно кристаллов'); return; }
  if (free) game.lastFree = today(); else game.coins -= 20;
  const card = chooseCard();
  const duplicate = Boolean(game.cards[card.id]);
  game.cards[card.id] = Number(game.cards[card.id] || 0) + 1;
  game.opens += 1;
  if (duplicate) { game.duplicates += 1; game.coins += 5; }
  persist();
  renderStats(); renderCollection($('.rarity-tab.active').dataset.filter); reveal(card, duplicate);
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

$('#openCaseButton').addEventListener('click', openCase);
$('#closeRevealButton').addEventListener('click', () => { $('#revealPanel').hidden = true; });
$('.rarity-tabs').addEventListener('click', event => { const button = event.target.closest('.rarity-tab'); if (!button) return; document.querySelectorAll('.rarity-tab').forEach(tab => tab.classList.remove('active')); button.classList.add('active'); renderCollection(button.dataset.filter); });
renderStats(); renderCollection(); setupFirebase();
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
