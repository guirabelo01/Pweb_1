const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');
const apiKeyAuth = require('../middleware/apiKeyAuth');

// GET - todos os animais (com filtros opcionais)
router.get('/', apiKeyAuth, async (req, res) => {
  try {
    const { dificuldade, busca } = req.query;
    const filtro = {};
    if (dificuldade) filtro.dificuldade = dificuldade;
    if (busca) filtro.nome = { $regex: busca, $options: 'i' };

    const animais = await Animal.find(filtro).sort({ nome: 1 });
    res.json({ sucesso: true, total: animais.length, dados: animais });
  } catch (err) {
    res.status(500).json({ sucesso: false, erro: err.message });
  }
});

// GET - animal aleatório (usado pelo jogo)
router.get('/aleatorio', apiKeyAuth, async (req, res) => {
  try {
    const { dificuldade } = req.query;
    const filtro = {};
    if (dificuldade && dificuldade !== 'todos') filtro.dificuldade = dificuldade;

    const total = await Animal.countDocuments(filtro);
    if (total === 0) return res.status(404).json({ sucesso: false, erro: 'Nenhum animal encontrado.' });

    const skip = Math.floor(Math.random() * total);
    const animal = await Animal.findOne(filtro).skip(skip);
    res.json({ sucesso: true, dados: animal });
  } catch (err) {
    res.status(500).json({ sucesso: false, erro: err.message });
  }
});

// GET - animal por ID
router.get('/:id', apiKeyAuth, async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ sucesso: false, erro: 'Animal não encontrado.' });
    res.json({ sucesso: true, dados: animal });
  } catch (err) {
    res.status(500).json({ sucesso: false, erro: err.message });
  }
});

// POST - criar novo animal
router.post('/', apiKeyAuth, async (req, res) => {
  try {
    const animal = new Animal(req.body);
    await animal.save();
    res.status(201).json({ sucesso: true, mensagem: 'Animal criado com sucesso!', dados: animal });
  } catch (err) {
    res.status(400).json({ sucesso: false, erro: err.message });
  }
});

// PUT - atualizar animal
router.put('/:id', apiKeyAuth, async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!animal) return res.status(404).json({ sucesso: false, erro: 'Animal não encontrado.' });
    res.json({ sucesso: true, mensagem: 'Animal atualizado!', dados: animal });
  } catch (err) {
    res.status(400).json({ sucesso: false, erro: err.message });
  }
});

// DELETE - remover animal
router.delete('/:id', apiKeyAuth, async (req, res) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    if (!animal) return res.status(404).json({ sucesso: false, erro: 'Animal não encontrado.' });
    res.json({ sucesso: true, mensagem: 'Animal removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ sucesso: false, erro: err.message });
  }
});

module.exports = router;
