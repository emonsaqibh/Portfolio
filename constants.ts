
import { Compass, Layers, BarChart3, Monitor, Smartphone, Cloud, Lock, Cpu } from 'lucide-react';
import { ApproachItem, Project, ServiceItem } from './types';

export const APPROACH_DATA: ApproachItem[] = [
  {
    icon: Compass,
    title: "SERVICES",
    subtitle: "Strategy",
    description: "Comprehensive digital strategies designed to connect you with your ideal audience effortlessly. We pinpoint weaknesses in existing approaches."
  },
  {
    icon: Layers,
    title: "TECHNOLOGY",
    subtitle: "Architecture",
    description: "Obtain tailored architectures for every product. Real-time adjustments in digital strategy driven by robust tech stacks."
  },
  {
    icon: Monitor,
    title: "DIFFERENCE",
    subtitle: "Execution",
    description: "We're more than just designers; we act as a part of your team, blending effortlessly to significantly enhance your product without adding workload."
  },
  {
    icon: BarChart3,
    title: "ANALYTICS",
    subtitle: "Growth",
    description: "Data-driven design decisions ensuring that every pixel serves a purpose and contributes to the overall conversion and retention goals."
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "LilyGPT",
    category: "Product Design",
    description: "Meet Lily GPT, your personal AI news anchor. Lily sifts through endless headlines and complex articles to deliver concise, easy-to-understand news briefings tailored just for you.",
    year: "2024",
    role: "Lead Product Designer",
    client: "Fringecore",
    website: "https://www.lilygpt.com",
    // REPLACE THIS URL with the 1st image you provided (Phone lying on black stones)
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop", 
    challenge: "In the age of information overload, users are bombarded with cluttered feeds, clickbait headlines, and complex jargon. For the South Asian market specifically, finding a platform that seamlessly switches between local (Bengali) and international (English) content while offering a simplified, hands-free experience was non-existent.",
    solution: "We crafted LilyGPT as a dual-language, voice-first news assistant. The interface features a sleek 'Dark Mode' aesthetic to reduce eye strain. We designed a robust 'Interest Selector' (visualized in the gallery) allowing users to filter topics like Politics, Sports, and Religion. The core innovation is the 'Listening Mode', visualizing the AI's active state with a glowing orb, making news accessibility seamless for users on the go.",
    gallery: [
      // REPLACE WITH: Image 2 - Upright Phone showing News Feed (Cricket/Politics)
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop", 
      
      // REPLACE WITH: Image 3 - Two Tilted Phones showing Interest Selection (Bangladesh, Sports, etc.)
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000&auto=format&fit=crop", 
      
      // REPLACE WITH: Image 4 - Hand holding phone showing 'I'm Listening' Orb UI
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"  
    ]
  },
  {
    id: 2,
    title: "EcoStream SaaS",
    category: "User Experience",
    description: "A comprehensive dashboard for monitoring environmental impact and carbon footprints.",
    year: "2023",
    role: "UX Researcher & UI Designer",
    client: "GreenTech Solutions",
    image: "https://picsum.photos/seed/eco/800/1000",
    challenge: "Industrial clients struggled to make sense of the massive amounts of sensor data related to carbon emissions. The existing tools were clunky and required data scientist level knowledge to operate.",
    solution: "We created 'EcoStream', a dashboard that synthesizes complex data into actionable insights. Using a modular card system and predictive analytics visualization, facility managers can now identify leaks and inefficiencies in real-time.",
    gallery: [
      "https://picsum.photos/seed/eco1/1200/800",
      "https://picsum.photos/seed/eco2/1200/800",
      "https://picsum.photos/seed/eco3/1200/800"
    ]
  },
  {
    id: 3,
    title: "Lumina Health",
    category: "Brand Identity",
    description: "Connecting patients with specialists through an intuitive and calming interface.",
    year: "2023",
    role: "Brand Strategist",
    client: "Lumina",
    image: "https://picsum.photos/seed/health/800/1000",
    challenge: "Healthcare apps often feel sterile and clinical, causing anxiety for patients. Lumina needed a brand identity that conveyed trust, warmth, and professional competence.",
    solution: "We developed a soft, gradients-based visual language paired with a rounded sans-serif typography to create a sense of calm. The logo symbol combines a cross (health) with a spark (hope), representing the brand's mission to illuminate the path to recovery.",
    gallery: [
      "https://picsum.photos/seed/lumina1/1200/800",
      "https://picsum.photos/seed/lumina2/1200/800",
      "https://picsum.photos/seed/lumina3/1200/800"
    ]
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    number: '01',
    title: 'Product Design',
    description: 'End-to-end digital product design from concept to high-fidelity prototypes. We focus on creating intuitive interfaces that solve real user problems while looking stunning.',
    tags: ['UI Design', 'Prototyping', 'Design Systems']
  },
  {
    id: 's2',
    number: '02',
    title: 'Brand Identity',
    description: 'Crafting distinct visual languages that tell your story. From logo design to comprehensive brand guidelines, we ensure your brand stands out in a crowded market.',
    tags: ['Logo Design', 'Visual Language', 'Guidelines']
  },
  {
    id: 's3',
    number: '03',
    title: 'Motion Graphics',
    description: 'Adding dimension to your digital presence. We create smooth micro-interactions and compelling narrative animations that guide users and delight the senses.',
    tags: ['Interaction Design', 'Lottie', 'After Effects']
  },
  {
    id: 's4',
    number: '04',
    title: 'User Experience',
    description: 'Research-backed design decisions. We map out user journeys, conduct usability testing, and optimize flows to ensure friction-less experiences.',
    tags: ['User Research', 'Wireframing', 'Usability Testing']
  }
];

export const SKILL_TAGS = [
  { name: 'SaaS', icon: Cloud },
  { name: 'eCommerce', icon: Smartphone },
  { name: 'AI Solutions', icon: Cpu },
  { name: 'Cybersecurity', icon: Lock },
];
