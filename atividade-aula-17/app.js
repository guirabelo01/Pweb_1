const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const API_URL = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const quote = response.data[0];
    res.render('index', { quote, error: null });
  } catch (err) {
    console.error('Erro ao acessar a API:', err.message);
    res.render('index', { quote: null, error: 'Não foi possível buscar a frase. Tente novamente.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});