const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  ativa: { type: Boolean, default: true },
  requisicoes: { type: Number, default: 0 },
  ultimoUso: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('ApiKey', apiKeySchema);
