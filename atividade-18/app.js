require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.NASA_API_KEY;

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/search', async (req, res) => {
  const astro = req.body.astro.trim().toLowerCase();

  try {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = '2023-01-01';

    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params: {
        api_key: API_KEY,
        start_date: startDate,
        end_date: endDate,
      },
    });

    const images = response.data.filter((item) => {
      const semCopyright = !item.copyright;
      const eFoto = item.media_type === 'image';
      const mencionaAstro =
        item.title.toLowerCase().includes(astro) ||
        item.explanation.toLowerCase().includes(astro);
      return semCopyright && eFoto && mencionaAstro;
    });

    res.render('results', { images, astro: req.body.astro });
  } catch (err) {
    console.error('Erro ao acessar a NASA API:', err.message);
    res.render('results', { images: [], astro: req.body.astro });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});