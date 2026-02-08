export interface InstagramReel {
  id: string;
  title: string;
  url: string;
  account: string;
  likes: number;
  reposts: number;
  shares: number;
  date: string;
  description: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  channel: string;
  views: number;
  likes: number;
  comments: number;
  date: string;
  description: string;
  duration: string;
}

export interface TwitchClip {
  id: string;
  title: string;
  url: string;
  channel: string;
  views: number;
  date: string;
  description: string;
  duration: string;
}

export const instagramReels: InstagramReel[] = [
  {
    id: "1",
    title: "Que te gusta el que?",
    url: "https://www.instagram.com/reel/DTjuBScDOjl/",
    account: "@ruitzolive",
    likes: 16,
    reposts: 3,
    shares: 5,
    date: "3 weeks ago",
    description: "Reacción cómica sobre preferencias"
  },
  {
    id: "2",
    title: "Así se ve la soledad si tuviera esquizofrenia XD",
    url: "https://www.instagram.com/reel/DUCy2jWjYiK/",
    account: "@ruitzolive",
    likes: 21,
    reposts: 8,
    shares: 12,
    date: "1 week ago",
    description: "Clip absurdo del canal de Brayan"
  },
  {
    id: "3",
    title: "Brayan fuera de contexto",
    url: "https://www.instagram.com/reel/DUUdb1zDDsj/",
    account: "@ruitzolive",
    likes: 0,
    reposts: 0,
    shares: 2,
    date: "4 days ago",
    description: "Momentos graciosos sin contexto"
  },
  {
    id: "4",
    title: "Hell na bro 💀🙏🏻",
    url: "https://www.instagram.com/reel/DT_s04dDPTK/",
    account: "@ruitzolive",
    likes: 0,
    reposts: 1,
    shares: 3,
    date: "2 weeks ago",
    description: "Reacción épica del streamer"
  },
  {
    id: "5",
    title: "*Hace Un Rito Satanico e invoca a Mutumbú*",
    url: "https://www.instagram.com/p/DJoS0bBRYDk/",
    account: "@ruitzolive",
    likes: 0,
    reposts: 0,
    shares: 1,
    date: "1 month ago",
    description: "Momento absurdo y cómico"
  },
];

export const youtubeVideos: YouTubeVideo[] = [
  {
    id: "1",
    title: "Brayan?",
    url: "https://www.youtube.com/watch?v=Zg5iHmCFgFg",
    channel: "@RuitClips",
    views: 189,
    likes: 14,
    comments: 3,
    date: "3 weeks ago",
    description: "Clip cómico del streamer",
    duration: "0:30"
  },
  {
    id: "2",
    title: "XD #16 TIKTOKS RANDOM 9",
    url: "https://www.youtube.com/watch?v=e495Xq_AWZM",
    channel: "@RuitzoLIVE",
    views: 1240,
    likes: 67,
    comments: 32,
    date: "2 weeks ago",
    description: "Compilación de videos random",
    duration: "10:00"
  },
  {
    id: "3",
    title: "Fortnite Perú cuando",
    url: "https://www.youtube.com/watch?v=f4xVDUysan0",
    channel: "@RuitzoLIVE",
    views: 856,
    likes: 45,
    comments: 18,
    date: "1 week ago",
    description: "Clip del canal de Twitch de Ruitzo",
    duration: "5:00"
  },
  {
    id: "4",
    title: "Reacción a videos virales",
    url: "https://www.youtube.com/watch?v=abc123def",
    channel: "@RuitzoLIVE",
    views: 567,
    likes: 32,
    comments: 14,
    date: "3 days ago",
    description: "Reacción a contenido viral",
    duration: "8:30"
  },
  {
    id: "5",
    title: "Gaming en vivo",
    url: "https://www.youtube.com/watch?v=ghi456jkl",
    channel: "@RuitClips",
    views: 423,
    likes: 28,
    comments: 11,
    date: "1 week ago",
    description: "Momentos graciosos jugando",
    duration: "12:15"
  },
];

export const twitchClips: TwitchClip[] = [
  {
    id: "1",
    title: "ChingaMadralDeAlertasNomamesBrayanAndasBienIdoCawn",
    url: "https://www.twitch.tv/brayanthecrack/clip/ChingaMadralDeAlertasNomamesBrayanAndasBienIdoCawn",
    channel: "@brayanthecrack",
    views: 128,
    date: "Last year",
    description: "Reacción exagerada del streamer",
    duration: "0:30"
  },
  {
    id: "2",
    title: "QUE HICISTE QUÉ?",
    url: "https://www.twitch.tv/brayanthecrack/clip/QUEHICISTEQU",
    channel: "@brayanthecrack",
    views: 105,
    date: "8 months ago",
    description: "Momento cómico del canal",
    duration: "0:12"
  },
  {
    id: "3",
    title: "Cree que ha ganado XD",
    url: "https://www.twitch.tv/brayanthecrack/clip/CreequehagagnadoXD",
    channel: "@brayanthecrack",
    views: 66,
    date: "8 months ago",
    description: "Momento épico en ROBLOX",
    duration: "0:39"
  },
  {
    id: "4",
    title: "youto?",
    url: "https://www.twitch.tv/brayanthecrack/clip/youto",
    channel: "@brayanthecrack",
    views: 65,
    date: "Last year",
    description: "Momento absurdo",
    duration: "0:30"
  },
  {
    id: "5",
    title: "QUE QUE QUE???",
    url: "https://www.twitch.tv/brayanthecrack/clip/QUEQUEQU",
    channel: "@brayanthecrack",
    views: 63,
    date: "7 months ago",
    description: "Reacción sorprendida",
    duration: "0:30"
  },
];
