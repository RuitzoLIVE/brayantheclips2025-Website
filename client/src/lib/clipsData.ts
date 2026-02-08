export interface Clip {
  id: string;
  title: string;
  views: number;
  category: "reactions" | "absurd" | "gameplay" | "community" | "epic" | "dark_humor";
  duration: string;
  date: string;
  clipper: string;
  url: string;
  game?: string;
}

export const clips: Clip[] = [
  {
    id: "1",
    title: "ChingaMadralDeAlertasNomamesBrayanAndasBienIdoCawn",
    views: 128,
    category: "reactions",
    duration: "0:30",
    date: "Last year",
    clipper: "instantclipsbot",
    url: "https://www.twitch.tv/brayanthecrack/clip/CaringShyMelonWOOP-Zjk3T05mTv4Z27Qb",
    game: "Just Chatting"
  },
  {
    id: "2",
    title: "QUE HICISTE QUÉ?",
    views: 105,
    category: "reactions",
    duration: "0:12",
    date: "8 months ago",
    clipper: "duxxo_00",
    url: "https://www.twitch.tv/brayanthecrack/clip/CrispyWittyCarabeefOhMyDog-Y3jxLeDGrjIrNtgb",
  },
  {
    id: "3",
    title: "Cree que ha ganado XD",
    views: 66,
    category: "gameplay",
    duration: "0:39",
    date: "8 months ago",
    clipper: "ruitzolive",
    url: "https://www.twitch.tv/brayanthecrack/clip/BrainyBumblingLampJKanStyle-yB6AT8ylyq56RQqg",
    game: "ROBLOX"
  },
  {
    id: "4",
    title: "youto?",
    views: 65,
    category: "absurd",
    duration: "0:30",
    date: "Last year",
    clipper: "spanixbot",
    url: "https://www.twitch.tv/brayanthecrack/clip/CrepuscularHandsomeAsparagusBrokeBack-VHOyXJnT0rPeVXGk",
  },
  {
    id: "5",
    title: "QUE QUE QUE???",
    views: 63,
    category: "reactions",
    duration: "0:30",
    date: "7 months ago",
    clipper: "sir_ontiver",
    url: "https://www.twitch.tv/brayanthecrack/clip/SillyGracefulTarsierPeanutButterJellyTime-oE_3n3X3Z3j3Z3j3",
  },
  {
    id: "6",
    title: "pro plaier en roblocs",
    views: 50,
    category: "gameplay",
    duration: "0:30",
    date: "3 years ago",
    clipper: "cuddlyantonio",
    url: "https://www.twitch.tv/brayanthecrack/clip/SpicyAntediluvianGullPicoMause-f3g3g3g3g3g3g3g3",
    game: "ROBLOX"
  },
  {
    id: "7",
    title: "*Hace Un Rito Satanico E invoca a Mutumbú*",
    views: 48,
    category: "dark_humor",
    duration: "0:30",
    date: "2 months ago",
    clipper: "ruitzolive",
    url: "https://www.twitch.tv/brayanthecrack/clip/CrispyWittyCarabeefOhMyDog-Y3jxLeDGrjIrNtgb",
    game: "Gartic Phone"
  },
  {
    id: "8",
    title: "TorcionTesticular AAAAAAAAAAAAA🗣️🔥",
    views: 44,
    category: "dark_humor",
    duration: "1:00",
    date: "8 months ago",
    clipper: "ruitzolive",
    url: "https://www.twitch.tv/brayanthecrack/clip/PlacidResourcefulTarsierDuDudu-d3g3g3g3g3g3g3g3",
  },
  {
    id: "9",
    title: "me la pelaste cabron",
    views: 41,
    category: "epic",
    duration: "0:23",
    date: "9 months ago",
    clipper: "mictipup666",
    url: "https://www.twitch.tv/brayanthecrack/clip/GiftedSmellyTarsierFUNgineer-g3g3g3g3g3g3g3g3",
  },
  {
    id: "10",
    title: "Regrese por Decimosexta vez",
    views: 41,
    category: "epic",
    duration: "0:27",
    date: "2 years ago",
    clipper: "cuddlyantonio",
    url: "https://www.twitch.tv/brayanthecrack/clip/TalentedObedientTarsierVoteYea-h3g3g3g3g3g3g3g3",
  },
];

export const categoryLabels: Record<string, string> = {
  reactions: "Reacciones Exageradas",
  absurd: "Momentos Absurdos",
  gameplay: "Momentos de Juego",
  community: "Interacciones con Chat",
  epic: "Momentos Épicos",
  dark_humor: "Humor Oscuro",
};

export const categoryDescriptions: Record<string, string> = {
  reactions: "Gritos y reacciones inesperadas del streamer",
  absurd: "Situaciones extrañas y divertidas sin contexto",
  gameplay: "Jugadas graciosas y errores en videojuegos",
  community: "Interacciones divertidas con la audiencia",
  epic: "Logros, eventos especiales y momentos memorables",
  dark_humor: "Bromas pesadas, sarcasmo e humor oscuro",
};
