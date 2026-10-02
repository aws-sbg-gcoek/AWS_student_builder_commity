export interface EventScheduleItem {
  time: string;
  title: string;
  desc: string;
}

export interface AppEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  desc: string;
  type: string;
  status: 'upcoming' | 'past';
  link?: string;
  meetLink?: string;
  whatsappLink?: string;
  image?: string;
  isFeatured?: boolean;
  highlights?: string[];
  schedule?: EventScheduleItem[];
}

export const eventsData: AppEvent[] = [
  {
    id: 'chai-coffee-aws-2026',
    title: 'Chai, Coffee & AWS — Annual Community Meet',
    date: '05 Sep 2026',
    time: '11:00 AM – 1:00 PM',
    location: 'GCOE Kolhapur',
    desc: "Join us for the AWS Student Builder Group Annual Community Meet as we celebrate a year of growth, achievements, and community building. This meetup is an opportunity to look back on our journey, recognize the contributions of our core team and active members, welcome new members, and discuss our vision for the upcoming year.",
    type: 'Meetup',
    status: 'past',
    isFeatured: false,
    link: 'https://www.meetup.com/aws-sbg-at-government-college-of-engineering-kolhapur/events/316417643/',
    image: 'https://secure.meetupstatic.com/photos/event/1/1/f/1/600_535984593.jpeg',
    highlights: [
      'Year in Review — highlights, milestones & community growth',
      'Core Team Swag Distribution & Recognition',
      'Signup Challenge Winner Recognition',
      'New Member Introductions & community connection',
      'Future Roadmap — Hackathon 2026, AWS Community Day, Technical Workshops',
      'AWS Student Opportunities — Skill Builder, Educate & Certifications',
      'Fun Team-based AWS Quiz with goodies for winners',
      'Open Discussion, Q&A, Tea/Coffee & Networking',
    ],
    schedule: [
      { time: '11:00 AM', title: 'Welcome & Opening Remarks', desc: 'Kick-off by the organising team with a warm welcome to all attendees, new and returning.' },
      { time: '11:10 AM', title: 'Year in Review', desc: 'Highlights from the past year — community achievements, event milestones, and the overall growth of AWS SBG at GCOEK.' },
      { time: '11:25 AM', title: 'Core Team Recognition', desc: 'Swag distribution and special recognition for core team members and top contributors.' },
      { time: '11:40 AM', title: 'New Member Introductions & Signup Challenge Winners', desc: 'Welcoming new builders to the community and announcing winners of the Signup Challenge.' },
      { time: '11:55 AM', title: 'Future Roadmap & AWS Student Benefits', desc: 'Discussion of upcoming events — Hackathon 2026, AWS Community Day, Induction & more.' },
      { time: '12:15 PM', title: 'Quiz & Interactive Activity', desc: 'Team-based AWS quiz with goodies for winners.' },
      { time: '12:35 PM', title: 'Open Discussion & Q&A', desc: 'Share ideas, provide feedback, and help shape the future direction of AWS SBG at GCOEK.' },
      { time: '12:50 PM', title: 'Networking & Refreshments', desc: 'Tea, coffee, community conversations, group photos, and content creation.' },
    ],
  },
  {
    id: 'portfolio-website-workshop',
    title: 'AI-Powered Portfolio Website Development Workshop',
    date: '09 Apr 2026',
    time: '10:00 AM – 2:00 PM',
    location: 'E Computer Lab (GCOEK New Campus)',
    desc: "A hands-on workshop designed to help you build a professional personal portfolio from scratch using core web development skills — HTML, CSS, and JavaScript — while also leveraging AI tools to speed up development.",
    type: 'Workshop',
    status: 'past',
    isFeatured: false,
    link: 'https://forms.gle/VNaYij16gsK8fbjy7',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop',
    highlights: [
      'Hands-on session — bring your laptop if possible',
      'Build a complete portfolio website from scratch',
      'Learn HTML, CSS & JavaScript fundamentals',
      'AI tools for faster development',
      'GitHub setup & live deployment included',
      'No prior coding experience required',
      'Refreshments will be provided',
      'Certificates of participation will be provided',
    ],
    schedule: [
      { time: 'Part 1', title: 'Web Development Basics', desc: 'Introduction to HTML, CSS, and JavaScript. Speaker: Vidula.' },
      { time: 'Part 2', title: 'UI/UX Design Importance', desc: 'UI/UX principles for clean, modern, and user-friendly design. Speaker: Aniket.' },
      { time: 'Part 3', title: 'Portfolio Structure Planning', desc: 'How to structure a professional portfolio. Speaker: Shubham.' },
      { time: 'Part 4', title: 'Hands-on Build (Web Dev + AI)', desc: 'Live build session combining web development with AI tools. Speakers: Shardul & Yash.' },
      { time: 'Part 5', title: 'GitHub Setup & Push', desc: 'Setting up Git and GitHub, version control basics. Speaker: Atharv.' },
      { time: 'Part 6', title: 'Deployment — Make it Live', desc: "Deploy your portfolio website live with a real URL. Speaker: Anas." },
    ],
  },
  {
    id: 'seminar-genai-deep-learning',
    title: 'Seminar on Generative AI & Deep Learning',
    date: '13 Apr 2026',
    time: '2:00 PM – 4:00 PM',
    location: 'Seminar Hall (Old Building), GCOE Kolhapur',
    desc: 'A hands-on seminar exploring the cutting edge of Generative AI and Deep Learning. From GANs and VAEs to Transformers and LSTM networks, this session covers both theory and practical applications.',
    type: 'Seminar',
    status: 'past',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=2070&auto=format&fit=crop',
    meetLink: 'https://meet.google.com/awa-ebnr-ogx',
    whatsappLink: 'https://chat.whatsapp.com/CUE3LjVIT0I1Yh4xPsUUJo',
    link: 'https://www.meetup.com/aws-sbg-at-government-college-of-engineering-kolhapur/events/314246662/',
    highlights: [
      'Free entry — open to all students',
      'Certificates provided to all participants',
      'Hands-on session — bring your laptop',
      'Generative Deep Learning: Neural Style Transfer, VAE, GAN',
      'Deep Learning Models: MLP, LSTM, GRU, Transformer Networks',
      'Supervised Tasks: Image Denoising, Semantic Segmentation, Object Detection',
    ],
    schedule: [
      { time: '2:00 PM', title: 'Introduction to Generative AI', desc: 'Overview of Generative Deep Learning, VAE, and GAN.' },
      { time: '2:45 PM', title: 'Deep Learning Models', desc: 'MLP, LSTM, GRU, and Transformer Networks.' },
      { time: '3:30 PM', title: 'Hands-on: Supervised Tasks', desc: 'Image Denoising, Semantic Segmentation, and Object Detection.' },
      { time: '3:50 PM', title: 'Q&A & Certificate Distribution', desc: 'Open floor for questions followed by certificate distribution.' },
    ],
  },
  {
    id: 'expert-lecture-cloud-aws',
    title: 'Expert Lecture on Cloud Computing & AWS',
    date: '27 Mar 2026',
    time: '11:00 AM',
    location: 'Seminar Hall, GCOE Kolhapur',
    desc: 'An expert session on Cloud Computing and Amazon Web Services (AWS). This session provides students with practical insights into cloud technologies and real-world industry applications.',
    type: 'Expert Lecture',
    status: 'past',
    image: 'https://i.ibb.co/tM6WTD8D/Green-White-Minimalis-Webinar-Digital-Marketing-Expert-Instagram-Post-3.png',
    link: 'https://www.meetup.com/aws-sbg-at-government-college-of-engineering-kolhapur/events/313939623/',
    highlights: [
      'Introduction to Cloud Computing fundamentals',
      'Overview of Amazon Web Services (AWS)',
      'Insights into real-world cloud applications',
      'Career opportunities in Cloud & DevOps',
      'Guidance from an experienced industry professional',
    ],
    schedule: [
      { time: '11:00 AM', title: 'Speaker: Aditya Bhosale', desc: 'Senior Software Developer – AWS & DevOps. 10+ years of industry experience sharing real-world use cases and career guidance.' },
    ],
  },
  {
    id: 'intro-meetup',
    title: 'AWS Student Builder Group GCOEK: Intro Meetup',
    date: '19 Jan 2026',
    time: '3:00 PM',
    location: 'Seminar Hall (Old Building)',
    desc: 'Our first in-person introductory meetup to launch a student community focused on AWS Cloud, DevOps, and hands-on tech learning for all branches. Open to all curious students — no prior AWS experience required.',
    type: 'Meetup',
    status: 'past',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
    highlights: [
      "Introduction to the club's vision and goals",
      'Core team selection through interactive group activities',
      'Opportunity to learn, lead, and build your resume through leadership roles',
    ],
  },
];
