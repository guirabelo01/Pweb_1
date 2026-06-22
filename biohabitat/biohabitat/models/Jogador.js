const mongoose = require('mongoose');

const jogadorSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  pontuacao: { type: Number, default: 0 },
  acertos: { type: Number, default: 0 },
  erros: { type: Number, default: 0 },
  nivel: { type: Number, default: 1 },
  partidas: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Jogador', jogadorSchema);
