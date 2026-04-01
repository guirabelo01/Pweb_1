const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Acessou: ${req.method} ${req.url}`);
    next();
});

function page(nome) {
    return (req, res) => {
        res.send(`<h1>Página: ${nome}</h1>`);
    };
}

app.get('/', (req, res) => {
    res.send('<h1>Home</h1>');
});

app.get('/about', page('About'));

app.post('/data', (req, res) => {
    res.send('<h1>POST recebido</h1>');
});

app.get('/users', page('Users'));

app.get('/users/:userid', (req, res) => {
    const { userid } = req.params;
    res.send(`<h1>Bem-vindo, usuário ${userid}</h1>`);
});

app.get('/users/', (req, res) => {
    res.redirect('/signup');
});

app.get('/signin', (req, res) => {
    res.send('<h1>Sign In</h1>');
});

app.get('/signup', (req, res) => {
    res.send('<h1>Sign Up</h1>');
});

app.use((req, res) => {
    res.status(404).send('<h1>404 - Página não encontrada</h1>');
});

app.listen(PORT, () => {
    console.log(`Rodando em http://localhost:${PORT}`);
});