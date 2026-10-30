// Replace the sample content here with your own projects and contact details.
export const profile = {
  name: 'Darren Potts',
  github: '', // Add your GitHub username before publishing.
  email: '', // Add your email address to enable the email contact button.
  headline: 'Mobile developer & creative thinker',
  summary:
    'A mobile developer passionate about thoughtful apps, fluid interactions, and the small details that make a product feel right.',
  cvPdf: '', // Optional: put your CV in public/ and set this to '/darren-potts-cv.pdf'.
  skills: [
    'Mobile development',
    'UI implementation',
    'API integration',
    'Animation',
    'Testing',
  ],
};

export const experience = [
  {
    id: 'experience-template',
    role: 'Your role goes here',
    organization: 'Company or independent work',
    period: 'Add your dates',
    sample: true,
    description:
      'Replace this example with your professional, freelance, or open-source experience.',
    contributions: [
      'Describe what you built and the responsibilities you owned.',
      'Explain a technical challenge and how you approached it.',
      'Add an outcome you can substantiate.',
    ],
  },
];

export const education: { qualification: string; institution: string; period: string }[] =
  [];

export const caseStudies: Record<
  string,
  { problem: string; contribution: string; decisions: string[]; outcome: string }
> = {
  canvas: {
    problem:
      'Sample brief: create a responsive home for a creative business and its work.',
    contribution: 'Describe the pages, components, and integrations you built.',
    decisions: [
      'Explain your responsive layout and accessibility choices.',
      'Describe your approach to rendering, performance, and content management.',
    ],
    outcome: 'Add real results and lessons from the website you built.',
  },
  orbit: {
    problem:
      'Sample brief: bring scattered tasks and project notes into one focused workspace.',
    contribution:
      'Describe the parts you personally designed or implemented, and distinguish your work from the rest of the team.',
    decisions: [
      'Explain how you organized the application and why.',
      'Describe your approach to state, data, and accessible interactions.',
    ],
    outcome:
      'Add real outcomes, what you learned, and what you would improve. This concept has no claimed production results.',
  },
  frequency: {
    problem: 'Sample brief: help listeners find music beyond their usual rotation.',
    contribution: 'Describe your actual role in the discovery flow and API integration.',
    decisions: [
      'Explain how you handled API loading, failures, and empty results.',
      'Describe a usability or performance tradeoff you made.',
    ],
    outcome: 'Replace this with actual observations and lessons from your project.',
  },
  playground: {
    problem:
      'Sample brief: explore how small interactions can make an interface more expressive.',
    contribution:
      'Describe the interactions you created and what you wanted to investigate.',
    decisions: [
      'Explain the animation technique you chose.',
      'Describe how you supported touch, keyboard input, and reduced motion.',
    ],
    outcome:
      'Share what you learned and which experiments you would use in a production interface.',
  },
};

export const projects = [
  {
    id: 'canvas',
    title: 'Canvas',
    kind: 'web',
    type: 'WEB APPLICATION',
    category: 'Apps',
    platforms: ['Web'],
    visual: 'canvas',
    narrative: 'Meanwhile, back at the browser...',
    description: 'A responsive space for creative work, from desktop to pocket.',
    stack: ['Next.js', 'TypeScript', 'CSS'],
    detail:
      'A sample web project. Replace this with your website, your contribution, and the technical decisions behind it.',
    demo: '',
    source: '',
    appStore: '',
    playStore: '',
    screens: [
      { label: 'Landing page', src: '' },
      { label: 'Work gallery', src: '' },
      { label: 'Project page', src: '' },
    ],
  },
  {
    id: 'orbit',
    title: 'Orbit',
    kind: 'mobile',
    type: 'MOBILE APPLICATION',
    category: 'Apps',
    platforms: ['iOS', 'Android'],
    visual: 'orbit',
    narrative: 'Meanwhile, on a phone full of big ideas...',
    description: 'A little space for big ideas, wherever the day takes you.',
    stack: ['Mobile UI', 'Local storage', 'Notifications'],
    detail:
      'A sample mobile workspace concept. Replace this with your app, your contribution, and the decisions behind it.',
    demo: '',
    source: '',
    appStore: '',
    playStore: '',
    screens: [
      { label: 'Welcome', src: '' },
      { label: 'Home', src: '' },
      { label: 'Project detail', src: '' },
    ],
  },
  {
    id: 'frequency',
    title: 'Frequency',
    kind: 'mobile',
    type: 'MOBILE APPLICATION',
    category: 'Apps',
    platforms: ['iOS'],
    visual: 'frequency',
    narrative: 'Later, somewhere between one song and the next...',
    description: 'Music discovery made for a tap, a swipe, and a new favorite.',
    stack: ['Mobile UI', 'API integration', 'Audio'],
    detail:
      'A sample music discovery app. Replace this with the problem your app solves, its architecture, and what you learned.',
    demo: '',
    source: '',
    appStore: '',
    playStore: '',
    screens: [
      { label: 'Discover', src: '' },
      { label: 'Now playing', src: '' },
      { label: 'Library', src: '' },
    ],
  },
  {
    id: 'playground',
    title: 'The playground',
    kind: 'mobile',
    type: 'MOBILE EXPERIMENT',
    category: 'Experiments',
    platforms: ['Android'],
    visual: 'playground',
    narrative: 'One stubborn interaction later...',
    description: 'Small interactions, expressive motion, and happy accidents.',
    stack: ['Gestures', 'Animation', 'Prototyping'],
    detail:
      'A sample collection of mobile interactions. Add your own experiments, recordings, and what you explored.',
    demo: '',
    source: '',
    appStore: '',
    playStore: '',
    screens: [
      { label: 'Gesture study', src: '' },
      { label: 'Transition study', src: '' },
      { label: 'Navigation study', src: '' },
    ],
  },
];

// These are editable capability examples, not claims about specific experience.
export const capabilities = [
  {
    title: 'Interfaces & motion',
    description:
      'Thoughtful layouts, fluid transitions, and interactions that feel at home on a phone.',
    tags: ['UI implementation', 'Animation', 'Accessibility'],
  },
  {
    title: 'Beyond the screen',
    description: 'Connecting the interface to the device and the world around it.',
    tags: ['Notifications', 'Camera & location', 'Device APIs'],
  },
  {
    title: 'Data that travels',
    description:
      'Keeping apps useful through slow connections and everyday interruptions.',
    tags: ['API integration', 'Offline storage', 'State management'],
  },
  {
    title: 'Ready for real life',
    description: 'Taking an idea through testing, refinement, and release.',
    tags: ['Testing', 'Performance', 'App releases'],
  },
];

export const experiments = [
  {
    title: 'Swipe with intent',
    category: 'GESTURES',
    description: 'A place for a swipe interaction recording.',
    video: '',
  },
  {
    title: 'A smoother handoff',
    category: 'TRANSITIONS',
    description: 'A place for a shared-element transition recording.',
    video: '',
  },
  {
    title: 'Navigation, reimagined',
    category: 'NAVIGATION',
    description: 'A place for an experimental navigation recording.',
    video: '',
  },
];
