export type Project = {
  id: string;
  title: string;
  kind: string;
  year: string;
  summary: string;
  role: string;
  outcome: string;
  demoUrl: string;
  sourceUrl: string;
  previewImage?: string;
  dataNote?: string;
  stack: string[];
  screens: { label: string; caption: string; image?: string }[];
  placement: { left: string; top: string };
};
export type ViewportMode = 'phone' | 'tablet' | 'browser';
export type WorkspaceMode = 'desktop' | 'bench';
export type OpenFile = 'cv' | 'contact' | 'hobbies' | null;
export type FocusedWindow = 'welcome' | 'project' | 'cv' | 'contact' | 'hobbies';
export type BootStage = 'booting' | 'leaving' | 'ready';

export const contactDetails = {
  email: 'potts.darren@gmail.com',
  linkedin: 'https://www.linkedin.com/in/darren-james-potts/',
  instagram: 'https://www.instagram.com/darren_james_potts/',
  github: 'https://github.com/DarrenJPotts',
  phone: '+27 76 659 8703',
  location: 'Pretoria, South Africa',
};

export const projects: Project[] = [
  {
    id: 'seizure-alert',
    title: 'Seizure Alert',
    kind: 'Mobile safety application',
    year: '2026',
    summary:
      'A Flutter app for people with epilepsy and their caregivers, bringing user-started SOS alerts, timed Heads Up check-ins, event logging, and personal insights into one safety workflow.',
    role: 'Product design and engineering across the Flutter client and Firebase backend, including authentication, Firestore data flows, push notifications, and Cloud Functions.',
    outcome:
      'Connects user-initiated alerts with caregiver coordination, event history, and safety planning. The app does not automatically detect seizures or guarantee alert delivery.',
    demoUrl: '',
    sourceUrl: '',
    previewImage: '/seizure-alert-home.png',
    dataNote: 'Screenshots show the Home, SOS, and Daily Log interfaces.',
    stack: [
      'Flutter · Dart',
      'GetX',
      'Firebase Auth · Firestore',
      'FCM · Cloud Functions',
      'Garmin Connect IQ',
    ],
    screens: [
      {
        label: 'Home',
        caption:
          'A patient dashboard with days since the last logged seizure, reminders, daily check-ins, and quick logging actions.',
        image: '/seizure-alert-home.png',
      },
      {
        label: 'SOS',
        caption:
          'A user-started SOS alert with a cancellation countdown, caregiver notification details, and access to Heads Up check-ins.',
        image: '/seizure-alert-sos.png',
      },
      {
        label: 'Daily Log',
        caption:
          'A date-based log for adding seizure events and optional daily check-ins, including sleep and seizure-free reporting.',
        image: '/seizure-alert-daily-log.png',
      },
    ],
    placement: { left: '64%', top: '21%' },
  },
  {
    id: 'handyman',
    title: 'Handyman.co.za',
    kind: 'Service business website',
    year: '2026',
    summary:
      'A responsive website for a Pretoria home and office maintenance business, covering repairs, installations, and renovation services.',
    role: 'React development and responsive website implementation.',
    outcome:
      'Brings service information, recent work, and a direct enquiry path together in one place.',
    demoUrl: 'https://handyman.co.za',
    sourceUrl: 'https://github.com/DarrenJPotts/Handyman.co.za-react',
    stack: ['React', 'Responsive UI', 'Service enquiries'],
    screens: [
      { label: 'Home', caption: 'Introduce the business and its home repair services.' },
      {
        label: 'Services',
        caption: 'Help visitors explore repairs, installations, and maintenance.',
      },
      {
        label: 'Enquiry',
        caption: 'Make it straightforward to get in touch about a job.',
      },
    ],
    placement: { left: '32%', top: '47%' },
  },
];
