import { Project, Service, TeamMember } from './types';

export const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Khobar Waterfront',
    category: 'Urban Planning',
    image: '/images/projects/khobar-waterfront.jpg',
    description: 'A comprehensive urban planning project transforming the Khobar coastline into a vibrant mixed-use destination.',
    year: '2023',
    location: 'Al Khobar, Saudi Arabia',
    client: 'Private Client',
  },
  {
    id: '2',
    title: 'Matal',
    category: 'Mixed Use',
    image: '/images/projects/matal.jpg',
    description: 'An innovative mixed-use development combining residential, commercial, and recreational spaces.',
    year: '2022',
    location: 'Eastern Province, Saudi Arabia',
    client: 'Private Client',
  },
  {
    id: '3',
    title: 'Atyaf',
    category: 'Residential',
    image: '/images/projects/atyaf.jpg',
    description: 'A modern residential compound designed with sustainability and community living in mind.',
    year: '2021',
    location: 'Al Khobar, Saudi Arabia',
    client: 'Private Client',
  },
  {
    id: '4',
    title: 'Al Hassa Cultural Center',
    category: 'Public Sector',
    image: '/images/projects/al-hassa-cultural-center.jpg',
    description: 'A landmark cultural facility celebrating the heritage and traditions of the Al Hassa region.',
    year: '2020',
    location: 'Al Hassa, Saudi Arabia',
    client: 'Government',
  },
  {
    id: '5',
    title: 'Al Mashraq Strip Mall',
    category: 'Commercial',
    image: '/images/projects/al-mashraq-strip-mall.jpg',
    description: 'A contemporary retail destination designed to enhance the shopping experience.',
    year: '2019',
    location: 'Al Khobar, Saudi Arabia',
    client: 'Private Client',
  },
  {
    id: '6',
    title: 'Project Coming Soon',
    category: 'TBD',
    image: '/images/projects/project-6.jpg',
    description: 'Details coming soon.',
    year: 'TBD',
    location: 'TBD',
    client: 'TBD',
  },
  {
    id: '7',
    title: 'Project Coming Soon',
    category: 'TBD',
    image: '/images/projects/project-7.jpg',
    description: 'Details coming soon.',
    year: 'TBD',
    location: 'TBD',
    client: 'TBD',
  },
  {
    id: '8',
    title: 'Project Coming Soon',
    category: 'TBD',
    image: '/images/projects/project-8.jpg',
    description: 'Details coming soon.',
    year: 'TBD',
    location: 'TBD',
    client: 'TBD',
  },
];

export const TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Arch. Khalid Al Mulla',
    role: 'President',
    image: '/images/team/khalid-al-mulla.jpg',
  },
  {
    id: '2',
    name: 'Arch. Mutaz Al Mulla',
    role: 'Vice President & Chief Architect',
    image: '/images/team/mutaz-al-mulla.jpg',
  },
  {
    id: '3',
    name: 'Eng. Mohammed Zakariya',
    role: 'Chief Electro-Mechanical Engineer',
    image: '/images/team/mohammed-zakariya.jpg',
  },
];

export const SERVICES: Service[] = [
  {
    id: 'arch',
    title: 'Architectural Design',
    description: 'VADO excels in the art and science of architectural design, ensuring that each project is conceptualized and executed with precision and creativity.',
  },
  {
    id: 'civil',
    title: 'Civil Engineering',
    description: 'Advanced techniques and methodologies to address the intricate challenges of infrastructure and construction projects.',
  },
  {
    id: 'env',
    title: 'Environmental Engineering',
    description: 'Committed to environmental sustainability, minimizing ecological impact and promoting responsible practices.',
  },
  {
    id: 'mep',
    title: 'Electrical & Mechanical',
    description: 'Cutting-edge technology to optimize functionality, efficiency, and reliability in diverse project contexts.',
  },
  {
    id: 'landscape',
    title: 'Landscape Architecture',
    description: 'Harmonizing built environments with the natural landscape, creating aesthetically pleasing and sustainable outdoor spaces.',
  },
  {
    id: 'irrigation',
    title: 'Irrigation Systems',
    description: 'Innovative solutions promoting responsible water management in landscaping and agricultural applications.',
  },
  {
    id: 'fire',
    title: 'Fire Protection',
    description: 'Paramount importance on safety with robust systems and measures to safeguard lives and property.',
  },
  {
    id: 'interior',
    title: 'Interior Design',
    description: 'Perfect blend of functionality and aesthetics, enhancing the overall user experience within interior spaces.',
  },
];