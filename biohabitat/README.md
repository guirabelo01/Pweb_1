# BioHabitat Quest

Jogo de classificação de animais por habitat. Projeto da disciplina de Programação Web - IFCE.

O jogador recebe um animal e precisa escolher o habitat correto entre as opções. Acertos somam pontos, que ficam salvos no banco e aparecem no ranking.

## Tecnologias

- Node.js + Express
- MongoDB + Mongoose
- EJS
- Bootstrap 5

## Como rodar

1. Instalar dependências:
```
npm install
```

2. Criar o arquivo `.env` na raiz do projeto:
```
MONGODB_URI=sua_connection_string_do_mongodb
PORT=3000
```

3. Popular o banco com os dados iniciais (animais, API keys, jogadores de exemplo):
```
node seed.js
```

4. Iniciar o servidor:
```
npm start
```

5. Acessar em `http://localhost:3000`

## Estrutura

```
biohabitat/
├── data/animais.js        - dados iniciais dos animais
├── middleware/             - autenticação por API key
├── models/                 - schemas do MongoDB (Animal, Jogador, ApiKey)
├── public/css e js/        - estilos e lógica do jogo no navegador
├── routes/                 - rotas da API e das páginas
├── views/                  - templates EJS
├── seed.js                 - popula o banco
└── server.js               - arquivo principal
```

## API

Rotas em `/api/animais` e `/api/jogadores`, autenticadas via header `x-api-key`.

Endpoints principais:
- `GET /api/animais` - lista os animais
- `GET /api/animais/aleatorio` - retorna um animal aleatório (usado pelo jogo)
- `POST /api/jogadores` - cria/recupera um jogador
- `PUT /api/jogadores/:id/pontuacao` - atualiza pontuação após resposta

Documentação completa disponível em `/api-docs` enquanto o servidor estiver rodando.