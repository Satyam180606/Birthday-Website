export interface PhotoItem {
  id: string;
  image: string;
  alt: string;
  caption: string;
  date?: string;
  objectPosition?: string;
  rotation?: number;
}

export interface ReasonItem {
  id: string;
  title: string;
  image: string;
  objectPosition?: string;
}

export interface ThreeWordsItem {
  word: string;
  description: string;
  image: string;
  objectPosition?: string;
}

export interface VideoItem {
  id: string;
  src: string;
  title: string;
  tag?: string;
  caption: string;
  date?: string;
}

export interface LoveStoryConfig {
  herName: string;
  myName: string;
  birthdayDate: string; // e.g. "27.10.2026"
  
  // Top Banner
  banner: {
    authorTag: string; // "by Satyam"
    badge1: string; // "let's celebrate"
    badge2: string; // "special day"
    title: string; // "A Love Story"
    subtitle: string; // "for your birthday gift"
  };

  // Card 1: Happy Birthday (Wine Crinkled Paper)
  card1: {
    photo: string;
    greeting: string; // "Happy Birthday"
    name: string; // "their name"
    date: string; // "27.10.2026"
    subtextLine1: string; // "Happy Birthday, My Love"
    subtextLine2: string; // "A letter made just for you"
    objectPosition?: string;
  };

  // Card 2: Favorite Person (Cream Paper with Cake)
  card2: {
    titleBold: string; // "Happy Birthday"
    titleRest: string; // "to my favorite person"
    paragraph1: string;
    paragraph2: string;
    stickerPhoto1: string;
    stickerPhoto2: string;
    cakeBadgeText: string;
  };

  // Card 3: One of My Favorite Moments (Wine Linen Paper)
  card3: {
    titlePrefix: string; // "one of my"
    titleItalic: string; // "favorite moments"
    photos: {
      image: string;
      alt: string;
      rotation?: number;
      objectPosition?: string;
    }[];
  };

  // Video Memories (Moving Moments & Reels)
  videoMemories: {
    badge: string;
    titlePrefix: string;
    titleItalic: string;
    subtitle: string;
    instruction: string;
    videos: VideoItem[];
  };

  // Card 4: This Song Reminds Me of You (Wine Linen Paper with Vinyl)
  card4: {
    titlePrefix: string; // "This"
    titleItalic: string; // "song"
    titleSuffix: string; // "reminds me of you"
    instruction: string; // "*click the vinyl to play the song"
    audioSrc: string;
    albumCover: string;
    trackTitle: string;
    artistName: string;
    placeholderMessage: string;
  };

  // Card 5: Reason I Love You (Cream Paper Grid)
  card5: {
    badgeWord: string; // "reason"
    headingRest: string; // "I Love You"
    reasons: ReasonItem[];
  };

  // Card 6: If I Had to Describe You in Three Words (Wine Crinkled Paper)
  card6: {
    heading: string; // "If I Had to Describe You in Three Words"
    words: ThreeWordsItem[];
  };

  // Card 7: A Letter for You (Wine Crinkled Paper with Filmstrip)
  card7: {
    heading: string; // "A Letter for You"
    photos: string[];
    date: string;
    letterParagraphs: string[];
    signOff: string;
    signature: string;
  };

  // Card 8: The Little Things You Do That Make Me Smile (Cream Paper with Camera & Checklist)
  card8: {
    headingPart1: string; // "The Little Things"
    headingPart2: string; // "You Do"
    headingPart3: string; // "That Make"
    headingPart4: string; // "Me Smile"
    cameraPhoto: string;
    noteTitle: string; // "The Little Things"
    bulletPoints: string[];
  };

