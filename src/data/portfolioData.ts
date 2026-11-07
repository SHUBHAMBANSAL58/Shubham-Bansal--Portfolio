import { Project, Experience, Certification, SkillCategory, EducationItem, JourneyMilestone } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Shubham Bansal',
  tagline: 'Build. Innovate. Engineer the Future.',
  role: 'Aspiring Full Stack Developer & AI Enthusiast',
  bio: 'I build modern web applications, explore AI-powered technologies, and transform ideas into practical digital experiences. Currently pursuing Computer Science Engineering and continuously improving my development and problem-solving skills.',
  aboutDetailed: [
    'I am a second-year Computer Science Engineering student at IMS Engineering College, deeply passionate about Full Stack Development, software engineering, and Artificial Intelligence.',
    'I enjoy building practical projects, learning modern technologies, and understanding how frontend and backend systems work together in seamless unison.',
    'I am continuously developing my programming, problem-solving, and technical skills to prepare for professional software development opportunities.'
  ],
  location: 'Ghaziabad, Uttar Pradesh, India',
  email: 'bansalshubham182@gmail.com',
  github: 'https://github.com/SHUBHAMBANSAL58',
  linkedin: 'https://www.linkedin.com/in/shubham-bansal-600099424',
  googleSkills: 'https://www.skills.google/public_profiles/ce4bcd61-6585-4179-bb76-dc4781eb64fc',
  heroImage: '/src/assets/images/hero_developer_visual_1793725439038.jpg',
  stats: [
    { label: 'Featured Projects', value: '4+' },
    { label: 'Internships & Roles', value: '4' },
    { label: 'Verified Certifications', value: '5+' },
    { label: 'Core Tech Stack', value: 'MERN & Python' }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'skillsync-ai',
    title: 'SkillSync AI',
    tagline: 'AI-Powered Career & Skill Development Intelligence Platform',
    description: 'An AI-focused career and skill development platform designed to help users explore career opportunities, analyze personal skill readiness, and chart structured learning paths with intelligent recommendations.',
    image: '/src/assets/images/project_skillsync_ai_1793725440448.jpg',
    githubUrl: 'https://github.com/SHUBHAMBANSAL58/SkillSync-AI',
    technologies: ['React.js', 'Node.js', 'Express.js', 'AI Integration', 'Firebase', 'Tailwind CSS', 'REST API'],
    primaryTechnologies: ['AI / ML', 'React', 'Firebase'],
    category: 'AI & Web',
    projectTypes: ['AI/ML', 'Web'],
    dateCompleted: 'Feb 2026',
    timeline: 'Jan 2026 – Feb 2026',
    features: [
      'Interactive AI career roadmap with step-by-step milestone progression',
      'Intelligent skill gap analysis mapping user proficiencies against industry benchmarks',
      'Dynamic learning recommendations powered by modern AI evaluation workflows',
      'Modern dark dashboard UI with responsive graph visualizations'
    ],
    highlights: ['AI Roadmap Generator', 'Skill Gap Analyzer', 'Intelligent Recommendations'],
    caseStudy: {
      overview: 'SkillSync AI is an intelligent career acceleration platform bridging the divide between academic curricula and actual tech hiring benchmarks.',
      problem: 'Students and self-taught developers often struggle to identify exact skill gaps and build relevant portfolio artifacts aligned with real market roles.',
      role: 'Lead Architect & Full Stack Developer — Designed user flow, REST API endpoints, AI matching schemas, and responsive UI components.',
      architecture: [
        { layer: 'Presentation Layer', component: 'React 19 + Tailwind CSS', description: 'Interactive roadmap canvas, responsive dashboards, and stateful skill nodes' },
        { layer: 'API Gateway & Controllers', component: 'Node.js + Express.js', description: 'RESTful route handlers, data validation middleware, and auth session tokens' },
        { layer: 'AI Intelligence Engine', component: 'Intelligent Career Evaluator', description: 'Processes user skill vectors and computes gap scores against target role profiles' },
        { layer: 'Persistence Layer', component: 'Structured Data Storage', description: 'User career states, roadmaps, milestone completions, and learning resources' }
      ],
      challenges: [
        {
          challenge: 'Visualizing non-linear career roadmaps without rendering performance bottlenecks.',
          solution: 'Implemented modular node component memoization and lightweight CSS graph layouts rather than heavy external canvas libraries.'
        },
        {
          challenge: 'Normalizing diverse tech roles and varying skill terminology.',
          solution: 'Created a canonical skill taxonomy mapping synonyms (e.g., "React", "ReactJS", "React.js") to unified evaluation buckets.'
        }
      ],
      futureImprovements: [
        'Automated GitHub commit parsing to dynamically score developer language proficiencies',
        'Interactive AI mock interview simulator with tailored feedback loops',
        'Exportable career readiness dossiers for recruiters'
      ]
    },
    stackMetrics: {
      stackDistribution: [
        { label: 'Frontend UI', percentage: 45, color: 'bg-indigo-500', detail: 'React 19, Tailwind CSS, Dynamic Roadmap Canvas' },
        { label: 'AI Engine', percentage: 30, color: 'bg-purple-500', detail: 'Career Vector & Gap Evaluation Engine' },
        { label: 'API Gateway', percentage: 15, color: 'bg-cyan-500', detail: 'Express.js Route Handlers & Auth Middleware' },
        { label: 'Data Store', percentage: 10, color: 'bg-emerald-500', detail: 'User Profiles, Taxonomy & Milestones' }
      ],
      architecturePattern: 'Client-Centric SPA + AI Intelligence Service',
      apiSurface: '14 REST Endpoints',
      bundleOrFootprint: '< 82 KB Client Gzip',
      latencyBenchmark: 'P95 < 85ms Evaluation',
      runtimeTier: 'AI-Augmented'
    },
    previewSnippets: [
      {
        id: 'overview-shot',
        title: 'Full Interface Overview',
        subtitle: 'Responsive AI Career Dashboard with Dark Mode',
        type: 'ui_screenshot',
        badge: 'UI View',
        image: '/src/assets/images/project_skillsync_ai_1793725440448.jpg'
      },
      {
        id: 'roadmap-engine',
        title: 'Skill Gap Evaluation Schema',
        subtitle: 'Vector Analysis Pipeline & Role Matching Logic',
        type: 'code_snippet',
        badge: 'API Engine',
        codeLanguage: 'TypeScript',
        codeSnippet: `// SkillSync Career Gap Matching Engine
interface EvaluationRequest {
  userSkills: string[];
  targetRole: string;
}

export async function evaluateSkillReadiness(req: EvaluationRequest) {
  const roleTaxonomy = await getCanonicalRoleProfile(req.targetRole);
  const matched = req.userSkills.filter(s => roleTaxonomy.required.includes(s));
  const missing = roleTaxonomy.required.filter(s => !req.userSkills.includes(s));
  
  return {
    readinessScore: Math.round((matched.length / roleTaxonomy.required.length) * 100),
    immediateMilestones: missing.slice(0, 3),
    recommendedProjects: roleTaxonomy.curatedProjects
  };
}`
      },
      {
        id: 'architecture-flow',
        title: 'Decoupled Client & AI Service',
        subtitle: 'React 19 SPA + Express REST Gateway Architecture',
        type: 'architecture_diagram',
        badge: 'Architecture',
        codeLanguage: 'Layer Map',
        codeSnippet: `[ Client: React 19 + Tailwind CSS ]
            │ (REST JSON via Fetch)
            ▼
[ Gateway: Express.js Controller & Session Auth ]
            │ (Taxonomy & Role Vectors)
            ▼
[ Engine: Skill Evaluation & Milestone Graph ]
            │ (Persistent State)
            ▼
[ Storage: Structured Career Path Store ]`
      }
    ]
  },
  {
    id: 'project-management-tool',
    title: 'Project Management Tool',
    tagline: 'Collaborative Agile Task & Sprint Orchestration Platform',
    description: 'A full-stack project management web application developed during my CodeAlpha internship, empowering development teams to organize tasks, assign priorities, manage deadlines, and track sprint progression.',
    image: '/src/assets/images/project_management_tool_1793725440680.jpg',
    githubUrl: 'https://github.com/SHUBHAMBANSAL58/CodeAlpha__-Project-Management-Tool',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    primaryTechnologies: ['React', 'Node.js', 'MongoDB'],
    category: 'Full Stack',
    projectTypes: ['Tools', 'Web'],
    dateCompleted: 'Nov 2025',
    timeline: 'Oct 2025 – Nov 2025',
    features: [
      'Interactive Kanban board with real-time status columns (Backlog, To Do, In Progress, Done)',
      'Granular task priority flags (High, Medium, Low) and deadline tracking',
      'Milestone burndown visualization and sprint completion analytics',
      'MongoDB schema modeling with secure RESTful backend endpoints'
    ],
    highlights: ['Kanban Task Board', 'Sprint Timeline Tracking', 'MongoDB CRUD API'],
    caseStudy: {
      overview: 'An agile task orchestration platform engineered to give engineering teams friction-free task management and milestone visibility.',
      problem: 'Conventional enterprise tools often suffer from bloated configuration overhead, steep learning curves, and sluggish response times.',
      role: 'Full Stack Development Intern at CodeAlpha — Designed database schemas, built CRUD endpoints, and implemented the dynamic React Kanban UI.',
      architecture: [
        { layer: 'Client Interface', component: 'React SPA + Modern CSS', description: 'Kanban columns, task creation modals, priority filters, and milestone progress rings' },
        { layer: 'Backend Service', component: 'Node.js + Express REST API', description: 'Routes for task lifecycle transitions, sprint grouping, and priority filters' },
        { layer: 'Database Layer', component: 'MongoDB + Mongoose ODM', description: 'Normalized schemas for Projects, Sprints, Tasks, and Activity logs' }
      ],
      challenges: [
        {
          challenge: 'Preventing state desynchronization when rapidly dragging or updating task statuses.',
          solution: 'Applied optimistic UI state updates with rollback error handlers if server requests fail.'
        },
        {
          challenge: 'Efficient sprint milestone progress calculations across nested subtasks.',
          solution: 'Designed lean MongoDB aggregation pipelines to compute completion ratios server-side.'
        }
      ],
      futureImprovements: [
        'WebSocket real-time multi-client collaboration sync',
        'Time tracking stopwatch with exportable sprint velocity timesheets'
      ]
    },
    stackMetrics: {
      stackDistribution: [
        { label: 'Client UI', percentage: 40, color: 'bg-indigo-500', detail: 'React Kanban Board, Sprint View, State Modals' },
        { label: 'REST API', percentage: 35, color: 'bg-cyan-500', detail: 'Express CRUD Handlers, Filter Pipeline, Task Auth' },
        { label: 'MongoDB', percentage: 25, color: 'bg-emerald-500', detail: 'Mongoose Schemas for Sprints, Tasks, Activity' }
      ],
      architecturePattern: 'MERN Layered Monolith',
      apiSurface: '18 RESTful Routes',
      bundleOrFootprint: '< 94 KB Client Gzip',
      latencyBenchmark: 'P95 < 40ms Pipeline',
      runtimeTier: 'Balanced Full-Stack'
    },
    previewSnippets: [
      {
        id: 'kanban-ui',
        title: 'Agile Kanban Workspace',
        subtitle: 'Interactive Multi-Column Task Board with Priority Flags',
        type: 'ui_screenshot',
        badge: 'UI View',
        image: '/src/assets/images/project_management_tool_1793725440680.jpg'
      },
      {
        id: 'mongoose-schema',
        title: 'Mongoose Task & Sprint Schema',
        subtitle: 'Relational sprint grouping & status tracking schema',
        type: 'code_snippet',
        badge: 'Mongoose Model',
        codeLanguage: 'JavaScript',
        codeSnippet: `// Project Management Mongoose Model
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'MEDIUM' },
  status: { type: String, enum: ['BACKLOG', 'TODO', 'IN_PROGRESS', 'DONE'] },
  sprintId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sprint' },
  assignee: { type: String },
  dueDate: { type: Date }
}, { timestamps: true });`
      },
      {
        id: 'workflow-flow',
        title: 'Sprint Lifecycle Pipeline',
        subtitle: 'Optimistic State Transitions & Server Verification',
        type: 'architecture_diagram',
        badge: 'Pipeline',
        codeLanguage: 'State Flow',
        codeSnippet: `[ Backlog ] ──► [ To Do (Sprint Planned) ]
                        │
                        ▼
               [ In Progress (Active) ]
                        │
                        ▼
               [ Done (Verified Review) ]`
      }
    ]
  },
  {
    id: 'simple-ecommerce-store',
    title: 'Simple E-commerce Store',
    tagline: 'Full-Featured Digital Storefront with Authentication & Cart',
    description: 'A responsive full-stack e-commerce web platform created during my CodeAlpha internship, delivering a smooth shopping journey with fast search, category filtering, cart management, and order handling.',
    image: '/src/assets/images/project_ecommerce_store_1793725441370.jpg',
    githubUrl: 'https://github.com/SHUBHAMBANSAL58/CodeAlpha__Simple-E-commerce-Store',
    technologies: ['JavaScript', 'Node.js', 'Express.js', 'SQLite', 'HTML5', 'CSS3'],
    primaryTechnologies: ['Node.js', 'SQLite', 'JavaScript'],
    category: 'E-commerce',
    projectTypes: ['Web'],
    dateCompleted: 'Dec 2025',
    timeline: 'Nov 2025 – Dec 2025',
    features: [
      'Dynamic product catalogue with search and category filtering',
      'Interactive shopping cart drawer with quantity adjustments and checkout total calculations',
      'User authentication and session state management',
      'Lightweight SQLite database persistence for products, users, and orders'
    ],
    highlights: ['Product Browsing & Filter', 'Cart Drawer & Checkout', 'SQLite Database'],
    caseStudy: {
      overview: 'A high-performance modern tech gear storefront engineered to demonstrate clean full-stack fundamentals without heavy third-party framework overhead.',
      problem: 'Building a reliable shopping cart, inventory sync, and auth workflow with zero bloat and lightweight embedded storage.',
      role: 'Full Stack Development Intern at CodeAlpha — Implemented frontend client logic, cart persistence, Express routing, and SQLite tables.',
      architecture: [
        { layer: 'Frontend Storefront', component: 'Vanilla ES6+ JavaScript + HTML5/CSS3', description: 'Product grid, live category filtering, interactive modal drawer, quantity stepper' },
        { layer: 'Server Controllers', component: 'Express.js Application Server', description: 'API endpoints for products, authentication, cart checkout, and inventory validation' },
        { layer: 'Embedded Database', component: 'SQLite Relational Database', description: 'Zero-config embedded relational database storing products, users, and order records' }
      ],
      challenges: [
        {
          challenge: 'Maintaining consistent cart state across browser refreshes and page navigations.',
          solution: 'Synchronized local storage with server session verification to prevent cart data loss.'
        },
        {
          challenge: 'Preventing duplicate order submissions during checkout.',
          solution: 'Implemented client-side submission locks alongside server idempotent transaction checks.'
        }
      ],
      futureImprovements: [
        'Stripe Checkout / Razorpay live payment gateway integration',
        'PDF invoice generation and automated email order receipt dispatch'
      ]
    },
    stackMetrics: {
      stackDistribution: [
        { label: 'Vanilla Client', percentage: 35, color: 'bg-indigo-500', detail: 'Zero-Dependency ES6+ DOM & Cart Drawer' },
        { label: 'Express Router', percentage: 35, color: 'bg-cyan-500', detail: 'Auth Session Tokens & Inventory Controllers' },
        { label: 'SQLite DB', percentage: 30, color: 'bg-emerald-500', detail: 'Embedded ACID Transactions & Relational Tables' }
      ],
      architecturePattern: 'Zero-Overhead Micro-Fullstack',
      apiSurface: '11 Express Endpoints',
      bundleOrFootprint: '< 28 KB Zero-Framework UI',
      latencyBenchmark: 'P95 < 15ms SQLite I/O',
      runtimeTier: 'Lightweight'
    },
    previewSnippets: [
      {
        id: 'ecommerce-ui',
        title: 'Modern Gear Storefront UI',
        subtitle: 'Dynamic catalogue with real-time category filters and cart drawer',
        type: 'ui_screenshot',
        badge: 'UI View',
        image: '/src/assets/images/project_ecommerce_store_1793725441370.jpg'
      },
      {
        id: 'cart-controller',
        title: 'Express Cart & Session Controller',
        subtitle: 'Idempotent order calculations and SQLite inventory verification',
        type: 'code_snippet',
        badge: 'Cart Controller',
        codeLanguage: 'JavaScript',
        codeSnippet: `// Cart Checkout & Order Processing
app.post('/api/checkout', (req, res) => {
  const { cartItems, userId } = req.body;
  const db = new sqlite3.Database('./store.db');
  
  db.serialize(() => {
    let grandTotal = 0;
    cartItems.forEach(item => {
      grandTotal += item.price * item.quantity;
    });
    // Atomic order insertion with SQLite
    db.run(\`INSERT INTO orders (userId, total, status) VALUES (?, ?, 'CONFIRMED')\`,
      [userId, grandTotal], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, orderId: this.lastID, total: grandTotal });
      }
    );
  });
});`
      },
      {
        id: 'ecommerce-architecture',
        title: 'Micro-Fullstack Flow',
        subtitle: 'Client DOM to SQLite embedded transaction pipeline',
        type: 'architecture_diagram',
        badge: 'Data Pipeline',
        codeLanguage: 'Store Flow',
        codeSnippet: `[ Browser Client (Vanilla JS) ] ──► [ Express Router ]
              │                               │
              ▼                               ▼
    [ Cart LocalStorage ]          [ SQLite DB (store.db) ]
              │                               │
              └─────────► Order Confirmed ◄───┘`
      }
    ]
  },
  {
    id: 'hrms-system',
    title: 'Human Resource Management System',
    tagline: 'Enterprise Employee Directory, Attendance & Hierarchy System',
    description: 'A collaborative enterprise system built as Co-Leader of a five-member engineering team. Designed to streamline staff records, automate attendance tracking, and provide clear departmental visibility.',
    image: '/src/assets/images/project_hrms_system_1793725442160.jpg',
    githubUrl: 'https://github.com/SHUBHAMBANSAL58',
    technologies: ['Node.js', 'Express.js', 'React.js', 'MongoDB / SQL', 'REST APIs'],
    primaryTechnologies: ['React', 'Node.js', 'MongoDB / SQL'],
    category: 'Team Project',
    projectTypes: ['Tools', 'Web'],
    dateCompleted: 'Jan 2026',
    timeline: 'Dec 2025 – Jan 2026',
    features: [
      'Comprehensive employee directory with role and department grouping',
      'Attendance logging and monthly presence analytics dashboard',
      'Organizational hierarchy tree showing reporting structures',
      'Role-based permissions for management, HR personnel, and employees'
    ],
    highlights: ['5-Member Team Co-Leader', 'Attendance Analytics', 'Department Hierarchy'],
    caseStudy: {
      overview: 'An enterprise employee lifecycle and attendance management system designed for fast operations and transparent organizational structure.',
      problem: 'Manual employee record-keeping leads to payroll discrepancies, fragmented attendance sheets, and unclear reporting lines.',
      role: 'Engineering Co-Leader (5-Member Team) — Spearheaded Git collaboration workflow, backend architecture, and core attendance module implementation.',
      architecture: [
        { layer: 'Client Dashboard', component: 'React.js + Analytical Charts', description: 'Employee directories, department cards, presence doughnut charts, hierarchy tree' },
        { layer: 'Backend Gateway', component: 'Express.js + RBAC Middleware', description: 'Role-based access control protecting employee PII and managerial approvals' },
        { layer: 'Data Storage', component: 'Relational & NoSQL Database', description: 'Employee profiles, time logs, department nodes, leave requests' }
      ],
      challenges: [
        {
          challenge: 'Managing git branching, PR reviews, and merging across 5 team members without collisions.',
          solution: 'Instituted a strict feature-branch workflow with required peer reviews before staging merges.'
        },
        {
          challenge: 'Rendering flexible tree structures for multi-tiered organizational hierarchies.',
          solution: 'Developed a recursive tree component with expandable department nodes and managerial links.'
        }
      ],
      futureImprovements: [
        'Biometric machine hardware API integration for automated check-in logging',
        'Automated payroll salary slips generation with tax deductions'
      ]
    },
    stackMetrics: {
      stackDistribution: [
        { label: 'Admin React UI', percentage: 35, color: 'bg-indigo-500', detail: 'Hierarchy Tree, Presence Visualizers, Modals' },
        { label: 'RBAC Gateway', percentage: 35, color: 'bg-cyan-500', detail: 'JWT Role Middleware, Auth Guard, Audit Log' },
        { label: 'Data Layer', percentage: 30, color: 'bg-emerald-500', detail: 'Staff Records, Monthly Timecard Schemas' }
      ],
      architecturePattern: '3-Tier Enterprise RBAC System',
      apiSurface: '24 Protected Endpoints',
      bundleOrFootprint: '< 115 KB Modular App',
      latencyBenchmark: 'P95 < 55ms Attendance Sync',
      runtimeTier: 'Enterprise Scalable'
    },
    previewSnippets: [
      {
        id: 'hrms-ui',
        title: 'Enterprise Staff Directory & Hierarchy',
        subtitle: 'Departmental grouping, attendance analytics, and role visualizer',
        type: 'ui_screenshot',
        badge: 'UI View',
        image: '/src/assets/images/project_hrms_system_1793725442160.jpg'
      },
      {
        id: 'rbac-middleware',
        title: 'Role-Based Access Control Middleware',
        subtitle: 'Enforces hierarchy clearance across HR, Managers, and Employees',
        type: 'code_snippet',
        badge: 'RBAC Guard',
        codeLanguage: 'TypeScript',
        codeSnippet: `// Middleware: Enterprise RBAC Authorization Guard
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({
        error: 'Forbidden: Insufficient privileges for this employee resource'
      });
    }
    next();
  };
};`
      },
      {
        id: 'hrms-hierarchy',
        title: 'Departmental Hierarchy Tree Flow',
        subtitle: 'Recursive organizational reporting structure model',
        type: 'architecture_diagram',
        badge: 'Org Structure',
        codeLanguage: 'Tree Flow',
        codeSnippet: `[ Executive Leadership ]
           │
     ┌─────┴──────────────┐
     ▼                    ▼
[ HR Operations ]    [ Engineering Lead ]
     │                    │
     ▼              ┌─────┴──────────────┐
[ Staff Records ]   ▼                    ▼
             [ Frontend Eng ]    [ Backend Eng ]`
      }
    ]
  }
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    year: '2021',
    title: 'Secondary Education Milestone',
    organization: 'CBSE Board',
    category: 'Education',
    description: 'Achieved 73% in Class X with strong academic performance in Mathematics, Science, and Foundations of Information Technology.',
    badges: ['Academic Excellence', 'Logical Foundations', '73% Score']
  },
  {
    year: '2023',
    title: 'Senior Secondary Graduation (Class XII)',
    organization: 'CBSE Board',
    category: 'Education',
    description: 'Graduated Science stream (70%) with Computer Science and Mathematics, building early algorithmic programming and computational logic.',
    badges: ['Science Stream', 'Computer Science', '70% Score']
  },
  {
    year: '2025',
    title: 'B.Tech in Computer Science Engineering',
    organization: 'IMS Engineering College (AKTU)',
    category: 'Education',
    description: 'Commenced undergraduate engineering studies in CSE (2025–2029). Engaged in active software development, data structures, and tech clubs.',
    badges: ['Undergrad CSE', 'Software Engineering', 'AKTU Affiliated']
  },
  {
    year: 'Mid 2025',
    title: 'Web Development Internship',
    organization: 'CodSoft',
    category: 'Internship',
    description: 'Built responsive client web applications, mastering semantic HTML5, modern CSS3 layouts, cross-browser compatibility, and Git workflows.',
    badges: ['Frontend Dev', 'Responsive UI', 'Git Collaboration']
  },
  {
    year: 'Late 2025',
    title: 'Full Stack Development Internship',
    organization: 'CodeAlpha',
    category: 'Internship',
    description: 'Delivered two major applications: the Agile Project Management Tool (MERN stack) and the Simple E-commerce Store with SQLite.',
    badges: ['Full Stack Dev', 'MERN Stack', 'SQLite & REST APIs']
  },
  {
    year: '2025 – 2026',
    title: 'Full Stack Internship & Campus Leadership',
    organization: 'Thiranex & MyGov India',
    category: 'Leadership',
    description: 'Deepened full-stack engineering at Thiranex while leading campus digital awareness and civic technical challenges as MyGov Campus Ambassador.',
    badges: ['Full Stack Web', 'Campus Ambassador', 'Leadership']
  },
  {
    year: '2026',
    title: 'SkillSync AI Platform & Verified Credentials',
    organization: 'Independent Engineering & Industry Certifications',
    category: 'Project',
    description: 'Architected SkillSync AI platform. Earned verified credentials from IBM SkillsBuild (AI), Google Skills Profile, be10x, and Unstop.',
    badges: ['SkillSync AI', 'IBM Credly Badge', 'Google Skills Profile']
  },
  {
    year: '2026+',
    title: 'Future Ambition: Production Software Engineering',
    organization: 'Career Horizon',
    category: 'Leadership',
    description: 'Actively preparing for software engineering and full-stack internships, focusing on robust distributed architectures and intelligent AI systems.',
    badges: ['Continuous Learning', 'Engineering Impact', 'Internship Ready']
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-codsoft',
    organization: 'CodSoft',
    role: 'Web Development Intern',
    period: 'Verified Internship',
    type: 'Internship',
    description: 'Engineered responsive web applications and modular UI components, focusing on cross-browser compatibility, clean code standards, and modern frontend development best practices.',
    responsibilities: [
      'Developed modern user interfaces using semantic HTML5, CSS3, and modern JavaScript',
      'Implemented responsive design techniques ensuring seamless mobile and desktop experiences',
      'Structured reusable web components and collaborated on version control via Git and GitHub',
      'Refactored client-side code for enhanced speed, accessibility, and clean architecture'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'Responsive Design'],
    verifiedStatus: 'Verified Internship Certificate'
  },
  {
    id: 'exp-codealpha',
    organization: 'CodeAlpha',
    role: 'Full Stack Development Intern',
    period: 'Verified Internship',
    type: 'Internship',
    description: 'Built end-to-end web applications including full-stack project management systems and e-commerce stores, connecting robust backend APIs with responsive client interfaces.',
    responsibilities: [
      'Engineered the Project Management Tool using React.js, Node.js, Express.js, and MongoDB',
      'Developed the Simple E-commerce Store with authentication, cart handling, and SQLite database',
      'Designed and documented RESTful API endpoints for CRUD operations and data persistence',
      'Implemented client-side state management and error boundary feedback'
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'SQLite', 'REST APIs'],
    verifiedStatus: 'Verified Internship Certificate'
  },
  {
    id: 'exp-thiranex',
    organization: 'Thiranex',
    role: 'Full Stack Web Development Intern',
    period: 'Verified Internship',
    type: 'Internship',
    description: 'Contributed to full-stack web solutions, backend service endpoints, database integration, and component lifecycle management in an agile learning environment.',
    responsibilities: [
      'Implemented full stack web workflows integrating frontend components with server routes',
      'Participated in code reviews, bug fixes, and feature enhancements',
      'Deepened practical skills in modern asynchronous JavaScript, API testing, and database queries',
      'Applied software design patterns to maintain scalable, clean project structures'
    ],
    technologies: ['Full Stack Web', 'Node.js', 'JavaScript', 'Database Management', 'Git'],
    verifiedStatus: 'Verified Internship Certificate'
  },
  {
    id: 'exp-mygov',
    organization: 'MyGov India',
    role: 'Campus Ambassador',
    period: 'Leadership & Outreach',
    type: 'Ambassadorship',
    description: 'Represented MyGov India initiatives across campus, fostering student engagement in national digital literacy programs, hackathons, and citizen participation challenges.',
    responsibilities: [
      'Conducted outreach and awareness sessions for digital governance and student innovation campaigns',
      'Coordinated participation in technical competitions, quizzes, and policy awareness drives',
      'Facilitated student peer networks and communicated community feedback to regional coordinators',
      'Strengthened campus leadership, public speaking, and community-building capabilities'
    ],
    technologies: ['Campus Leadership', 'Community Outreach', 'Communication', 'Digital Governance'],
    verifiedStatus: 'Official Campus Ambassador'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'HTML5', description: 'Semantic structure, accessibility, modern standards' },
      { name: 'CSS3', description: 'Flexbox, Grid, custom animations, responsive layouts' },
      { name: 'JavaScript (ES6+)', description: 'Modern syntax, async/await, DOM manipulation' },
      { name: 'React.js', description: 'Functional components, hooks, component architecture' },
      { name: 'Tailwind CSS', description: 'Utility-first modern styling, responsive layouts' }
    ]
  },
  {
    title: 'Backend Development',
    skills: [
      { name: 'Node.js', description: 'Server-side runtime, event loop, asynchronous IO' },
      { name: 'Express.js', description: 'RESTful routing, middleware pipelines, error handling' },
      { name: 'REST APIs', description: 'Resource architecture, status codes, JSON payload design' }
    ]
  },
  {
    title: 'Databases',
    skills: [
      { name: 'SQLite', description: 'File-based relational database, local embedded storage' },
      { name: 'MongoDB', description: 'NoSQL document modeling, Mongoose ODM, collections' },
      { name: 'SQL (Learning)', description: 'Relational queries, table joins, schema design' }
    ]
  },
  {
    title: 'Programming & Foundations',
    skills: [
      { name: 'Python', description: 'Core programming, automation scripts, algorithms' },
      { name: 'JavaScript', description: 'Full stack scripting, problem solving, asynchronous logic' },
      { name: 'Data Structures & Algorithms (Learning)', description: 'Arrays, linked lists, sorting, complexity analysis' }
    ]
  },
  {
    title: 'Developer Tools',
    skills: [
      { name: 'Git', description: 'Version control, branching, merge conflict resolution' },
      { name: 'GitHub', description: 'Remote repositories, pull requests, collaboration' },
      { name: 'VS Code', description: 'Modern development environment, extensions, debugging' }
    ]
  },
  {
    title: 'Additional Knowledge',
    skills: [
      { name: 'AI Fundamentals', description: 'Machine learning concepts, prompt engineering, neural basics' },
      { name: 'AI Coding Tools', description: 'Leveraging AI for rapid prototyping, debugging, and review' },
      { name: 'Cloud Computing Fundamentals', description: 'Cloud architectures, deployment, storage basics' },
      { name: 'Cybersecurity Fundamentals', description: 'Security best practices, auth principles, protection' }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-ibm-ai',
    title: 'Getting Started with Artificial Intelligence',
    issuer: 'IBM SkillsBuild',
    verificationUrl: 'https://www.credly.com/badges/08a80293-7df7-4d1d-b095-a1b0a3d46e3a',
    badgeUrl: 'https://www.credly.com/badges/08a80293-7df7-4d1d-b095-a1b0a3d46e3a',
    description: 'Comprehensive IBM credential covering core AI principles, natural language processing, computer vision, and machine learning foundations.',
    skillsGained: ['Artificial Intelligence', 'Machine Learning Concepts', 'NLP Basics', 'AI Ethics']
  },
  {
    id: 'cert-google-skills',
    title: 'Google for Education / Google Skills Profile',
    issuer: 'Google Skills',
    verificationUrl: 'https://www.skills.google/public_profiles/ce4bcd61-6585-4179-bb76-dc4781eb64fc',
    description: 'Verified public skill achievements in Google technical curricula and modern digital productivity pathways.',
    skillsGained: ['Cloud Literacy', 'Digital Tools', 'Modern Computing', 'Technical Skills']
  },
  {
    id: 'cert-be10x-ai',
    title: 'AI Tools and Claude Workshop',
    issuer: 'be10x',
    description: 'Intensive workshop focused on modern AI tools, Claude prompting strategies, and workflow automation for software developers.',
    skillsGained: ['Claude Prompting', 'AI Workflows', 'Developer Automation', 'Productivity']
  },
  {
    id: 'cert-unstop-cloud',
    title: 'Cloud Computing with AI',
    issuer: 'Unstop',
    description: 'Rigorous assessment in cloud infrastructure models, virtualized systems, and integration of AI services on cloud platforms.',
    skillsGained: ['Cloud Architectures', 'Virtualization', 'AI on Cloud', 'Deployment Basics']
  },
  {
    id: 'cert-unstop-cybersecurity',
    title: 'Cybersecurity Mastery',
    issuer: 'Unstop',
    description: 'Certification assessing network defense mechanisms, web security vulnerabilities, data privacy, and secure coding practices.',
    skillsGained: ['Web Application Security', 'Authentication', 'Threat Mitigation', 'Secure Coding']
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'B.Tech – Computer Science Engineering',
    institution: 'IMS Engineering College',
    affiliation: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
    period: '2025 – 2029',
    status: 'Currently Pursuing (Second Year)',
    highlights: [
      'Focusing on Full Stack Web Development, Operating Systems, Database Management Systems, and Object-Oriented Programming',
      'Active participant in technical student clubs and collaborative developer teams',
      'Maintaining strong academic rigor alongside self-driven practical project engineering'
    ]
  },
  {
    degree: 'Senior Secondary (Class XII)',
    institution: 'CBSE Board',
    period: 'Completed',
    status: 'Graduated',
    score: '70%',
    highlights: [
      'Science Stream with Computer Science and Mathematics foundations',
      'Developed strong algorithmic analytical thinking and logical problem-solving skills'
    ]
  },
  {
    degree: 'Secondary School (Class X)',
    institution: 'CBSE Board',
    period: 'Completed',
    status: 'Graduated',
    score: '73%',
    highlights: [
      'Core science, mathematics, and English communication excellence',
      'Active involvement in co-curricular science exhibitions and competitions'
    ]
  }
];
