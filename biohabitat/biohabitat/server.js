require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado com sucesso'))
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  });

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do view engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rotas de views (páginas EJS)
const viewsRouter = require('./routes/views');
app.use('/', viewsRouter);

// Rotas da API REST
const animaisRouter = require('./routes/animais');
const jogadoresRouter = require('./routes/jogadores');

app.use('/api/animais', animaisRouter);
app.use('/api/jogadores', jogadoresRouter);

// Rota 404 (não encontrada)
app.use((req, res) => {
  res.status(404).render('404');
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`BioHabitat rodando em http://localhost:${PORT}`);
  console.log(`Documentação da API em http://localhost:${PORT}/api-docs`);
});
