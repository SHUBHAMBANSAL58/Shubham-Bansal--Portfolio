import { Project } from '../types/portfolio';

export interface ReadmeOptions {
  projectTitle: string;
  tagline: string;
  description: string;
  technologies: string[];
  features?: string[];
  problem?: string;
  solution?: string;
  githubUrl?: string;
  demoUrl?: string;
  authorName?: string;
}

/**
 * Generates a production-ready, beautifully structured Markdown README.md
 */
export function generateProjectReadme(options: ReadmeOptions): string {
  const {
    projectTitle,
    tagline,
    description,
    technologies,
    features = [],
    problem,
    solution,
    githubUrl = 'https://github.com/SHUBHAMBANSAL58',
    demoUrl,
    authorName = 'Shubham Bansal',
  } = options;

  const techBadges = technologies
    .map(
      (tech) =>
        `![${tech}](https://img.shields.io/badge/${encodeURIComponent(
          tech
        )}-%23000?style=for-the-badge&logo=${encodeURIComponent(
          tech.toLowerCase().replace(/[^a-z0-9]/g, '')
        )}&logoColor=white)`
    )
    .join(' ');

  const featuresSection =
    features.length > 0
      ? `## ✨ Key Features\n\n${features.map((f) => `- **${f}**`).join('\n')}\n\n`
      : '';

  const problemSolutionSection =
    problem || solution
      ? `## 🎯 Problem Statement & Engineering Solution\n\n` +
        (problem ? `### The Challenge\n${problem}\n\n` : '') +
        (solution ? `### The Solution & Architecture\n${solution}\n\n` : '')
      : '';

  const techStackList = technologies.map((t) => `- \`${t}\``).join('\n');

  return `# ${projectTitle}

> ${tagline}

${techBadges}

## 📖 Overview

${description}

${featuresSection}${problemSolutionSection}## 🛠️ Technology Stack

${techStackList}

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm, yarn, or pnpm
- Git

### Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone ${githubUrl}.git
   cd ${projectTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}
   \`\`\`

2. **Install project dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure environment variables:**
   \`\`\`bash
   cp .env.example .env
   # Add your configuration keys inside .env
   \`\`\`

4. **Run the local development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Build for production:**
   \`\`\`bash
   npm run build
   \`\`\`

## 📂 Project Architecture

\`\`\`
├── src/
│   ├── components/      # Modular UI components
│   ├── hooks/           # Custom reusable React hooks
│   ├── lib/             # API clients, Firebase & DB configs
│   ├── types/           # TypeScript interfaces & types
│   └── utils/           # Helper functions & validation
├── public/              # Static assets and icons
├── package.json         # Scripts and dependencies
└── README.md            # Project documentation
\`\`\`

${demoUrl ? `## 🌐 Live Demonstration\n\nExplore the deployed platform: [${demoUrl}](${demoUrl})\n\n` : ''}## 👨‍💻 Author

**${authorName}**
- GitHub: [SHUBHAMBANSAL58](https://github.com/SHUBHAMBANSAL58)
- LinkedIn: [Shubham Bansal](https://www.linkedin.com/in/shubham-bansal-600099424)
- Email: [bansalshubham182@gmail.com](mailto:bansalshubham182@gmail.com)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
`;
}

/**
 * Creates a README.md from an existing portfolio Project entity
 */
export function generateReadmeFromProject(project: Project): string {
  return generateProjectReadme({
    projectTitle: project.title,
    tagline: project.tagline,
    description: project.description,
    technologies: project.technologies,
    features: project.features,
    problem: project.caseStudy?.problem,
    solution: project.caseStudy?.challenges?.[0]?.solution,
    githubUrl: project.githubUrl,
    demoUrl: project.liveUrl,
    authorName: 'Shubham Bansal',
  });
}