  // Compatibility aliases for legacy views
  hero: {
    badge: string;
    heading: string;
    subheading: string;
    ctaButton: string;
    photo: string;
    photoAlt: string;
    objectPosition?: string;
  };
  ourWorld: {
    badge: string;
    heading: string;
    subheading: string;
    photos: { id: string; image: string; alt: string; caption: string; date?: string; rotation?: number; objectPosition?: string }[];
  };
  birthdayCard: {
    badge: string;
    headline: string;
    greeting: string;
    letterParagraphs: string[];
    dateDisplay: string;
    photo: string;
    photoCaption: string;
    objectPosition?: string;
  };
  reasons: {
    badge: string;
    heading: string;
    subheading: string;
    items: { id: string; number: string; title: string; description: string; image: string; objectPosition?: string }[];
  };
  music: {
    badge: string;
    heading: string;
    subheading: string;
    trackTitle: string;
    artistName: string;
    audioSrc: string;
    albumCover: string;
    dedicationNote: string;
    placeholderMessage: string;
  };
  threeWords: {
    badge: string;
    heading: string;
    subheading: string;
    words: { word: string; subtext: string; image: string; objectPosition?: string }[];
  };
  loveLetter: {
    badge: string;
    heading: string;
    date: string;
    salutation: string;
    body: string[];
    signOff: string;
    photos: { image: string; caption: string; rotation?: number; objectPosition?: string }[];
  };
  littleThings: {
    badge: string;
    heading: string;
    subheading: string;
    items: { id: string; title: string; note: string; image: string; tag?: string; objectPosition?: string }[];
  };
  final: {
    quoteLine1: string;
    quoteLine2: string;
    birthdayGreeting: string;
    photo: string;
    objectPosition?: string;
    secretButtonText: string;
    secretMessageHeading: string;
    secretMessageBody: string[];
    footerText: string;
  };
}

