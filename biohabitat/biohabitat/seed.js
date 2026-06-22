require('dotenv').config();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Animal = require('./models/Animal');
const ApiKey = require('./models/ApiKey');
const Jogador = require('./models/Jogador');
const animaisData = require('./data/animais');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado ao MongoDB');

    // Limpar coleções existentes
    await Animal.deleteMany({});
    await ApiKey.deleteMany({});
    await Jogador.deleteMany({});
    console.log('Coleções limpas com sucesso');

    // Inserir animais
    await Animal.insertMany(animaisData);
    console.log(`${animaisData.length} animais inseridos`);

    // Criar API Keys de demonstração
    const keys = [
      { key: 'biohabitat-demo-key-2024', nome: 'Chave Demo', ativa: true },
      { key: uuidv4(), nome: 'Chave Reserva', ativa: true }
    ];
    const keysInseridas = await ApiKey.insertMany(keys);
    console.log('API Keys criadas:');
    keysInseridas.forEach(k => console.log(`   - ${k.nome}: ${k.key}`));

    // Criar jogadores de exemplo para o ranking
    const jogadoresDemo = [
      { nome: 'Mestre Bio', pontuacao: 1500, acertos: 30, erros: 5, nivel: 5, partidas: 8 },
      { nome: 'Explorer', pontuacao: 950, acertos: 19, erros: 8, nivel: 3, partidas: 5 },
      { nome: 'NaturezaViva', pontuacao: 600, acertos: 12, erros: 10, nivel: 2, partidas: 4 }
    ];
    await Jogador.insertMany(jogadoresDemo);
    console.log('Jogadores de exemplo criados');

    console.log('\nBioHabitat pronto para jogar!');
    console.log('Rode: npm start');
    console.log('Acesse: http://localhost:3000');
    process.exit(0);
  } catch (err) {
    console.error('Erro no seed:', err.message);
    process.exit(1);
  }
}

seed();
