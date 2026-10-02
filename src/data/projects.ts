export interface Project {
  id: string;
  category: string;
  title: string;
  tagline: string;
  creator: string;
  creatorImage?: string;
  projectImage?: string;
  role: string;
  description: string;
  features?: string[];
  techStack: string[];
  awsServices?: string[];
  liveDemo?: string;
  github?: string;
  color: string;
}

export const projectsData: Project[] = [
  {
    id: 'fraudlens-ai',
    category: 'AI + DIGITAL FORENSICS',
    title: 'FraudLens AI',
    tagline: '"AI-Powered Financial Evidence Forensics"',
    creator: 'Anas Pathan',
    creatorImage: 'https://i.ibb.co/YBDxDXfV/Chat-GPT-Image-Sep-4-2026-12-44-21-AM.png',
    projectImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2000&auto=format&fit=crop',
    role: 'Project Creator',
    description: 'A multimodal fraud investigation platform that combines financial evidence analysis, OCR, computer vision, machine learning, anomaly detection, and AI-assisted investigation in a unified forensic workspace.',
    features: [
      'Multimodal Evidence Analysis',
      'OCR & Document Intelligence',
      'Computer Vision Forensics',
      'ML Anomaly Detection',
      'Evidence Fusion',
      'Transaction Analysis',
      'AI Investigator',
      'Evidence Vault',
      'Forensic Viewer',
      'Cross-Evidence Analysis',
      'Investigation Workspace',
      'Reports & Analytics'
    ],
    techStack: [
      'React',
      'TypeScript',
      'Vite',
      'Node.js',
      'Express',
      'Python',
      'Scikit-learn',
      'XGBoost',
      'Gemini',
      'MongoDB',
      'Firebase',
      'Docker'
    ],
    awsServices: [
      'Amazon CloudFront',
      'AWS Elastic Beanstalk',
      'Amazon ECR',
      'Amazon S3',
      'AWS Systems Manager Parameter Store'
    ],
    liveDemo: 'https://d21zw6n2b48e0s.cloudfront.net/',
    github: 'https://github.com/pathananas2007/fraudlens-ai',
    color: '#3B82F6'
  },
  {
    id: 'devinsight-guardian',
    category: 'AI + Serverless',
    title: 'DevInsight Guardian',
    tagline: '"The AI Engineering Manager that works while you sleep."',
    creator: 'Shardul Kolekar',
    creatorImage: 'https://i.ibb.co/YBzRTFVx/Chat-GPT-Image-Sep-4-2026-12-34-54-PM.png',
    projectImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2000&auto=format&fit=crop',
    role: 'Project Creator',
    description: 'An autonomous serverless AI engineering manager that watches GitHub activity, analyzes engineering patterns, and delivers a personalized morning brief with prioritized recommendations.',
    features: [
      'Autonomous daily analysis',
      '8-stage agentic pipeline',
      'Agent memory and strategy adaptation',
      'Burnout early warning',
      'Priority, confidence and reason for recommendations',
      'Repository spotlighting',
      'Personalized morning brief',
      'Fault-tolerant processing',
      'CloudWatch monitoring'
    ],
    techStack: [
      'AWS Lambda',
      'AWS SAM',
      'TypeScript',
      'React',
      'Node.js',
      'Groq',
      'Firebase'
    ],
    awsServices: [
      'AWS Lambda',
      'Amazon EventBridge Scheduler',
      'Amazon SES',
      'AWS Secrets Manager',
      'Amazon CloudWatch',
      'Amazon SQS',
      'AWS IAM',
      'AWS SAM'
    ],
    liveDemo: 'https://dev-insight-shardul-kolekar.vercel.app/',
    github: 'https://github.com/ShardulOnGit/DevInsight',
    color: '#FF9900'
  },
  {
    id: 'iot-health-monitoring',
    category: 'IoT + Analytics',
    title: 'IoT Health Monitoring Dashboard',
    tagline: '"Real-time patient vitals monitoring."',
    creator: 'AWS Student Builder Community',
    projectImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop',
    role: 'Open Source',
    description: 'Real-time dashboard for monitoring patient vitals collected from simulated IoT devices. Uses MQTT for data ingestion and React for visualization.',
    techStack: [
      'IoT Core',
      'Amplify',
      'React',
      'Timestream'
    ],
    color: '#38BDF8'
  },
  {
    id: 'cloud-attendance-system',
    category: 'AI + Vision',
    title: 'Cloud Attendance System',
    tagline: '"Automated attendance tracking using facial recognition."',
    creator: 'AWS Student Builder Community',
    projectImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop',
    role: 'Open Source',
    description: 'An automated attendance tracking system using facial recognition. Students scan their faces at the entrance, and attendance is logged in a database.',
    techStack: [
      'Rekognition',
      'Lambda',
      'S3',
      'DynamoDB'
    ],
    color: '#A855F7'
  },
  {
    id: 'automated-data-pipeline',
    category: 'Data Engineering',
    title: 'Automated Data Pipeline',
    tagline: '"Serverless ETL pipeline for data analytics."',
    creator: 'AWS Student Builder Community',
    projectImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop',
    role: 'Open Source',
    description: 'A serverless ETL pipeline that extracts data from external APIs, transforms it using Python, and loads it into a data warehouse for analysis.',
    techStack: [
      'Glue',
      'Athena',
      'S3',
      'Step Functions'
    ],
    color: '#22C55E'
  },
  {
    id: 'containerized-microservices',
    category: 'Cloud Architecture',
    title: 'Containerized Microservices',
    tagline: '"Scalable e-commerce backend with ECS."',
    creator: 'AWS Student Builder Community',
    projectImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2000&auto=format&fit=crop',
    role: 'Open Source',
    description: 'An e-commerce backend broken down into microservices, containerized with Docker, and orchestrated using Amazon ECS.',
    techStack: [
      'ECS',
      'Fargate',
      'Docker',
      'ALB'
    ],
    color: '#EC4899'
  },
  {
    id: 'serverless-chatbot',
    category: 'AI + NLP',
    title: 'Serverless Chatbot',
    tagline: '"Intelligent conversational agent for student queries."',
    creator: 'AWS Student Builder Community',
    projectImage: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2000&auto=format&fit=crop',
    role: 'Open Source',
    description: 'An intelligent conversational agent built using Amazon Lex and integrated with Slack for answering student queries about the club.',
    techStack: [
      'Lex',
      'Lambda',
      'DynamoDB'
    ],
    color: '#FF9900'
  }
];
