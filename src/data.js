export const seasonStats = [
  { label: "Participantes", value: "24" },
  { label: "Episódios", value: "01" },
  { label: "Eliminados", value: "00" },
  { label: "Favoritos", value: "Em votação" }
];

export const posts = [
  {
    id: "revelacao-dos-participantes",
    category: "Anúncio oficial",
    date: "Junho 2026",
    title: "Revelação dos participantes!",
    excerpt:
      "A nova temporada abriu as portas do acampamento e os competidores já estão prontos para causar rivalidades, alianças e muito caos.",
    image: "🎬",
    featured: true,
    content: [
      "A produção do Total Drama RPG - Season 1 finalmente revelou os participantes que vão disputar a temporada.",
      "Cada personagem chega com uma personalidade diferente, um histórico próprio e objetivos que podem mudar completamente o rumo do jogo.",
      "Agora começa a parte mais importante: acompanhar alianças, tretas, provas, favoritismo do público e possíveis eliminações."
    ]
  },
  {
    id: "primeiro-dia-no-acampamento",
    category: "Bastidores",
    date: "Em breve",
    title: "Primeiro dia no acampamento",
    excerpt:
      "Barracas montadas, olhares desconfiados e aquele clima de que ninguém sabe em quem confiar.",
    image: "🏕️",
    featured: false,
    content: [
      "O primeiro dia é sempre o momento em que todo mundo tenta parecer simpático, mas também já observa quem pode virar ameaça.",
      "A apresentadora prepara as primeiras dinâmicas e o clima começa a esquentar entre os grupos.",
      "Será que as primeiras amizades são reais ou apenas estratégia?"
    ]
  },
  {
    id: "quem-merece-vencer",
    category: "Enquete",
    date: "Atualização semanal",
    title: "Quem merece vencer essa temporada?",
    excerpt:
      "A votação do público pode revelar os favoritos antes mesmo das maiores reviravoltas acontecerem.",
    image: "⭐",
    featured: false,
    content: [
      "A enquete de favoritos ajuda a medir quem está conquistando o público e quem precisa correr atrás do prejuízo.",
      "Os votos não garantem vitória, mas podem mostrar quem tem torcida forte dentro da temporada.",
      "Fique de olho: favoritismo demais também pode colocar um alvo nas costas."
    ]
  }
];

export const participants = Array.from({ length: 24 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  const archetypes = [
    "Estrategista",
    "Vilão carismático",
    "Influencer",
    "Atleta",
    "Nerd",
    "Patricinha",
    "Rebelde",
    "Observador"
  ];

  return {
    id: index + 1,
    name: `Participante ${number}`,
    archetype: archetypes[index % archetypes.length],
    status: "No jogo",
    quote: "Pronto para jogar, sobreviver e aparecer.",
    badge: number
  };
});

