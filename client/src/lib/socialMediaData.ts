export interface InstagramReel {
  id: string;
  title: string;
  url: string;
  account: string;
  likes: number;
  date: string;
  description: string;
}

export interface YouTubeVideo {
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
    date: "3 weeks ago",
    description: "Reacción cómica sobre preferencias"
  },
  {
    id: "2",
    title: "Así se ve la soledad si tuviera esquizofrenia XD",
    url: "https://www.instagram.com/reel/DUCy2jWjYiK/",
    account: "@ruitzolive",
    likes: 21,
    date: "1 week ago",
    description: "Clip absurdo del canal de Brayan"
  },
  {
    id: "3",
    title: "Brayan fuera de contexto",
    url: "https://www.instagram.com/reel/DUUdb1zDDsj/",
    account: "@ruitzolive",
    likes: 0,
    date: "4 days ago",
    description: "Momentos graciosos sin contexto"
  },
  {
    id: "4",
    title: "Hell na bro 💀🙏🏻",
    url: "https://www.instagram.com/reel/DT_s04dDPTK/",
    account: "@ruitzolive",
    likes: 0,
    date: "2 weeks ago",
    description: "Reacción épica del streamer"
  },
  {
    id: "5",
    title: "*Hace Un Rito Satanico e invoca a Mutumbú*",
    url: "https://www.instagram.com/p/DJoS0bBRYDk/",
    account: "@ruitzolive",
    likes: 0,
    date: "1 month ago",
    description: "Momento absurdo y cómico"
  },
];

export const youtubeVideos: YouTubeVideo[] = [
  {
    id: "1",
    title: "Youto?",
    url: "https://www.youtube.com/watch?v=p_igwMSNpZU",
    channel: "@RuitClips",
    views: 0,
    date: "Unknown",
    description: "Clip sacado del canal de BrayanTheCrack",
    duration: "0:30"
  },
  {
    id: "2",
    title: "ChingaMadralDeAlertasNomam...",
    url: "https://www.youtube.com/watch?v=QuWAGbro84I",
    channel: "@RuitClips",
    views: 0,
    date: "Unknown",
    description: "Clip del canal de Twitch de Brayan",
    duration: "0:30"
  },
  {
    id: "3",
    title: "Brayan?",
    url: "https://www.youtube.com/watch?v=Zg5iHmCFgFg",
    channel: "@RuitClips",
    views: 0,
    date: "Unknown",
    description: "Clip cómico del streamer",
    duration: "0:30"
  },
  {
    id: "4",
    title: "XD #16 TIKTOKS RANDOM 9",
    url: "https://www.youtube.com/watch?v=e495Xq_AWZM",
    channel: "@RuitzoLIVE",
    views: 0,
    date: "Unknown",
    description: "Compilación de videos random",
    duration: "10:00"
  },
  {
    id: "5",
    title: "Fortnite Perú cuando",
    url: "https://www.youtube.com/watch?v=f4xVDUysan0",
    channel: "@RuitzoLIVE",
    views: 0,
    date: "Unknown",
    description: "Clip del canal de Twitch de Ruitzo",
    duration: "5:00"
  },
];
