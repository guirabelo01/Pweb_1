const express = require('express');
const router = express.Router();
const Jogador = require('../models/Jogador');
const apiKeyAuth = require('../middleware/apiKeyAuth');

// GET - ranking (top 10)
router.get('/ranking', apiKeyAuth, async (req, res) => {
  try {
    const jogadores = await Jogador.find().sort({ pontuacao: -1 }).limit(10);
    res.json({ sucesso: true, dados: jogadores });
  } catch (err) {
    res.status(500).json({ sucesso: false, erro: err.message });
  }
});

// GET - todos os jogadores
router.get('/', apiKeyAuth, async (req, res) => {
  try {
    const jogadores = await Jogador.find().sort({ pontuacao: -1 });
    res.json({ sucesso: true, total: jogadores.length, dados: jogadores });
  } catch (err) {
    res.status(500).json({ sucesso: false, erro: err.message });
  }
});

// POST - criar jogador (início de partida)
router.post('/', apiKeyAuth, async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ sucesso: false, erro: 'Nome é obrigatório.' });

    // Verifica se já existe jogador com esse nome
    let jogador = await Jogador.findOne({ nome: nome.trim() });
    if (!jogador) {
      jogador = new Jogador({ nome: nome.trim() });
      await jogador.save();
    }

    res.status(201).json({ sucesso: true, mensagem: 'Jogador pronto!', dados: jogador });
  } catch (err) {
    res.status(400).json({ sucesso: false, erro: err.message });
  }
});

// PUT - atualizar pontuação após resposta
router.put('/:id/pontuacao', apiKeyAuth, async (req, res) => {
  try {
    const { acertou, pontos } = req.body;
    const jogador = await Jogador.findById(req.params.id);
    if (!jogador) return res.status(404).json({ sucesso: false, erro: 'Jogador não encontrado.' });

    if (acertou) {
      jogador.acertos += 1;
      jogador.pontuacao += pontos || 100;
    } else {
      jogador.erros += 1;
    }

    // Calcular nível com base na pontuação
    jogador.nivel = Math.floor(jogador.pontuacao / 300) + 1;

    await jogador.save();
    res.json({ sucesso: true, dados: jogador });
  } catch (err) {
    res.status(400).json({ sucesso: false, erro: err.message });
  }
});

// PUT - finalizar partida (incrementa contador)
router.put('/:id/finalizar', apiKeyAuth, async (req, res) => {
  try {
    const jogador = await Jogador.findByIdAndUpdate(
      req.params.id,
      { $inc: { partidas: 1 } },
      { new: true }
    );
    if (!jogador) return res.status(404).json({ sucesso: false, erro: 'Jogador não encontrado.' });
    res.json({ sucesso: true, dados: jogador });
  } catch (err) {
    res.status(400).json({ sucesso: false, erro: err.message });
  }
});

// GET - jogador por ID
router.get('/:id', apiKeyAuth, async (req, res) => {
  try {
    const jogador = await Jogador.findById(req.params.id);
    if (!jogador) return res.status(404).json({ sucesso: false, erro: 'Jogador não encontrado.' });
    res.json({ sucesso: true, dados: jogador });
  } catch (err) {
    res.status(500).json({ sucesso: false, erro: err.message });
  }
});

module.exports = router;