export const participantes = [
  {
    id: 1,
    nome: "Aaliyah",
    subtitulo: "A Líder Resiliente",
    status: "Em jogo",
    imagem: "/aaliyah.png",
    ordemEliminacao: null,
    posicao: ""
  },
  {
    id: 2,
    nome: "Andre",
    subtitulo: "O Sedutor Midiático",
    status: "Eliminado",
    imagem: "/andre.png",
    ordemEliminacao: 3,
    posicao: "22º"
  },
  {
    id: 3,
    nome: "Arleguatixa",
    subtitulo: "A Alien SuperStar",
    status: "Em jogo",
    imagem: "/arleguatixa.png",
    ordemEliminacao: null,
    posicao: ""
  },
  {
    id: 4,
    nome: "Bento Monteiro",
    subtitulo: "O Sobrevivente do Interior",
    status: "Em jogo",
    imagem: "/bento.png",
    ordemEliminacao: null,
    posicao: ""
  },
  {
    id: 5,
    nome: "Dimitri",
    subtitulo: "O Vilão Elegante",
    status: "Em jogo",
    imagem: "/dimitri.png",
    ordemEliminacao: null,
    posicao: ""
  },
  {
    id: 6,
    nome: "Elisângela",
    subtitulo: "A Serva de Deus",
    status: "Em jogo",
    imagem: "/elisangela.png",
    ordemEliminacao: null,
    posicao: ""
  },
  {
    id: 7,
    nome: "Hikari",
    subtitulo: "A Anti-Heroína",
    status: "Eliminado",
    imagem: "/hikari.png",
    ordemEliminacao: 4,
    posicao: "21º"
  },
  {
    id: 8,
    nome: "Homero",
    subtitulo: "O Estratégico",
    status: "Em jogo",
    imagem: "/homero.png",
    ordemEliminacao: null,
    posicao: ""
  },
  {
    id: 9,
    nome: "Jule",
    subtitulo: "A Víbora Escarlate",
    status: "Eliminado",
    imagem: "/jule.png",
    ordemEliminacao: 1,
    posicao: "24º"
  },
  {
    id: 10,
    nome: "Kaliandra",
    subtitulo: "A Madame dos Vinhedos",
    status: "Em jogo",
    imagem: "/kaliandra.png",
    ordemEliminacao: null,
    posicao: ""
  },
  {
    id: 11,
    nome: "Larys",
    subtitulo: "O Inofensivo Manipulador",
    status: "Em jogo",
    imagem: "/larys.png",
    ordemEliminacao: null,
    posicao: ""
  },
  {
    id: 12,
    nome: "Lívia",
    subtitulo: "A Musa Inteligente",
    status: "Eliminado",
    imagem: "/livia.png",
    ordemEliminacao: 2,
    posicao: "23º"
  },
  {
    id: 13,
    nome: "Love",
    subtitulo: "A Miss Instável",
    status: "Em jogo",
    imagem: "/love.png",
    ordemEliminacao: null,
    posicao: ""
  },
  {
    id: 14,
    nome: "Marjorie",
    subtitulo: "A Influencer Intuitiva",
    status: "Em jogo",
    imagem: "/marjorie.png",
    ordemEliminacao: null,
    posicao: ""
  },
  {
    id: 15,
    nome: "Mark",
    subtitulo: "O Ator Sedutor",
    status: "Em jogo",
    imagem: "/mark.png",
    ordemEliminacao: null,
    posicao: ""
  },
  {
    id: 16,
    nome: "May",
    subtitulo: "A Estrela Otimista",
    status: "Em jogo",
    imagem: "/may.png",
    ordemEliminacao: null,
    posicao: ""
  },
  {
    id: 17,
    nome: "Miss",
    subtitulo: "A Rebelde sem Filtro",
    status: "Em jogo",
    imagem: "/miss.png",
    ordemEliminacao: null,
    posicao: ""
  },
  {
    id: 18,
    nome: "Natte",
    subtitulo: "O Herdeiro Manipulador",
    status: "Em jogo",
    imagem: "/natte.png",
    ordemEliminacao: null,
    posicao: ""
  },
  {
    id: 19,
    nome: "Sexo",
    subtitulo: "O Atleta Sedutor",
    status: "Em jogo",
    imagem: "/sexo.png",
    ordemEliminacao: null,
    posicao: ""
  },
  {
    id: 20,
    nome: "Stella",
    subtitulo: "A Patricinha Rebelde",
    status: "Em jogo",
    imagem: "/stella.png",
    ordemEliminacao: null,
    posicao: ""
  },
  {
    id: 21,
    nome: "Theo",
    subtitulo: "A Fórmula do Caos",
    status: "Em jogo",
    imagem: "/theo.png",
    ordemEliminacao: null,
    posicao: ""
  },
  {
    id: 22,
    nome: "Tiffany",
    subtitulo: "A Patricinha Influenciadora",
    status: "Em jogo",
    imagem: "/tiffany.png",
    ordemEliminacao: null,
    posicao: ""
  },
  {
    id: 23,
    nome: "Vovó",
    subtitulo: "A Vó Trambiqueira",
    status: "Em jogo",
    imagem: "/vovo.png",
    ordemEliminacao: null,
    posicao: ""
  },
  {
    id: 24,
    nome: "Yara",
    subtitulo: "A Rainha do Xadrez",
    status: "Em jogo",
    imagem: "/yara.png",
    ordemEliminacao: null,
    posicao: ""
  }
];

export const eliminated = [];
