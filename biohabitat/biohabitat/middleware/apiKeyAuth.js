const ApiKey = require('../models/ApiKey');

const apiKeyAuth = async (req, res, next) => {
  const key = req.headers['x-api-key'] || req.query.api_key;

  if (!key) {
    return res.status(401).json({
      sucesso: false,
      erro: 'API Key obrigatória. Envie no header: x-api-key'
    });
  }

  try {
    const apiKey = await ApiKey.findOne({ key, ativa: true });
    if (!apiKey) {
      return res.status(403).json({ sucesso: false, erro: 'API Key inválida ou desativada.' });
    }
    apiKey.requisicoes += 1;
    apiKey.ultimoUso = new Date();
    await apiKey.save();
    req.apiKey = apiKey;
    next();
  } catch (err) {
    return res.status(500).json({ sucesso: false, erro: 'Erro ao validar API Key.' });
  }
};

module.exports = apiKeyAuth;
