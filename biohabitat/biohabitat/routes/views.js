const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');
const Jogador = require('../models/Jogador');
const ApiKey = require('../models/ApiKey');

// HOME
router.get('/', async (req, res) => {
  try {
    const totalAnimais = await Animal.countDocuments();
    const totalJogadores = await Jogador.countDocuments();
    const topJogador = await Jogador.findOne().sort({ pontuacao: -1 });
    res.render('index', { totalAnimais, totalJogadores, topJogador });
  } catch (err) {
    res.render('index', { totalAnimais: 0, totalJogadores: 0, topJogador: null });
  }
});

// JOGO
router.get('/jogo', (req, res) => {
  res.render('jogo');
});

// RANKING
router.get('/ranking', async (req, res) => {
  try {
    const jogadores = await Jogador.find().sort({ pontuacao: -1 }).limit(10);
    res.render('ranking', { jogadores });
  } catch (err) {
    res.render('ranking', { jogadores: [] });
  }
});

// ANIMAIS (catálogo)
router.get('/animais', async (req, res) => {
  try {
    const { dificuldade } = req.query;
    const filtro = {};
    if (dificuldade && dificuldade !== 'todos') filtro.dificuldade = dificuldade;
    const animais = await Animal.find(filtro).sort({ dificuldade: 1, nome: 1 });
    res.render('animais', { animais, dificuldade: dificuldade || 'todos' });
  } catch (err) {
    res.render('animais', { animais: [], dificuldade: 'todos' });
  }
});

// API DOCS
router.get('/api-docs', async (req, res) => {
  try {
    const apiKeys = await ApiKey.find().sort({ createdAt: -1 });
    res.render('api-docs', { apiKeys });
  } catch (err) {
    res.render('api-docs', { apiKeys: [] });
  }
});

module.exports = router;
