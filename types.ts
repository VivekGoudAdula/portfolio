
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  caseStudy?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  points: string[];
  skills: string[];
}

export interface Achievement {
  id: string;
  title: string;
  category: 'Hackathon' | 'Academic' | 'Leadership' | 'Publication';
  description: string;
  organization: string;
  rank?: string;
}

export interface Skill {
  name: string;
  level: number; // 1-100
  icon: string;
  category: 'Language' | 'Frontend' | 'Backend' | 'AI/ML' | 'Cloud';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url?: string;
  logo: string;
}
