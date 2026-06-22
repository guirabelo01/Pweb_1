const animais = [
  // FÁCIL
  { nome: 'Peixe Palhaço', emoji: '🐠', habitatCorreto: 'Recife de Coral', habitats: ['Recife de Coral', 'Floresta', 'Deserto', 'Montanha'], curiosidade: 'Vive em simbiose com anêmonas-do-mar nos recifes tropicais.', dificuldade: 'facil' },
  { nome: 'Urso Polar', emoji: '🐻‍❄️', habitatCorreto: 'Ártico', habitats: ['Ártico', 'Floresta Tropical', 'Savana', 'Deserto'], curiosidade: 'Sua pele é transparente — parece branca por reflexo da luz.', dificuldade: 'facil' },
  { nome: 'Leão', emoji: '🦁', habitatCorreto: 'Savana', habitats: ['Savana', 'Oceano', 'Tundra', 'Caverna'], curiosidade: 'É o único felino que vive em grupos chamados de alcateias.', dificuldade: 'facil' },
  { nome: 'Golfinho', emoji: '🐬', habitatCorreto: 'Oceano', habitats: ['Oceano', 'Floresta', 'Deserto', 'Montanha'], curiosidade: 'Dorme com metade do cérebro ativo para continuar nadando.', dificuldade: 'facil' },
  { nome: 'Camelo', emoji: '🐪', habitatCorreto: 'Deserto', habitats: ['Deserto', 'Ártico', 'Oceano', 'Pântano'], curiosidade: 'Suas corcovas armazenam gordura, não água.', dificuldade: 'facil' },
  { nome: 'Macaco', emoji: '🐒', habitatCorreto: 'Floresta Tropical', habitats: ['Floresta Tropical', 'Deserto', 'Ártico', 'Oceano'], curiosidade: 'Usam ferramentas e possuem culturas sociais complexas.', dificuldade: 'facil' },
  { nome: 'Pinguim', emoji: '🐧', habitatCorreto: 'Antártica', habitats: ['Antártica', 'Savana', 'Floresta', 'Rio'], curiosidade: 'São excelentes nadadores, mas não conseguem voar.', dificuldade: 'facil' },
  { nome: 'Jacaré', emoji: '🐊', habitatCorreto: 'Pântano', habitats: ['Pântano', 'Deserto', 'Ártico', 'Montanha'], curiosidade: 'Pode ficar sem comer por meses armazenando energia na cauda.', dificuldade: 'facil' },
  { nome: 'Águia', emoji: '🦅', habitatCorreto: 'Montanha', habitats: ['Montanha', 'Oceano', 'Deserto', 'Pântano'], curiosidade: 'Enxerga 4x mais nítido que os humanos.', dificuldade: 'facil' },
  { nome: 'Hipopótamo', emoji: '🦛', habitatCorreto: 'Rio', habitats: ['Rio', 'Ártico', 'Floresta Fria', 'Montanha'], curiosidade: 'Passa até 16 horas por dia submerso para se refrescar.', dificuldade: 'facil' },

  // MÉDIO
  { nome: 'Axolote', emoji: '🦎', habitatCorreto: 'Lago', habitats: ['Lago', 'Deserto', 'Montanha', 'Savana'], curiosidade: 'Pode regenerar membros, coração e partes do cérebro.', dificuldade: 'medio' },
  { nome: 'Pangolim', emoji: '🐾', habitatCorreto: 'Savana', habitats: ['Savana', 'Ártico', 'Oceano', 'Tundra'], curiosidade: 'É o mamífero mais traficado do mundo. Suas escamas são de queratina.', dificuldade: 'medio' },
  { nome: 'Piranha', emoji: '🐟', habitatCorreto: 'Rio', habitats: ['Rio', 'Oceano', 'Lago Gelado', 'Deserto'], curiosidade: 'Apesar da fama, raramente atacam humanos saudáveis.', dificuldade: 'medio' },
  { nome: 'Morcego', emoji: '🦇', habitatCorreto: 'Caverna', habitats: ['Caverna', 'Oceano', 'Ártico', 'Deserto'], curiosidade: 'É o único mamífero capaz de voar de verdade.', dificuldade: 'medio' },
  { nome: 'Lobo', emoji: '🐺', habitatCorreto: 'Floresta Fria', habitats: ['Floresta Fria', 'Recife', 'Oceano', 'Rio'], curiosidade: 'Vivem em alcateias com hierarquia social rígida.', dificuldade: 'medio' },
  { nome: 'Flamingo', emoji: '🦩', habitatCorreto: 'Lago Raso', habitats: ['Lago Raso', 'Floresta', 'Ártico', 'Caverna'], curiosidade: 'Ficam rosados pelo pigmento dos camarões que comem.', dificuldade: 'medio' },
  { nome: 'Tartaruga Marinha', emoji: '🐢', habitatCorreto: 'Oceano', habitats: ['Oceano', 'Floresta', 'Pântano', 'Montanha'], curiosidade: 'Voltam sempre à mesma praia onde nasceram para desovar.', dificuldade: 'medio' },
  { nome: 'Raposa Ártica', emoji: '🦊', habitatCorreto: 'Tundra', habitats: ['Tundra', 'Savana', 'Rio', 'Recife'], curiosidade: 'Muda a cor do pelo entre o verão e o inverno para camuflagem.', dificuldade: 'medio' },
  { nome: 'Capivara', emoji: '🦫', habitatCorreto: 'Pântano', habitats: ['Pântano', 'Ártico', 'Deserto', 'Caverna'], curiosidade: 'É o maior roedor do mundo e vive bem perto da água.', dificuldade: 'medio' },
  { nome: 'Tubarão-Branco', emoji: '🦈', habitatCorreto: 'Oceano', habitats: ['Oceano', 'Rio', 'Lago', 'Pântano'], curiosidade: 'Tem dentes que caem e são substituídos ao longo da vida.', dificuldade: 'medio' },

  // DIFÍCIL
  { nome: 'Ornitorrinco', emoji: '🦆', habitatCorreto: 'Rio', habitats: ['Rio', 'Savana', 'Recife de Coral', 'Tundra'], curiosidade: 'É um mamífero que bota ovos e tem bico de pato.', dificuldade: 'dificil' },
  { nome: 'Dugongo', emoji: '🐘', habitatCorreto: 'Oceano Raso', habitats: ['Oceano Raso', 'Floresta', 'Deserto', 'Montanha'], curiosidade: 'É parente próximo do elefante e inspirou lendas de sereias.', dificuldade: 'dificil' },
  { nome: 'Lince Ibérico', emoji: '🐱', habitatCorreto: 'Floresta Mediterrânea', habitats: ['Floresta Mediterrânea', 'Ártico', 'Oceano', 'Savana'], curiosidade: 'É o felino mais ameaçado do mundo, com menos de 1.000 indivíduos.', dificuldade: 'dificil' },
  { nome: 'Caranguejo Ferradura', emoji: '🦀', habitatCorreto: 'Fundo do Mar', habitats: ['Fundo do Mar', 'Floresta', 'Rio', 'Deserto'], curiosidade: 'Existe há 450 milhões de anos, antes dos dinossauros.', dificuldade: 'dificil' },
  { nome: 'Quokka', emoji: '🦘', habitatCorreto: 'Ilha Costeira', habitats: ['Ilha Costeira', 'Ártico', 'Oceano', 'Caverna'], curiosidade: 'Vive apenas em ilhas da Austrália e é famoso por "sorrir" para fotos.', dificuldade: 'dificil' }
];

module.exports = animais;
