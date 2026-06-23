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
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/aaliyah.png"
  },
  {
    id: 2,
    nome: "André",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/andre.png"
  },
  {
    id: 3,
    nome: "Arleguatixa",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/arleguatixa.png"
  },
  {
    id: 4,
    nome: "Bento Monteiro",
    subtitulo: "O Sobrevivente do Interior",
    status: "Em jogo",
    imagem: "/bento.png"
  },
  {
    id: 5,
    nome: "Dimitri",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/dimitri.png"
  },
  {
    id: 6,
    nome: "Elisângela",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/elisangela.png"
  },
  {
    id: 7,
    nome: "Hikari",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/hikari.png"
  },
  {
    id: 8,
    nome: "Homero",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/homero.png"
  },
  {
    id: 9,
    nome: "Jule",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/jule.png"
  },
  {
    id: 10,
    nome: "Kaliandra",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/kaliandra.png"
  },
  {
    id: 11,
    nome: "Larys",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/larys.png"
  },
  {
    id: 12,
    nome: "Lívia",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/livia.png"
  },
  {
    id: 13,
    nome: "Love",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/love.png"
  },
  {
    id: 14,
    nome: "Marjorie",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/marjorie.png"
  },
  {
    id: 15,
    nome: "Mark",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/mark.png"
  },
  {
    id: 16,
    nome: "May",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/may.png"
  },
  {
    id: 17,
    nome: "Miss",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/miss.png"
  },
  {
    id: 18,
    nome: "Natte",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/natte.png"
  },
  {
    id: 19,
    nome: "Sexo",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/sexo.png"
  },
  {
    id: 20,
    nome: "Stella",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/stella.png"
  },
  {
    id: 21,
    nome: "Theo",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/theo.png"
  },
  {
    id: 22,
    nome: "Tiffany",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/tiffany.png"
  },
  {
    id: 23,
    nome: "Vovô",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/vovo.png"
  },
  {
    id: 24,
    nome: "Yara",
    subtitulo: "Participante da temporada",
    status: "Em jogo",
    imagem: "/yara.png"
  }
];

export const eliminated = [];
