export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  duration: string;
  videoUrl: string | null; // null = Woolen Gang link pending
  thumbnailColor: string;
  tags: string[];
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  {id: 'all', label: 'All', icon: 'view-grid', color: '#8B5CF6'},
  {id: 'cast-on', label: 'Cast On', icon: 'link-variant', color: '#EC4899'},
  {id: 'knit-purl', label: 'Knit & Purl', icon: 'needle', color: '#6366F1'},
  {id: 'bind-off', label: 'Bind Off', icon: 'content-cut', color: '#14B8A6'},
  {id: 'cables', label: 'Cables', icon: 'rope', color: '#F59E0B'},
  {id: 'lace', label: 'Lace', icon: 'flower', color: '#EC4899'},
  {id: 'colorwork', label: 'Colorwork', icon: 'palette', color: '#10B981'},
  {id: 'fixing', label: 'Fix Mistakes', icon: 'wrench', color: '#EF4444'},
];

// Placeholder tutorials — video URLs will be populated from Woolen Gang
export const TUTORIALS: Tutorial[] = [
  // Cast On
  {
    id: 'co-01',
    title: 'Long Tail Cast On',
    description:
      'The most popular cast on method. Creates a neat, stretchy edge that works for almost any project. Perfect for beginners.',
    category: 'cast-on',
    difficulty: 'Beginner',
    duration: '8 min',
    videoUrl: null,
    thumbnailColor: '#EC4899',
    tags: ['foundation', 'beginner', 'stretchy'],
  },
  {
    id: 'co-02',
    title: 'German Twisted Cast On',
    description:
      'Creates an extra-stretchy edge ideal for ribbing and sock cuffs. A step up from the long tail cast on.',
    category: 'cast-on',
    difficulty: 'Intermediate',
    duration: '10 min',
    videoUrl: null,
    thumbnailColor: '#EC4899',
    tags: ['stretchy', 'socks', 'ribbing'],
  },
  {
    id: 'co-03',
    title: 'Provisional Cast On',
    description:
      'A temporary cast on that allows you to knit in both directions. Essential for seamless construction.',
    category: 'cast-on',
    difficulty: 'Intermediate',
    duration: '12 min',
    videoUrl: null,
    thumbnailColor: '#EC4899',
    tags: ['seamless', 'provisional', 'grafting'],
  },
  {
    id: 'co-04',
    title: 'Knitted Cast On',
    description:
      'Great for adding stitches mid-project or for beginners learning the basics of forming stitches.',
    category: 'cast-on',
    difficulty: 'Beginner',
    duration: '6 min',
    videoUrl: null,
    thumbnailColor: '#EC4899',
    tags: ['beginner', 'mid-project'],
  },

  // Knit & Purl
  {
    id: 'kp-01',
    title: 'Continental vs. English Style',
    description:
      'Learn the two main methods of holding yarn and picking stitches. Find out which style suits you.',
    category: 'knit-purl',
    difficulty: 'Beginner',
    duration: '14 min',
    videoUrl: null,
    thumbnailColor: '#6366F1',
    tags: ['knit stitch', 'purl stitch', 'technique', 'beginner'],
  },
  {
    id: 'kp-02',
    title: 'Purl Stitch Masterclass',
    description:
      'Break down the purl stitch step by step. Tips for keeping even tension and avoiding loose purls.',
    category: 'knit-purl',
    difficulty: 'Beginner',
    duration: '10 min',
    videoUrl: null,
    thumbnailColor: '#6366F1',
    tags: ['purl', 'tension', 'beginner'],
  },
  {
    id: 'kp-03',
    title: 'k2tog, ssk, and Other Decreases',
    description:
      'Master the most common decrease techniques used in shaping sleeves, necklines, and lace patterns.',
    category: 'knit-purl',
    difficulty: 'Intermediate',
    duration: '15 min',
    videoUrl: null,
    thumbnailColor: '#6366F1',
    tags: ['decrease', 'shaping', 'k2tog', 'ssk'],
  },
  {
    id: 'kp-04',
    title: 'Yarn Overs and Increases',
    description:
      'Learn M1L, M1R, KFB, and yarn over increases. Know when to use each one for the cleanest results.',
    category: 'knit-purl',
    difficulty: 'Intermediate',
    duration: '13 min',
    videoUrl: null,
    thumbnailColor: '#6366F1',
    tags: ['increase', 'yarn over', 'lace', 'shaping'],
  },

  // Bind Off
  {
    id: 'bo-01',
    title: 'Basic Bind Off',
    description:
      'The classic method every knitter needs. Works for most projects and gives a clean, simple edge.',
    category: 'bind-off',
    difficulty: 'Beginner',
    duration: '7 min',
    videoUrl: null,
    thumbnailColor: '#14B8A6',
    tags: ['beginner', 'finishing'],
  },
  {
    id: 'bo-02',
    title: 'Stretchy Bind Off (Jeny\'s)',
    description:
      'Jeny\'s Surprisingly Stretchy Bind Off — the go-to for necklines, cuffs, and anything that needs to stretch.',
    category: 'bind-off',
    difficulty: 'Intermediate',
    duration: '9 min',
    videoUrl: null,
    thumbnailColor: '#14B8A6',
    tags: ['stretchy', 'neckline', 'socks'],
  },
  {
    id: 'bo-03',
    title: 'Three-Needle Bind Off',
    description:
      'Join two sets of live stitches together seamlessly. Perfect for shoulder seams and avoiding grafting.',
    category: 'bind-off',
    difficulty: 'Intermediate',
    duration: '11 min',
    videoUrl: null,
    thumbnailColor: '#14B8A6',
    tags: ['seaming', 'shoulder', 'joining'],
  },

  // Cables
  {
    id: 'ca-01',
    title: 'Introduction to Cables',
    description:
      'Learn how cables are formed by crossing groups of stitches. Start with a simple 6-stitch cable.',
    category: 'cables',
    difficulty: 'Intermediate',
    duration: '16 min',
    videoUrl: null,
    thumbnailColor: '#F59E0B',
    tags: ['cables', 'cable needle', 'twist'],
  },
  {
    id: 'ca-02',
    title: 'Cables Without a Cable Needle',
    description:
      'Speed up your cable knitting with this needle-free technique. Drop the extra needle and never look back.',
    category: 'cables',
    difficulty: 'Intermediate',
    duration: '12 min',
    videoUrl: null,
    thumbnailColor: '#F59E0B',
    tags: ['cables', 'advanced technique', 'speed'],
  },
  {
    id: 'ca-03',
    title: 'Reading Cable Charts',
    description:
      'Decode cable charts with confidence. Understand symbols, repeats, and how to follow a complex cable pattern.',
    category: 'cables',
    difficulty: 'Intermediate',
    duration: '18 min',
    videoUrl: null,
    thumbnailColor: '#F59E0B',
    tags: ['charts', 'cables', 'reading patterns'],
  },

  // Lace
  {
    id: 'la-01',
    title: 'Introduction to Lace Knitting',
    description:
      'Your first lace project. Learn to read lace charts, use stitch markers, and keep track of your place.',
    category: 'lace',
    difficulty: 'Intermediate',
    duration: '20 min',
    videoUrl: null,
    thumbnailColor: '#EC4899',
    tags: ['lace', 'charts', 'beginner lace'],
  },
  {
    id: 'la-02',
    title: 'Lifelines in Lace',
    description:
      'Never fear ripping back lace again. Learn to add lifelines so you always have a safety net.',
    category: 'lace',
    difficulty: 'Intermediate',
    duration: '8 min',
    videoUrl: null,
    thumbnailColor: '#EC4899',
    tags: ['lace', 'lifeline', 'frogging', 'safety'],
  },

  // Colorwork
  {
    id: 'cw-01',
    title: 'Stranded Colorwork Basics',
    description:
      'Get started with fair isle and stranded colorwork. Learn to carry yarn floats and manage two colors at once.',
    category: 'colorwork',
    difficulty: 'Intermediate',
    duration: '22 min',
    videoUrl: null,
    thumbnailColor: '#10B981',
    tags: ['colorwork', 'fair isle', 'stranded', 'floats'],
  },
  {
    id: 'cw-02',
    title: 'Intarsia Colorwork',
    description:
      'Unlike stranded knitting, intarsia uses separate yarn for each color block. Great for bold, graphic designs.',
    category: 'colorwork',
    difficulty: 'Advanced',
    duration: '25 min',
    videoUrl: null,
    thumbnailColor: '#10B981',
    tags: ['colorwork', 'intarsia', 'color blocks'],
  },
  {
    id: 'cw-03',
    title: 'Carrying Yarn Up the Side',
    description:
      'Working stripes? Learn to carry yarn up the edge neatly instead of cutting and rejoining each time.',
    category: 'colorwork',
    difficulty: 'Beginner',
    duration: '9 min',
    videoUrl: null,
    thumbnailColor: '#10B981',
    tags: ['stripes', 'carrying yarn', 'colorwork'],
  },

  // Fixing Mistakes
  {
    id: 'fx-01',
    title: 'Fixing a Dropped Stitch',
    description:
      'Don\'t panic — dropped stitches are fixable! Learn to use a crochet hook to pick up knit and purl stitches.',
    category: 'fixing',
    difficulty: 'Beginner',
    duration: '10 min',
    videoUrl: null,
    thumbnailColor: '#EF4444',
    tags: ['dropped stitch', 'fix', 'rescue'],
  },
  {
    id: 'fx-02',
    title: 'How to Frog (Rip Back)',
    description:
      'Ripping out rows the right way. Learn to safely frog your work and get your stitches back on the needle cleanly.',
    category: 'fixing',
    difficulty: 'Beginner',
    duration: '8 min',
    videoUrl: null,
    thumbnailColor: '#EF4444',
    tags: ['frogging', 'tinking', 'rip back', 'mistakes'],
  },
  {
    id: 'fx-03',
    title: 'Tinking (Unknitting) Stitch by Stitch',
    description:
      'When you only need to undo a few stitches, tink instead of frog. Master backwards knitting for surgical corrections.',
    category: 'fixing',
    difficulty: 'Beginner',
    duration: '7 min',
    videoUrl: null,
    thumbnailColor: '#EF4444',
    tags: ['tinking', 'unknitting', 'mistakes', 'careful'],
  },
  {
    id: 'fx-04',
    title: 'Fixing a Twisted Stitch',
    description:
      'Twisted stitches are sneaky — learn to spot them and fix them without ripping back.',
    category: 'fixing',
    difficulty: 'Intermediate',
    duration: '9 min',
    videoUrl: null,
    thumbnailColor: '#EF4444',
    tags: ['twisted stitch', 'fix', 'tension'],
  },
  {
    id: 'fx-05',
    title: 'Fixing a Yarn Over Mistake',
    description:
      'Accidental yarn overs create extra stitches and holes. Here\'s how to spot and remove them cleanly.',
    category: 'fixing',
    difficulty: 'Intermediate',
    duration: '11 min',
    videoUrl: null,
    thumbnailColor: '#EF4444',
    tags: ['yarn over', 'extra stitch', 'lace mistakes'],
  },
];