export const loveStory: LoveStoryConfig = {
  herName: "Ishita",
  myName: "Satyam",
  birthdayDate: "27.10.2026",

  // Top header banner
  banner: {
    authorTag: "by Satyam",
    badge1: "let's celebrate",
    badge2: "this special day",
    title: "A Little World",
    subtitle: "made just for your birthday gift ♥",
  },

  // Card 1: Happy Birthday (Wine Crinkled Paper)
  card1: {
    photo: "/assets/birthday-kiss.jpg",
    greeting: "Happy Birthday",
    name: "Ishita",
    date: "27.10.2026",
    subtextLine1: "Happy Birthday, My Love",
    subtextLine2: "A letter made just for you",
    objectPosition: "center 25%",
  },

  // Card 2: Favorite Person (Cream Paper)
  card2: {
    titleBold: "Happy Birthday",
    titleRest: "to my favorite person",
    paragraph1: "Today is all about celebrating you — the way you smile, the way you care, and the happiness you bring into my life.",
    paragraph2: "I made this letter so you can always remember how loved you are.",
    stickerPhoto1: "/assets/us-together.jpg",
    stickerPhoto2: "/assets/birthday-queen-crown.jpg",
    cakeBadgeText: "HAPPY BIRTHDAY!",
  },

  // Card 3: One of My Favorite Moments (Wine Linen Paper)
  card3: {
    titlePrefix: "one of my",
    titleItalic: "favorite moments",
    photos: [
      {
        image: "/assets/portrait-smile.jpg",
        alt: "Your radiant smile",
        rotation: -4,
        objectPosition: "center 20%",
      },
      {
        image: "/assets/us-together.jpg",
        alt: "Us together",
        rotation: 2,
        objectPosition: "center 25%",
      },
      {
        image: "/assets/birthday-queen-crown.jpg",
        alt: "My birthday queen",
        rotation: -2,
        objectPosition: "center 20%",
      },
      {
        image: "/assets/cozy-smile.jpg",
        alt: "Cutest moments",
        rotation: 3.5,
        objectPosition: "center 25%",
      },
    ],
  },

  // Video Memories: 11 Live Video Clips
  videoMemories: {
    badge: "MOVING MEMORIES",
    titlePrefix: "our moving",
    titleItalic: "moments & reels",
    subtitle: "11 candid clips captured with so much love ♥",
    instruction: "*hover or tap any clip to preview • click to watch full-screen with sound",
    videos: [
      {
        id: "v-1",
        src: "/assets/video-01.mp4",
        title: "Sweet Laughs",
        tag: "Reel 01",
        caption: "The way you laugh melts my heart every single time.",
      },
      {
        id: "v-2",
        src: "/assets/video-02.mp4",
        title: "Just Us Being Silly",
        tag: "Reel 02",
        caption: "Nobody gets my humor or makes me smile like you do.",
      },
      {
        id: "v-3",
        src: "/assets/video-03.mp4",
        title: "Unfiltered Joy",
        tag: "Reel 03",
        caption: "Pure, candid happiness captured on camera.",
      },
      {
        id: "v-4",
        src: "/assets/video-04.mp4",
        title: "A Sweet Glance",
        tag: "Reel 04",
        caption: "That look that always makes my day brighter.",
      },
      {
        id: "v-5",
        src: "/assets/video-05.mp4",
        title: "Precious Moments",
        tag: "Reel 05",
        caption: "Time flies when I am with you, but memories stay forever.",
      },
      {
        id: "v-6",
        src: "/assets/video-06.mp4",
        title: "Playful Vibes",
        tag: "Reel 06",
        caption: "My favorite girl being her cute, authentic self.",
      },
      {
        id: "v-7",
        src: "/assets/video-07.mp4",
        title: "Little Giggles",
        tag: "Reel 07",
        caption: "Every sound of your laughter is music to my ears.",
      },
      {
        id: "v-8",
        src: "/assets/video-08.mp4",
        title: "Forever Mood",
        tag: "Reel 08",
        caption: "Just being near you is my happiest place.",
      },
      {
        id: "v-9",
        src: "/assets/video-09.mp4",
        title: "Special Days",
        tag: "Reel 09",
        caption: "Cherishing every silly and sweet second together.",
      },
      {
        id: "v-10",
        src: "/assets/video-10.mp4",
        title: "Heart to Heart",
        tag: "Reel 10",
        caption: "A memory that I will hold close to my heart forever.",
      },
      {
        id: "v-11",
        src: "/assets/video-11.mp4",
        title: "Always You",
        tag: "Reel 11",
        caption: "My favorite person in the whole universe ♥",
      },
    ],
  },

  // Card 4: This Song Reminds Me of You (Wine Linen Paper with Vinyl)
  card4: {
    titlePrefix: "This",
    titleItalic: "song",
    titleSuffix: "reminds me of you",
    instruction: "*click the vinyl to play the song",
    audioSrc: "/assets/our-song.mp3",
    albumCover: "/assets/us-together.jpg",
    trackTitle: "Our Sweetest Melody",
    artistName: "Satyam & Ishita",
    placeholderMessage: "Our song will play here ♥",
  },

  // Card 5: Reason I Love You (Cream Paper)
  card5: {
    badgeWord: "reason",
    headingRest: "I Love You",
    reasons: [
      {
        id: "r-1",
        title: "Your radiant smile",
        image: "/assets/portrait-smile.jpg",
        objectPosition: "center 20%",
      },
      {
        id: "r-2",
        title: "Your playful heart",
        image: "/assets/birthday-queen-crown.jpg",
        objectPosition: "center 20%",
      },
      {
        id: "r-3",
        title: "Us laughing together",
        image: "/assets/us-together.jpg",
        objectPosition: "center 20%",
      },
      {
        id: "r-4",
        title: "Your gentle warmth",
        image: "/assets/cozy-smile.jpg",
        objectPosition: "center 25%",
      },
      {
        id: "r-5",
        title: "Every hug & kiss",
        image: "/assets/birthday-kiss.jpg",
        objectPosition: "center 25%",
      },
      {
        id: "r-6",
        title: "Everything about you",
        image: "/assets/portrait-smile.jpg",
        objectPosition: "center 25%",
      },
    ],
  },

  // Card 6: If I Had to Describe You in Three Words (Wine Crinkled Paper)
  card6: {
    heading: "If I Had to Describe You in Three Words",
    words: [
      {
        word: "kind",
        description: "You have the biggest heart. You notice little things others miss, and you bring comfort wherever you go.",
        image: "/assets/cozy-smile.jpg",
        objectPosition: "center 25%",
      },
      {
        word: "funny",
        description: "You make every single moment brighter. Your laugh and silly goofy side turn any normal day into pure joy.",
        image: "/assets/birthday-queen-crown.jpg",
        objectPosition: "center 20%",
      },
      {
        word: "breathtaking",
        description: "Inside and out, you take my breath away every single day. Seeing your grace and beauty inspires me always.",
        image: "/assets/portrait-smile.jpg",
        objectPosition: "center 20%",
      },
    ],
  },

  // Card 7: A Letter for You (Wine Crinkled Paper with Filmstrip)
  card7: {
    heading: "A Letter for You",
    photos: [
      "/assets/birthday-kiss.jpg",
      "/assets/portrait-smile.jpg",
      "/assets/us-together.jpg",
      "/assets/birthday-queen-crown.jpg",
    ],
    date: "On your special birthday,",
    letterParagraphs: [
      "I sat down to write this letter wondering how to put feelings into words that never seem big enough to hold them. But more than anything, I want you to know how grateful I am that you were born.",
      "Loving you has been the easiest, most natural thing I have ever done. You have brought so much calm into my world, so much laughter into my quiet hours, and so much sweetness into ordinary days.",
      "Thank you for being my favorite person to talk to, my favorite laugh to listen to, and my favorite hand to hold. As you step into another year of life, I promise to celebrate your wins, stand beside you through the storms, and love you a little more every single morning.",
    ],
    signOff: "Happy Birthday, My Love.",
    signature: "Forever and always, Satyam",
  },

  // Card 8: The Little Things You Do That Make Me Smile (Cream Paper)
  card8: {
    headingPart1: "The Little Things",
    headingPart2: "You Do",
    headingPart3: "That Make",
    headingPart4: "Me Smile",
    cameraPhoto: "/assets/portrait-smile.jpg",
    noteTitle: "The Little Things",
    bulletPoints: [
      "you remember the smallest details",
      "you always check if I'm okay",
      "you make ordinary days feel special",
      "the cute little way you laugh when you're sleepy",
    ],
  },

  // Aliases for legacy views
  hero: {
    badge: "A LITTLE SOMETHING FOR YOU",
    heading: "Happy Birthday, My Love",
    subheading: "A little world made just for you.",
    ctaButton: "Open Your Gift ♥",
    photo: "/assets/birthday-kiss.jpg",
    photoAlt: "The most beautiful smile in the world",
    objectPosition: "center 25%",
  },
  ourWorld: {
    badge: "CHAPTER ONE",
    heading: "A Little World of Us",
    subheading: "Polaroids and frozen moments of our favorite days together.",
    photos: [
      { id: "1", image: "/assets/portrait-smile.jpg", alt: "1", caption: "One of my favorite days.", date: "Sunset", rotation: -2 },
      { id: "2", image: "/assets/us-together.jpg", alt: "2", caption: "A memory I'll keep.", date: "Summer", rotation: 2 },
      { id: "3", image: "/assets/birthday-queen-crown.jpg", alt: "3", caption: "Your smile, every time.", date: "Golden Hour", rotation: -1.5 },
      { id: "4", image: "/assets/cozy-smile.jpg", alt: "4", caption: "Just us, being us.", date: "Sunday", rotation: 3 },
    ],
  },
  birthdayCard: {
    badge: "CELEBRATING YOU",
    headline: "Happy Birthday",
    greeting: "Happy Birthday, My Love",
    letterParagraphs: ["Today is all about celebrating you."],
    dateDisplay: "27.10.2026",
    photo: "/assets/birthday-kiss.jpg",
    photoCaption: "Happy Birthday",
    objectPosition: "center 25%",
  },
  reasons: {
    badge: "CHAPTER THREE",
    heading: "Reasons I Love You",
    subheading: "Six reasons you are everything to me.",
    items: [
      { id: "1", number: "01", title: "Your radiant smile", description: "Your beautiful smile.", image: "/assets/portrait-smile.jpg" },
      { id: "2", number: "02", title: "Your playful heart", description: "Your playful smile.", image: "/assets/birthday-queen-crown.jpg" },
      { id: "3", number: "03", title: "Us laughing together", description: "Us being us.", image: "/assets/us-together.jpg" },
      { id: "4", number: "04", title: "Your gentle warmth", description: "Your comforting warmth.", image: "/assets/cozy-smile.jpg" },
      { id: "5", number: "05", title: "Every hug & kiss", description: "This special moment.", image: "/assets/birthday-kiss.jpg" },
      { id: "6", number: "06", title: "Everything about you", description: "Everything about you.", image: "/assets/portrait-smile.jpg" },
    ],
  },
  music: {
    badge: "A SPECIAL MELODY",
    heading: "This Song Reminds Me of You",
    subheading: "Every note carries a memory.",
    trackTitle: "Our Sweetest Melody",
    artistName: "Satyam & Ishita",
    audioSrc: "/assets/our-song.mp3",
    albumCover: "/assets/us-together.jpg",
    dedicationNote: "Why this song is you.",
    placeholderMessage: "Our song will play here ♥",
  },
  threeWords: {
    badge: "IN ESSENCE",
    heading: "If I Had to Describe You in Three Words",
    subheading: "Words fall short, but...",
    words: [
      { word: "kind", subtext: "You have the biggest heart.", image: "/assets/cozy-smile.jpg" },
      { word: "funny", subtext: "You make anywhere we go bright.", image: "/assets/birthday-queen-crown.jpg" },
      { word: "breathtaking", subtext: "Inside and out, you take my breath away.", image: "/assets/portrait-smile.jpg" },
    ],
  },
  loveLetter: {
    badge: "DEEP FROM THE HEART",
    heading: "A Letter for You",
    date: "On your birthday,",
    salutation: "My Dearest Love,",
    body: ["Loving you is the easiest thing I've ever done."],
    signOff: "With all my love,",
    photos: [
      { image: "/assets/birthday-kiss.jpg", caption: "My heart", rotation: -3 },
      { image: "/assets/portrait-smile.jpg", caption: "Always", rotation: 2 },
    ],
  },
  littleThings: {
    badge: "MOMENTS & DETAILS",
    heading: "The Little Things You Do That Make Me Smile",
    subheading: "The quiet, unscripted moments.",
    items: [
      { id: "1", title: "Remembering details", note: "You remember the smallest details.", image: "/assets/portrait-smile.jpg", tag: "Sweetness" },
      { id: "2", title: "Always checking in", note: "You always check if I'm okay.", image: "/assets/cozy-smile.jpg", tag: "Joy" },
      { id: "3", title: "Ordinary days", note: "You make ordinary days special.", image: "/assets/us-together.jpg", tag: "Sanctuary" },
    ],
  },
  final: {
    quoteLine1: "And if I had to choose all over again,",
    quoteLine2: "I'd still choose you.",
    birthdayGreeting: "Happy Birthday, My Love ♥",
    photo: "/assets/birthday-kiss.jpg",
    secretButtonText: "Read One More Message ♥",
    secretMessageHeading: "A Final Birthday Wish",
    secretMessageBody: ["You are my whole heart."],
    footerText: "Made with all my love.",
  },
};
