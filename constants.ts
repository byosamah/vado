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
    title: 'Al Mashraq Strip Mall',
    category: 'Commercial',
    image: '/images/projects/almashraq/Al-Mshraq-Stripmall_Page_08-scaled.jpg',
    images: [
      '/images/projects/almashraq/Al-Mshraq-Stripmall_Page_08-scaled.jpg',
      '/images/projects/almashraq/Al-Mshraq-Stripmall_Page_09-scaled.jpg',
      '/images/projects/almashraq/Al-Mshraq-Stripmall_Page_10-scaled.jpg',
    ],
    description: 'Located in Al Aziziyah, Al Khobar, Al Mashraq Strip Mall is a modern commercial development featuring retail and dining units along a major urban corridor. VADO\'s approach focused on visibility, accessibility, and user experience—resulting in a commercial strip that blends functional planning with appealing façades and seamless urban integration.',
    year: '2019',
    location: 'Al-Aziziyah, Al-Khobar',
    client: 'Private Client',
  },
];

export const TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Arch. Khalid Al Mulla',
    role: 'President',
    image: '/images/team/khalid-al-mulla.png',  // Updated to new .png image
  },
  {
    id: '2',
    name: 'Arch. Mutaz Al Mulla',
    role: 'Vice President & Chief Architect',
    image: '/images/team/mutaz-al-mulla.png',  // Updated to new .png image
  },
  {
    id: '3',
    name: 'Eng. Mohammed Zakariya',
    role: 'Chief Electro-Mechanical Engineer',
    image: '/images/team/mohammed-zakariya.png',  // Updated to new .png image
  },
];

export const SERVICES: Service[] = [
  {
    id: 'pm',
    title: 'Project Management',
    description: 'Full-cycle project management ensures seamless coordination, cost control, time efficiency, and strict adherence to quality standards.',
  },
  {
    id: 'arch',
    title: 'Architectural Design',
    description: 'Comprehensive architectural solutions that balance form, function, and identity, transforming concepts into refined, buildable spaces.',
  },
  {
    id: 'supervision',
    title: 'Site Supervision',
    description: 'Dedicated on-site supervision guarantees precise execution, compliance, and construction excellence.',
  },
  {
    id: 'engineering',
    title: 'Engineering Design',
    description: 'Integrated engineering services across structural, mechanical, electrical, and plumbing disciplines to ensure safe, efficient, and sustainable performance.',
  },
];