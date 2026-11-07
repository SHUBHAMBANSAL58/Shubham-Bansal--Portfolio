export interface ArchitectureNode {
  layer: string;
  component: string;
  description: string;
}

export interface ProjectCaseStudy {
  overview: string;
  problem: string;
  role: string;
  architecture: ArchitectureNode[];
  challenges: {
    challenge: string;
    solution: string;
  }[];
  futureImprovements: string[];
}

export interface StackWeightSegment {
  label: string;
  percentage: number;
  color: string;
  detail: string;
}

export interface ProjectStackMetrics {
  stackDistribution: StackWeightSegment[];
  architecturePattern: string;
  apiSurface: string;
  bundleOrFootprint: string;
  latencyBenchmark: string;
  runtimeTier: 'Lightweight' | 'Balanced Full-Stack' | 'AI-Augmented' | 'Enterprise Scalable';
}

export interface ProjectPreviewSnippet {
  id: string;
  title: string;
  subtitle: string;
  type: 'ui_screenshot' | 'architecture_diagram' | 'code_snippet' | 'workflow';
  badge: string;
  image?: string;
  codeSnippet?: string;
  codeLanguage?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
  primaryTechnologies?: string[];
  features: string[];
  category: 'Full Stack' | 'AI & Web' | 'Team Project' | 'E-commerce' | 'Web' | 'AI/ML' | 'Tools' | string;
  projectTypes?: ('Web' | 'AI/ML' | 'Tools')[];
  dateCompleted?: string;
  timeline?: string;
  highlights: string[];
  caseStudy: ProjectCaseStudy;
  stackMetrics?: ProjectStackMetrics;
  previewSnippets?: ProjectPreviewSnippet[];
}

export interface Experience {
  id: string;
  organization: string;
  role: string;
  period: string;
  type: 'Internship' | 'Ambassadorship';
  description: string;
  responsibilities: string[];
  technologies: string[];
  verifiedStatus: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  verificationUrl?: string;
  badgeUrl?: string;
  description: string;
  skillsGained: string[];
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level?: string;
    description: string;
  }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  affiliation?: string;
  period: string;
  status: string;
  score?: string;
  highlights: string[];
}

export interface JourneyMilestone {
  year: string;
  title: string;
  organization: string;
  category: 'Education' | 'Internship' | 'Project' | 'Certification' | 'Leadership';
  description: string;
  badges: string[];
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}
