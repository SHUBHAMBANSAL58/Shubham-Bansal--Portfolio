import { ProjectArchitecture } from '../types/architecture';

export const PROJECT_ARCHITECTURES: ProjectArchitecture[] = [
  {
    projectId: 'skillsync-ai',
    projectTitle: 'SkillSync AI',
    tagline: 'AI-Powered Career & Skill Development Intelligence Platform',
    category: 'AI & Web',
    githubUrl: 'https://github.com/SHUBHAMBANSAL58/SkillSync-AI',
    architecturePattern: 'Decoupled Client-Server with AI Intelligence Engine',
    databaseEngine: 'Structured Document & Benchmark Store',
    communicationStyle: 'RESTful API / JSON Over HTTP',
    tiers: {
      frontend: {
        id: 'tier-frontend',
        name: 'Frontend',
        title: 'Reactive Client Interface & Visual Roadmap Canvas',
        technologies: ['React 19', 'Tailwind CSS', 'Lucide Icons', 'Vite Client'],
        keyComponents: [
          'Interactive Career Roadmap Graph visualizer',
          'Skill Gap Radar & Proficiency comparison widgets',
          'Dynamic step-by-step milestone progression nodes',
          'Responsive dark mode dashboard with stateful filters'
        ],
        description: 'Single Page Application (SPA) designed to render responsive career pathways, score visualizers, and recommendations with minimal paint latency.',
        protocolsOrFormats: ['React Virtual DOM', 'Async Fetch API', 'JSON Serialization'],
        securityOrOptimization: 'Component memoization, lazy loading of visual charts, client-side input sanitization.'
      },
      api: {
        id: 'tier-api',
        name: 'API Gateway',
        title: 'REST API Gateway & Request Dispatcher',
        technologies: ['Express.js Routing', 'CORS Middleware', 'Body-Parser', 'Rate Limiting'],
        keyComponents: [
          'POST /api/evaluate: Career & skill readiness payload handler',
          'GET /api/roadmap/:id: Milestone progression retrieval',
          'GET /api/skills/taxonomy: Canonical skill synonym mapping',
          'Request schema validation & payload sanitization interceptor'
        ],
        description: 'Centralized HTTP entrypoint that enforces input schemas, applies origin policies, and marshals requests to internal services.',
        protocolsOrFormats: ['HTTP/1.1 REST', 'Bearer Auth Tokens', 'JSON Payloads'],
        securityOrOptimization: 'CORS policy enforcement, rate limiting, and strict type assertion before dispatch.'
      },
      backend: {
        id: 'tier-backend',
        name: 'Backend',
        title: 'AI Intelligence & Recommendation Computation Engine',
        technologies: ['Node.js Runtime', 'Evaluation Engine', 'Taxonomy Matcher', 'Async Event Loop'],
        keyComponents: [
          'Skill Vector Matcher: Computes match % against target roles',
          'Skill Gap Gap-Score Matrix Calculator',
          'Milestone Sequencer: Generates topological learning path',
          'Recommendation Dispatcher: Curates learning resources'
        ],
        description: 'Core application logic server evaluating user proficiencies against current tech role requisitions and sequencing learning roadmaps.',
        protocolsOrFormats: ['Node.js Non-Blocking IO', 'Vector Gap Scoring', 'JSON Output'],
        securityOrOptimization: 'Decoupled pure evaluation functions, isolated processing loops, structured error boundaries.'
      },
      database: {
        id: 'tier-database',
        name: 'Database',
        title: 'Career Benchmark & User Profile Persistence Layer',
        technologies: ['Structured Data Store', 'Taxonomy Store', 'Indexed Key-Value Cache'],
        keyComponents: [
          'User Career State & Completed Milestones collection',
          'Industry Role Skill Benchmarks (Frontend, Full Stack, AI, DevOps)',
          'Canonical Skill Taxonomy (Synonyms: ReactJS -> React)',
          'Curated Open Learning Resources repository'
        ],
        description: 'Houses structured industry skill matrices, learning roadmaps, user saved progress states, and curriculum modules.',
        protocolsOrFormats: ['BSON / JSON Documents', 'Indexed Lookups', 'Unique Constraints'],
        securityOrOptimization: 'Indexed role keys for sub-10ms query lookup times and read-only benchmark integrity locks.'
      }
    },
    dataFlowSteps: [
      {
        step: 1,
        source: 'Frontend (React SPA)',
        target: 'API Gateway (Express)',
        action: 'User selects target role (e.g., Full Stack Developer) & enters self-reported skills; frontend dispatches POST /api/evaluate',
        payloadType: 'HTTP POST (JSON: { targetRole, userSkills, experienceLevel })',
        description: 'Client captures user input, validates non-empty payloads, and dispatches an asynchronous REST request.'
      },
      {
        step: 2,
        source: 'API Gateway',
        target: 'Backend (Evaluation Engine)',
        action: 'Middleware validates schema, sanitizes text strings, and forwards payload to the skill matching controller',
        payloadType: 'Internal Controller Dispatch (Validated Payload)',
        description: 'Express routes intercept the request, assert authentication state, and invoke the business evaluation handler.'
      },
      {
        step: 3,
        source: 'Backend Engine',
        target: 'Database Layer',
        action: 'Backend queries database for the canonical skill benchmark and learning syllabus associated with the target role',
        payloadType: 'Indexed Database Query (Role Identifier Key)',
        description: 'Retrieves standard required proficiencies (e.g. React, Node.js, SQL, System Design) for the target role.'
      },
      {
        step: 4,
        source: 'Database Layer',
        target: 'Backend Engine',
        action: 'Returns curated role taxonomy, difficulty weights, and sequential curriculum nodes to the server engine',
        payloadType: 'Structured Document Recordset (JSON/BSON)',
        description: 'The database fulfills the query with normalized competency weights and recommended project benchmarks.'
      },
      {
        step: 5,
        source: 'Backend Engine',
        target: 'API Gateway',
        action: 'Algorithm computes gap vectors, calculates readiness score %, sequences milestone roadmaps, and formats response',
        payloadType: 'Serialized Roadmap Object (JSON)',
        description: 'Assembles the comprehensive analysis report with prioritized missing skills and immediate recommended action items.'
      },
      {
        step: 6,
        source: 'API Gateway',
        target: 'Frontend (React SPA)',
        action: 'Returns HTTP 200 OK with formatted JSON; React client renders dynamic interactive roadmap and progress rings',
        payloadType: 'HTTP 200 Response ({ score, gaps, roadmapNodes })',
        description: 'The browser receives the response and renders interactive milestone cards without reloading the page.'
      }
    ]
  },
  {
    projectId: 'project-management-tool',
    projectTitle: 'Project Management Tool',
    tagline: 'Collaborative Agile Task & Sprint Orchestration Platform',
    category: 'Full Stack',
    githubUrl: 'https://github.com/SHUBHAMBANSAL58/CodeAlpha__-Project-Management-Tool',
    architecturePattern: 'Classic MERN (MongoDB, Express, React, Node.js) 3-Tier Architecture',
    databaseEngine: 'MongoDB (NoSQL Document Database)',
    communicationStyle: 'RESTful API / JSON Over HTTP',
    tiers: {
      frontend: {
        id: 'tier-frontend',
        name: 'Frontend',
        title: 'Interactive Agile Kanban Board & Task Manager',
        technologies: ['React 19', 'Tailwind CSS', 'Drag-and-Drop Handlers', 'Lucide Icons'],
        keyComponents: [
          'Multi-Column Kanban board (Backlog, Todo, In Progress, Done)',
          'Task Creation & Editing Modal with priority flags',
          'Sprint Burndown and Completion Progress Rings',
          'Real-time filter controls (Priority, Assignee, Due Date)'
        ],
        description: 'Single page agile project manager giving development teams instantaneous drag-and-drop task movements and milestone metrics.',
        protocolsOrFormats: ['React Component Tree', 'Async / Await REST', 'JSON Payloads'],
        securityOrOptimization: 'Optimistic UI updates with rollback state recovery if the backend server returns an error.'
      },
      api: {
        id: 'tier-api',
        name: 'API Gateway',
        title: 'Task Lifecycle & Sprint REST Gateway',
        technologies: ['Express.js Routing', 'Body Parser', 'Route Error Middleware'],
        keyComponents: [
          'GET /api/tasks: Retrieve filtered task board for active sprint',
          'POST /api/tasks: Create new prioritized task item',
          'PATCH /api/tasks/:id: Move task column or update status',
          'DELETE /api/tasks/:id: Safely archive or remove task item',
          'Lifecycle Transition Middleware: Asserts valid state shifts'
        ],
        description: 'RESTful route collection validating object IDs, asserting status transitions, and handling standard HTTP status codes.',
        protocolsOrFormats: ['RESTful HTTP Verbs (GET/POST/PATCH/DELETE)', 'JSON Format'],
        securityOrOptimization: 'Strict validation against enum values preventing invalid Kanban column transitions.'
      },
      backend: {
        id: 'tier-backend',
        name: 'Backend',
        title: 'Node.js Application Server & Sprint Aggregator',
        technologies: ['Node.js Runtime', 'Express Controllers', 'Mongoose ODM Pipelines'],
        keyComponents: [
          'Task State Transition Controller',
          'Sprint Completion Aggregation Calculator',
          'Task Priority Sorter & Deadline Alerts',
          'Audit Log Generator for sprint change history'
        ],
        description: 'Handles server-side business rules, atomic task updates, and automated recalculation of sprint velocity and burndown progress.',
        protocolsOrFormats: ['Node.js Event Loop', 'Mongoose Schema Middlewares'],
        securityOrOptimization: 'Atomic database mutations to avoid concurrency write conflicts between concurrent sprint members.'
      },
      database: {
        id: 'tier-database',
        name: 'Database',
        title: 'MongoDB NoSQL Document Persistence',
        technologies: ['MongoDB', 'Mongoose ODM', 'BSON Collections'],
        keyComponents: [
          'tasks Collection: (title, description, status, priority, sprintId, createdAt)',
          'sprints Collection: (name, startDate, endDate, status, goal)',
          'projects Collection: (projectName, members, repoUrl)',
          'Compound Indexes on { sprintId: 1, status: 1 }'
        ],
        description: 'NoSQL document database providing dynamic schema flexibility for rich task descriptions, tag arrays, and sprint milestones.',
        protocolsOrFormats: ['BSON Document Storage', 'Mongoose ObjectIDs', 'Aggregation Pipelines'],
        securityOrOptimization: 'Targeted compound indexing ensuring instantaneous task board loading even with hundreds of backlog items.'
      }
    },
    dataFlowSteps: [
      {
        step: 1,
        source: 'Frontend (Kanban Board)',
        target: 'API Gateway (Express)',
        action: 'User drags task card from "In Progress" to "Done"; client optimistically updates UI and issues PATCH /api/tasks/:id',
        payloadType: 'HTTP PATCH (JSON: { status: "Done", completedAt: ISOString })',
        description: 'The React UI updates immediately for zero perceived lag while triggering the network mutation.'
      },
      {
        step: 2,
        source: 'API Gateway',
        target: 'Backend (Task Controller)',
        action: 'Express router catches request, verifies valid MongoDB ObjectId, and routes payload to task transition controller',
        payloadType: 'Internal Controller Dispatch (Task ID + Status Payload)',
        description: 'Validates that the target status is a recognized column and the task ID matches schema rules.'
      },
      {
        step: 3,
        source: 'Backend (Task Controller)',
        target: 'Database (MongoDB)',
        action: 'Executes findByIdAndUpdate with atomic $set operator and updates task completion timestamp',
        payloadType: 'Mongoose findByIdAndUpdate Command',
        description: 'Commits the change directly to the MongoDB tasks collection.'
      },
      {
        step: 4,
        source: 'Database (MongoDB)',
        target: 'Backend (Task Controller)',
        action: 'MongoDB acknowledges the write and returns the updated task document to the application runtime',
        payloadType: 'BSON Document Acknowledgment',
        description: 'Confirms that the document was successfully persisted on disk.'
      },
      {
        step: 5,
        source: 'Backend (Task Controller)',
        target: 'API Gateway',
        action: 'Runs aggregation pipeline calculating updated sprint completion percentage and bundles confirmation payload',
        payloadType: 'Structured Response Object (Task + Sprint Metrics)',
        description: 'Computes the ratio of done tasks versus total sprint tasks for live metric display.'
      },
      {
        step: 6,
        source: 'API Gateway',
        target: 'Frontend (Kanban Board)',
        action: 'Transmits HTTP 200 OK with confirmed task state & new sprint burndown metric; frontend solidifies state',
        payloadType: 'HTTP 200 OK Response (JSON)',
        description: 'The client verifies successful backend confirmation and updates the sprint progress percentage.'
      }
    ]
  },
  {
    projectId: 'simple-ecommerce-store',
    projectTitle: 'Simple E-commerce Store',
    tagline: 'Full-Featured Digital Storefront with Authentication & Cart',
    category: 'E-commerce',
    githubUrl: 'https://github.com/SHUBHAMBANSAL58/CodeAlpha__Simple-E-commerce-Store',
    architecturePattern: 'Lightweight Client-Server Architecture with Embedded Relational Storage',
    databaseEngine: 'SQLite3 (Embedded Relational Database)',
    communicationStyle: 'RESTful API / JSON Over HTTP',
    tiers: {
      frontend: {
        id: 'tier-frontend',
        name: 'Frontend',
        title: 'Vanilla JavaScript & CSS3 Storefront',
        technologies: ['Vanilla ES6+ JavaScript', 'HTML5 Semantic Elements', 'CSS3 Grid & Flexbox'],
        keyComponents: [
          'Dynamic Product Catalogue Grid with instant search filter',
          'Slide-over Shopping Cart Drawer with quantity steppers',
          'Checkout Modal with client-side address & payment validation',
          'User Authentication state pill and session tracker'
        ],
        description: 'High-speed, zero-dependency frontend written in pure modern JavaScript for lightning-fast initial load times.',
        protocolsOrFormats: ['DOM Event Delegation', 'Window LocalStorage', 'Fetch API'],
        securityOrOptimization: 'Debounced search input events, DOM fragment batching, and lightweight footprint (<25KB).'
      },
      api: {
        id: 'tier-api',
        name: 'API Gateway',
        title: 'Catalogue & Transaction Routing Gateway',
        technologies: ['Express.js Routing', 'Body Parser', 'Cookie Parser Middleware'],
        keyComponents: [
          'GET /api/products: Fetch categorized catalogue items',
          'POST /api/auth/login: User session verification',
          'POST /api/cart/validate: Real-time inventory check for cart items',
          'POST /api/checkout: Transactional order placement endpoint'
        ],
        description: 'Express routing layer routing catalogue queries and authenticating checkout payloads against the database.',
        protocolsOrFormats: ['HTTP REST Endpoints', 'Session Cookies', 'JSON Payloads'],
        securityOrOptimization: 'HTTP-only cookie protection for sessions, idempotent transaction keys for order submissions.'
      },
      backend: {
        id: 'tier-backend',
        name: 'Backend',
        title: 'Order Processing & Stock Control Engine',
        technologies: ['Node.js Server', 'Express Application Controllers', 'SQL Statement Preparer'],
        keyComponents: [
          'Server-Side Price Verification Calculator (prevents client price tampering)',
          'Stock Reservation & Inventory Decrementer',
          'Order Number & Receipt Generator',
          'User Session Verifier'
        ],
        description: 'Enforces essential e-commerce business integrity: never trusts client pricing, verifies item availability, and processes orders.',
        protocolsOrFormats: ['Node.js Asynchronous Execution', 'SQL Transactions'],
        securityOrOptimization: 'Atomic transactional SQL commits ensuring inventory is decremented only when the order insertion succeeds.'
      },
      database: {
        id: 'tier-database',
        name: 'Database',
        title: 'SQLite Embedded Relational Database',
        technologies: ['SQLite3 Database Engine', 'Parameterized SQL', 'Foreign Key Relations'],
        keyComponents: [
          'products Table: (id, name, category, price, stock, image_url)',
          'users Table: (id, name, email, password_hash, created_at)',
          'orders Table: (id, user_id, order_number, total_amount, status)',
          'order_items Table: (id, order_id, product_id, quantity, unit_price)'
        ],
        description: 'Zero-configuration embedded relational SQL database maintaining clean transactional integrity and zero maintenance overhead.',
        protocolsOrFormats: ['Relational Tables', 'Foreign Key Constraints', 'ACID SQL Transactions'],
        securityOrOptimization: '100% Parameterized queries strictly preventing SQL Injection; ACID compliance for order processing.'
      }
    },
    dataFlowSteps: [
      {
        step: 1,
        source: 'Storefront Client',
        target: 'API Gateway (Express)',
        action: 'Customer reviews shopping cart and clicks "Place Order"; browser issues POST /api/checkout with item IDs & quantities',
        payloadType: 'HTTP POST (JSON: { items: [{ id, qty }], shippingDetails })',
        description: 'Customer initiates purchase; frontend validates postal and contact fields before sending payload.'
      },
      {
        step: 2,
        source: 'API Gateway',
        target: 'Backend (Order Controller)',
        action: 'Express routing parses payload, verifies session cookie, and routes to the order placement controller',
        payloadType: 'Internal Controller Call (Validated Order Items)',
        description: 'Checks that the user is logged in or guest session is valid, then forwards to the transactional processor.'
      },
      {
        step: 3,
        source: 'Backend (Order Controller)',
        target: 'Database (SQLite3)',
        action: 'Begins SQL transaction; queries SQLite products table to fetch server-authoritative prices and verify stock > qty',
        payloadType: 'SQL Query: "BEGIN TRANSACTION; SELECT price, stock FROM products WHERE id IN (...)"',
        description: 'Crucial security step ensuring customer cannot tamper with product prices in browser DevTools.'
      },
      {
        step: 4,
        source: 'Database (SQLite3)',
        target: 'Backend (Order Controller)',
        action: 'SQLite returns verified pricing and confirms inventory availability for all requested line items',
        payloadType: 'SQL Recordset with True Pricing & Stock Counts',
        description: 'Confirms that items are in stock and provides verified cost values for official subtotal calculation.'
      },
      {
        step: 5,
        source: 'Backend (Order Controller)',
        target: 'Database (SQLite3)',
        action: 'Computes total, inserts record into orders and order_items tables, decrements stock in products, and commits transaction',
        payloadType: 'SQL Transaction: "INSERT INTO orders ...; UPDATE products SET stock = stock - qty ...; COMMIT;"',
        description: 'Atomic write: if any product runs out of stock, the entire transaction rolls back cleanly.'
      },
      {
        step: 6,
        source: 'API Gateway',
        target: 'Storefront Client',
        action: 'Returns HTTP 201 Created with generated Order # and summary receipt; client clears cart and displays success modal',
        payloadType: 'HTTP 201 Response (JSON: { orderId, orderNumber, total, items })',
        description: 'Customer sees confirmation receipt, and cart counter resets to 0.'
      }
    ]
  },
  {
    projectId: 'hrms-system',
    projectTitle: 'Human Resource Management System',
    tagline: 'Enterprise Employee Directory, Attendance & Hierarchy System',
    category: 'Team Project',
    githubUrl: 'https://github.com/SHUBHAMBANSAL58',
    architecturePattern: 'Enterprise Multi-Tier Architecture with Role-Based Access Control (RBAC)',
    databaseEngine: 'Enterprise Relational & Document Schema Store',
    communicationStyle: 'RESTful API / Token Authorized',
    tiers: {
      frontend: {
        id: 'tier-frontend',
        name: 'Frontend',
        title: 'Enterprise Management Portal & Hierarchy Visualizer',
        technologies: ['React.js', 'Tailwind CSS', 'SVG Tree Visualizer', 'Lucide Icons'],
        keyComponents: [
          'Interactive Organizational Hierarchy Tree with expandable nodes',
          'Employee Directory with role-filtered table view and search',
          'Live Attendance Punch widget with real-time shift clock',
          'Monthly Presence Doughnut & Attendance percentage cards'
        ],
        description: 'Comprehensive administrative dashboard designed for multi-tier enterprise personnel management, built as Co-Leader of a 5-member team.',
        protocolsOrFormats: ['React State & Context', 'Token-authenticated Fetch API'],
        securityOrOptimization: 'Role-based UI gating: hiding sensitive payroll/personnel management actions from standard employee roles.'
      },
      api: {
        id: 'tier-api',
        name: 'API Gateway',
        title: 'RBAC Security Gateway & API Controller',
        technologies: ['Express.js Routing', 'Role-Based Access Control (RBAC)', 'JWT Token Interceptor'],
        keyComponents: [
          'GET /api/employees: Role-restricted employee directory list',
          'POST /api/attendance/punch: Shift clock-in/out timestamp recorder',
          'GET /api/departments/tree: Recursive hierarchy graph endpoint',
          'RBAC Authorization Middleware: Enforces Admin/HR/Staff privilege levels'
        ],
        description: 'Defensive API gateway validating cryptographic tokens and blocking unauthorized access to employee records.',
        protocolsOrFormats: ['HTTP Authorization: Bearer <token>', 'REST Endpoints'],
        securityOrOptimization: 'Strict RBAC guards rejecting vertical and horizontal privilege escalations with HTTP 403 Forbidden.'
      },
      backend: {
        id: 'tier-backend',
        name: 'Backend',
        title: 'Workforce Operations & Hierarchy Aggregator Engine',
        technologies: ['Node.js Runtime', 'Express Controller Layer', 'Recursive Tree Traversal Algorithm'],
        keyComponents: [
          'Attendance Shift Calculation Service: Computes total work duration',
          'Recursive Hierarchy Tree Builder: Traverses employee manager relationships',
          'Leave Request Approval Workflow Engine',
          'Audit Log Manager for employee record modifications'
        ],
        description: 'Handles business policies, computes employee overtime/working hours, and transforms flat database records into nested hierarchy trees.',
        protocolsOrFormats: ['Node.js Event-driven Processing', 'Recursive Algorithms'],
        securityOrOptimization: 'Complete audit logging of any record changes or role promotions for enterprise compliance.'
      },
      database: {
        id: 'tier-database',
        name: 'Database',
        title: 'Personnel & Attendance Enterprise Store',
        technologies: ['Relational & Document Database', 'Timestamped Log Store', 'Encrypted PII Storage'],
        keyComponents: [
          'employees Collection/Table: (empId, name, role, departmentId, managerId, email)',
          'attendance_logs Collection/Table: (id, empId, date, checkInTime, checkOutTime, status)',
          'departments Collection/Table: (id, name, headEmployeeId, budgetCode)',
          'leave_requests Collection/Table: (id, empId, startDate, endDate, status, approverId)'
        ],
        description: 'Stores enterprise personnel records, manager-subordinate relationship pointers, and timestamped attendance events.',
        protocolsOrFormats: ['Relational Foreign Keys / Document References', 'ISO 8601 Timestamps'],
        securityOrOptimization: 'Encrypted personal data fields and compound index on (employeeId, date) for instantaneous monthly report generation.'
      }
    },
    dataFlowSteps: [
      {
        step: 1,
        source: 'Employee Portal',
        target: 'API Gateway',
        action: 'Employee arrives at work and clicks "Punch In"; portal issues POST /api/attendance/punch with client timestamp & location tag',
        payloadType: 'HTTP POST (Bearer Token + { timestamp: ISOString })',
        description: 'Browser sends secure authenticated punch request.'
      },
      {
        step: 2,
        source: 'API Gateway',
        target: 'Backend (Attendance Controller)',
        action: 'RBAC middleware validates JWT signature, extracts employee ID & role, and forwards to attendance controller',
        payloadType: 'Internal Controller Call (Authenticated Employee Context)',
        description: 'Asserts employee token validity and verifies that user account is in active status.'
      },
      {
        step: 3,
        source: 'Backend (Attendance Controller)',
        target: 'Database Layer',
        action: 'Queries attendance logs for today to prevent duplicate punch-ins, then inserts new check-in timestamp record',
        payloadType: 'Database Insert Query (empId, date, checkInTime, status: "Present")',
        description: 'Records the official check-in time stamp into the attendance log store.'
      },
      {
        step: 4,
        source: 'Database Layer',
        target: 'Backend (Attendance Controller)',
        action: 'Database confirms write and returns active check-in record details and monthly attendance count',
        payloadType: 'Persisted Recordset Confirmation',
        description: 'Confirms that the shift punch event is stored on disk.'
      },
      {
        step: 5,
        source: 'Backend (Attendance Controller)',
        target: 'API Gateway',
        action: 'Aggregates department-wide presence ratios and builds response with active session status and shift timers',
        payloadType: 'Attendance Status Object (JSON)',
        description: 'Calculates whether the punch occurred on-time according to company shift schedules.'
      },
      {
        step: 6,
        source: 'API Gateway',
        target: 'Employee Portal',
        action: 'Transmits HTTP 200 OK; portal displays green "Checked In" status badge, running shift counter, and updated calendar',
        payloadType: 'HTTP 200 OK Response ({ status: "Present", checkInTime, monthlyPercentage })',
        description: 'The employee portal reflects the verified attendance state with visual confirmation.'
      }
    ]
  }
];
