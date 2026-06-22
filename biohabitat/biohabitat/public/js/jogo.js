/* ===== BIOHABITAT QUEST — jogo.js ===== */

const API_KEY = 'biohabitat-demo-key-2024';
const BASE    = '/api';

// ── Estado do jogo ──────────────────────────────────────────────────────────
const estado = {
  jogadorId:    null,
  jogadorNome:  '',
  pontuacao:    0,
  acertos:      0,
  erros:        0,
  nivel:        1,
  questaoAtual: 1,
  totalQuestoes: 10,
  dificuldade:  'facil',
  animalAtual:  null,
  respondeu:    false,
  timer:        null,
  tempoRestante: 15
};

// ── Elementos ────────────────────────────────────────────────────────────────
const telaInicio = document.getElementById('tela-inicio');
const telaJogo   = document.getElementById('tela-jogo');
const telaFim    = document.getElementById('tela-fim');

// ── Dificuldade buttons ──────────────────────────────────────────────────────
document.querySelectorAll('.btn-dif').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.btn-dif').forEach(b => b.classList.remove('active-dif'));
    btn.classList.add('active-dif');
    estado.dificuldade = btn.dataset.dif;
  });
});

// ── Iniciar partida ──────────────────────────────────────────────────────────
document.getElementById('btn-iniciar').addEventListener('click', async () => {
  const nome = document.getElementById('input-nome').value.trim();
  if (!nome) {
    alert('Por favor, insira seu nome para continuar!');
    return;
  }

  try {
    const res = await fetch(`${BASE}/jogadores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
      body: JSON.stringify({ nome })
    });
    const data = await res.json();
    if (!data.sucesso) throw new Error(data.erro);

    estado.jogadorId   = data.dados._id;
    estado.jogadorNome = data.dados.nome;
    estado.pontuacao   = data.dados.pontuacao;
    estado.acertos     = data.dados.acertos;
    estado.erros       = data.dados.erros;
    estado.nivel       = data.dados.nivel;
    estado.questaoAtual = 1;

    trocarTela('jogo');
    atualizarHUD();
    carregarAnimal();
  } catch (err) {
    alert('Erro ao criar jogador: ' + err.message);
  }
});

// ── Trocar telas ─────────────────────────────────────────────────────────────
function trocarTela(tela) {
  telaInicio.classList.add('d-none');
  telaJogo.classList.add('d-none');
  telaFim.classList.add('d-none');

  if (tela === 'inicio') telaInicio.classList.remove('d-none');
  if (tela === 'jogo')   telaJogo.classList.remove('d-none');
  if (tela === 'fim')    telaFim.classList.remove('d-none');
}

// ── Atualizar HUD ────────────────────────────────────────────────────────────
function atualizarHUD() {
  document.getElementById('hud-nome').textContent    = estado.jogadorNome;
  document.getElementById('hud-pontos').textContent  = estado.pontuacao;
  document.getElementById('hud-nivel').textContent   = estado.nivel;
  document.getElementById('hud-acertos').textContent = estado.acertos;
  document.getElementById('hud-erros').textContent   = estado.erros;
  document.getElementById('hud-questao').textContent = estado.questaoAtual;
}

// ── Carregar animal aleatório via API ────────────────────────────────────────
async function carregarAnimal() {
  document.getElementById('animal-loading').classList.remove('d-none');
  document.getElementById('animal-content').classList.add('d-none');
  document.getElementById('opcoes-container').innerHTML = '';
  document.getElementById('feedback').classList.add('d-none');
  document.getElementById('animal-card') && document.getElementById('animal-card').classList.remove('acerto', 'erro');

  estado.respondeu = false;
  pararTimer();

  try {
    const url = `${BASE}/animais/aleatorio?dificuldade=${estado.dificuldade}`;
    const res  = await fetch(url, { headers: { 'x-api-key': API_KEY } });
    const data = await res.json();
    if (!data.sucesso) throw new Error(data.erro);

    estado.animalAtual = data.dados;
    renderizarAnimal(data.dados);
    iniciarTimer();
  } catch (err) {
    document.getElementById('animal-loading').innerHTML =
      `<p class="text-danger">Erro ao carregar animal: ${err.message}</p>`;
  }
}

// ── Renderizar animal e opções ───────────────────────────────────────────────
function renderizarAnimal(animal) {
  document.getElementById('animal-emoji').textContent = animal.emoji;
  document.getElementById('animal-nome').textContent  = animal.nome;

  const difEl = document.getElementById('animal-dificuldade');
  const difMap = { facil: ['bg-success', '😊 Fácil'], medio: ['bg-warning text-dark', '😤 Médio'], dificil: ['bg-danger', '💀 Difícil'] };
  difEl.className = `badge mb-2 ${difMap[animal.dificuldade][0]}`;
  difEl.textContent = difMap[animal.dificuldade][1];

  document.getElementById('animal-loading').classList.add('d-none');
  document.getElementById('animal-content').classList.remove('d-none');

  // Embaralhar opções
  const opcoes = [...animal.habitats].sort(() => Math.random() - 0.5);
  const container = document.getElementById('opcoes-container');
  container.innerHTML = '';

  opcoes.forEach(habitat => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-3';

    const btn = document.createElement('button');
    btn.className = 'opcao-btn';
    btn.textContent = habitat;
    btn.addEventListener('click', () => responder(habitat, btn));

    col.appendChild(btn);
    container.appendChild(col);
  });
}

// ── Timer ────────────────────────────────────────────────────────────────────
function iniciarTimer() {
  const tempoTotal = estado.dificuldade === 'dificil' ? 10 : estado.dificuldade === 'medio' ? 13 : 18;
  estado.tempoRestante = tempoTotal;

  const bar = document.getElementById('timer-bar');
  bar.style.width = '100%';
  bar.style.transition = `width ${tempoTotal}s linear`;

  // Trigger reflow para reiniciar animação
  void bar.offsetWidth;
  bar.style.width = '0%';

  estado.timer = setTimeout(() => {
    if (!estado.respondeu) {
      responder(null, null); // tempo esgotado = erro
    }
  }, tempoTotal * 1000);
}

function pararTimer() {
  if (estado.timer) { clearTimeout(estado.timer); estado.timer = null; }
  const bar = document.getElementById('timer-bar');
  bar.style.transition = 'none';
  bar.style.width = '100%';
}

// ── Responder ────────────────────────────────────────────────────────────────
async function responder(habitatEscolhido, btnClicado) {
  if (estado.respondeu) return;
  estado.respondeu = true;
  pararTimer();

  const animal     = estado.animalAtual;
  const acertou    = habitatEscolhido === animal.habitatCorreto;
  const difPontos  = { facil: 100, medio: 200, dificil: 350, todos: 150 };
  const pontos     = acertou ? (difPontos[estado.dificuldade] || 100) : 0;

  // Colorir botões
  document.querySelectorAll('.opcao-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === animal.habitatCorreto) btn.classList.add('correta');
    if (btn === btnClicado && !acertou)            btn.classList.add('errada');
  });

  // Atualizar estado local
  if (acertou) { estado.acertos++; estado.pontuacao += pontos; }
  else         { estado.erros++; }
  estado.nivel = Math.floor(estado.pontuacao / 300) + 1;
  atualizarHUD();

  // Mostrar feedback
  mostrarFeedback(acertou, pontos, animal, habitatEscolhido);

  // Atualizar no servidor via API
  try {
    await fetch(`${BASE}/jogadores/${estado.jogadorId}/pontuacao`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
      body: JSON.stringify({ acertou, pontos })
    });
  } catch (_) { /* continua mesmo sem salvar */ }
}

// ── Mostrar feedback ─────────────────────────────────────────────────────────
function mostrarFeedback(acertou, pontos, animal, escolha) {
  const feedbackEl   = document.getElementById('feedback');
  const cardEl       = document.getElementById('feedback-card');
  const iconEl       = document.getElementById('feedback-icon');
  const tituloEl     = document.getElementById('feedback-titulo');
  const textoEl      = document.getElementById('feedback-texto');
  const curiosidadeEl= document.getElementById('feedback-curiosidade');

  cardEl.className = `card border-0 shadow mx-auto p-4 ${acertou ? 'acerto' : 'erro'}`;

  if (acertou) {
    iconEl.textContent  = '🎉';
    tituloEl.textContent = `Acertou! +${pontos} pontos`;
    tituloEl.className   = 'fw-bold mt-2 mb-1 text-success';
    textoEl.textContent  = `${animal.nome} vive mesmo no ${animal.habitatCorreto}!`;
  } else if (!escolha) {
    iconEl.textContent  = '⏰';
    tituloEl.textContent = 'Tempo esgotado!';
    tituloEl.className   = 'fw-bold mt-2 mb-1 text-danger';
    textoEl.textContent  = `O habitat correto era: ${animal.habitatCorreto}`;
  } else {
    iconEl.textContent  = '❌';
    tituloEl.textContent = 'Errou!';
    tituloEl.className   = 'fw-bold mt-2 mb-1 text-danger';
    textoEl.textContent  = `Você escolheu "${escolha}", mas ${animal.nome} vive no ${animal.habitatCorreto}.`;
  }

  curiosidadeEl.textContent = `💡 Curiosidade: ${animal.curiosidade}`;
  feedbackEl.classList.remove('d-none');
}

// ── Próxima questão ──────────────────────────────────────────────────────────
document.getElementById('btn-proxima').addEventListener('click', () => {
  if (estado.questaoAtual >= estado.totalQuestoes) {
    finalizarPartida();
  } else {
    estado.questaoAtual++;
    atualizarHUD();
    carregarAnimal();
  }
});

// ── Finalizar partida ────────────────────────────────────────────────────────
async function finalizarPartida() {
  try {
    await fetch(`${BASE}/jogadores/${estado.jogadorId}/finalizar`, {
      method: 'PUT',
      headers: { 'x-api-key': API_KEY }
    });
  } catch (_) {}

  document.getElementById('fim-pontos').textContent  = estado.pontuacao;
  document.getElementById('fim-nivel').textContent   = estado.nivel;
  document.getElementById('fim-acertos').textContent = estado.acertos;
  document.getElementById('fim-erros').textContent   = estado.erros;

  const pct = (estado.acertos / estado.totalQuestoes) * 100;
  let msg = '';
  if (pct === 100) msg = '🌟 Perfeito! Você é um verdadeiro expert em habitats!';
  else if (pct >= 80) msg = '🎉 Excelente! Você domina a biologia dos habitats!';
  else if (pct >= 60) msg = '😊 Bom trabalho! Continue estudando!';
  else if (pct >= 40) msg = '😅 Pode melhorar! Os animais precisam de você!';
  else               msg = '💪 Continue tentando! A natureza tem muito a ensinar!';

  document.getElementById('fim-mensagem').textContent = msg;

  const iconEl = document.getElementById('fim-icon');
  iconEl.textContent = pct >= 80 ? '🏆' : pct >= 60 ? '🌿' : '🌱';

  trocarTela('fim');
}

// ── Jogar Novamente ──────────────────────────────────────────────────────────
document.getElementById('btn-jogar-novamente').addEventListener('click', () => {
  estado.questaoAtual = 1;
  estado.pontuacao    = 0;
  estado.acertos      = 0;
  estado.erros        = 0;
  estado.nivel        = 1;
  trocarTela('inicio');
  document.getElementById('input-nome').value = estado.jogadorNome;
});
