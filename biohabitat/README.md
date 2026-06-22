# 🌿 BioHabitat Quest

Jogo de classificação de animais por habitat, desenvolvido com **Node.js, Express, MongoDB, EJS e Bootstrap**.

Projeto da disciplina de **Programação Web — IFCE**.

---

## 🛠️ Tecnologias utilizadas

| Camada | Tecnologia |
|--------|-----------|
| Servidor | Node.js + Express |
| Banco de dados | MongoDB + Mongoose |
| Views | EJS (Embedded JavaScript) |
| Roteamento | Express Router |
| Front-end | Bootstrap 5 + CSS puro + JS vanilla |
| Autenticação | API Keys (middleware customizado) |
| Variáveis de ambiente | dotenv |

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js instalado
- MongoDB rodando localmente (`mongodb://localhost:27017`)

### Passo 1 — Clone ou baixe o projeto

Coloque a pasta `biohabitat` em:
```
C:\Users\Alunos\Documents\biohabitat
```

### Passo 2 — Instale as dependências

Abra o terminal dentro da pasta do projeto e rode:

```bash
npm install
```

### Passo 3 — Configure o ambiente

O arquivo `.env` já está configurado com os valores padrão:

```
MONGODB_URI=mongodb://localhost:27017/biohabitat
PORT=3000
```

Se necessário, edite a URI do MongoDB.

### Passo 4 — Popule o banco de dados

```bash
node seed.js
```

Isso irá criar:
- **25 animais** (fácil, médio e difícil)
- **2 API Keys** (uma delas: `biohabitat-demo-key-2024`)
- **3 jogadores de exemplo** no ranking

### Passo 5 — Inicie o servidor

```bash
npm start
```

Acesse: **http://localhost:3000**

---

## 🎮 Como jogar

1. Acesse `/jogo`
2. Digite seu nome
3. Escolha a dificuldade (Fácil / Médio / Difícil / Todos)
4. Um animal aparece na tela — selecione o habitat correto antes do tempo acabar!
5. Acertos somam pontos (mais difícil = mais pontos)
6. Ao final de 10 questões, sua pontuação é salva no ranking

---

## 📡 API REST

Todas as rotas da API exigem o header:

```
x-api-key: biohabitat-demo-key-2024
```

### Animais

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/animais` | Lista todos (filtros: `?dificuldade=facil&busca=leão`) |
| GET | `/api/animais/aleatorio` | Animal aleatório (`?dificuldade=medio`) |
| GET | `/api/animais/:id` | Animal por ID |
| POST | `/api/animais` | Criar animal |
| PUT | `/api/animais/:id` | Atualizar animal |
| DELETE | `/api/animais/:id` | Remover animal |

### Jogadores

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/jogadores` | Lista todos |
| GET | `/api/jogadores/ranking` | Top 10 |
| GET | `/api/jogadores/:id` | Por ID |
| POST | `/api/jogadores` | Criar/recuperar jogador |
| PUT | `/api/jogadores/:id/pontuacao` | Atualizar pontuação |
| PUT | `/api/jogadores/:id/finalizar` | Finalizar partida |

---

## 📁 Estrutura do projeto

```
biohabitat/
├── data/
│   └── animais.js          # Dados iniciais dos animais
├── middleware/
│   └── apiKeyAuth.js       # Autenticação por API Key
├── models/
│   ├── Animal.js           # Model do animal (Mongoose)
│   ├── Jogador.js          # Model do jogador
│   └── ApiKey.js           # Model da API Key
├── public/
│   ├── css/
│   │   └── style.css       # Estilos customizados
│   └── js/
│       └── jogo.js         # Lógica do jogo (client-side)
├── routes/
│   ├── animais.js          # Rotas da API /api/animais
│   ├── jogadores.js        # Rotas da API /api/jogadores
│   └── views.js            # Rotas das views EJS
├── views/
│   ├── partials/
│   │   ├── header.ejs      # Navbar
│   │   └── footer.ejs      # Rodapé
│   ├── index.ejs           # Página inicial
│   ├── jogo.ejs            # Tela do jogo
│   ├── ranking.ejs         # Ranking de jogadores
│   ├── animais.ejs         # Catálogo de animais
│   ├── api-docs.ejs        # Documentação da API
│   └── 404.ejs             # Página de erro
├── .env                    # Variáveis de ambiente
├── seed.js                 # Script de população do banco
├── server.js               # Entrada principal do servidor
└── package.json
```

---

## 👨‍💻 Autor

Desenvolvido para a disciplina de Programação Web — IFCE  
Conteúdos aplicados: HTML5, CSS, Bootstrap, NPM, Express, Express Router, EJS, MongoDB, Mongoose, Data Access Object, API REST, API Keys, Consumo de APIs.
