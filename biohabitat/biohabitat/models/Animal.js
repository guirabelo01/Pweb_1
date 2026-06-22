const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  emoji: { type: String, required: true },
  habitats: [{ type: String, required: true }],
  habitatCorreto: { type: String, required: true },
  curiosidade: { type: String, default: '' },
  dificuldade: { type: String, enum: ['facil', 'medio', 'dificil'], default: 'facil' }
}, { timestamps: true });

module.exports = mongoose.model('Animal', animalSchema);
