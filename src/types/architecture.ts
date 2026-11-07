export type ArchitectureTierType = 'Frontend' | 'API Gateway' | 'Backend' | 'Database';

export interface TechStackTier {
  id: string;
  name: ArchitectureTierType;
  title: string;
  technologies: string[];
  keyComponents: string[];
  description: string;
  protocolsOrFormats: string[];
  securityOrOptimization: string;
}

export interface DataFlowStep {
  step: number;
  source: string;
  target: string;
  action: string;
  payloadType: string;
  description: string;
}

export interface ProjectArchitecture {
  projectId: string;
  projectTitle: string;
  tagline: string;
  category: string;
  githubUrl: string;
  architecturePattern: string;
  databaseEngine: string;
  communicationStyle: string;
  tiers: {
    frontend: TechStackTier;
    api: TechStackTier;
    backend: TechStackTier;
    database: TechStackTier;
  };
  dataFlowSteps: DataFlowStep[];
}
