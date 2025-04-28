export const DesignPatternsRules = {
  applicability: {
    filePatterns: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'], // Applicable to all code files
  },
  category: 'patterns',
  id: 'design-patterns',
  priority: 'critical',
  type: 'architecture',
  version: '1.0.1',
};

export const DesignPatternsGuide = {
  /**
   * Applying Design Patterns - A Guide for Agents
   */
  applyingDesignPatterns: {
    description:
      'A step-by-step guide for agents to effectively apply design patterns in various scenarios.',
    steps: [
      {
        actions: [
          'Analyze the specific problem or requirement.',
          'Identify recurring design challenges within the project.',
          'Categorize the problem into Creational, Structural, or Behavioral.',
        ],
        phase: 'Problem Understanding',
      },
      {
        actions: [
          'Review the available patterns in the relevant category.',
          "Evaluate each pattern's `useCases`, `benefits`, and `pitfalls`.",
          'Choose the pattern that best fits the problem and context.',
        ],
        phase: 'Pattern Selection',
      },
      {
        actions: [
          'Follow the `bestPractices` for the chosen pattern.',
          'Adapt the `example` code to your specific scenario.',
          'Ensure proper integration with existing architecture.',
        ],
        phase: 'Implementation',
      },
      {
        actions: [
          'Write unit tests for the newly implemented pattern.',
          'Perform integration tests to ensure proper interaction with other components.',
          'Monitor for performance and identify any bottlenecks.',
        ],
        phase: 'Testing',
      },
      {
        actions: [
          'Document the application of the design pattern.',
          'Explain the rationale for choosing the pattern.',
          'Provide clear usage instructions and examples.',
        ],
        phase: 'Documentation',
      },
      {
        actions: [
          'Review the implementation after deployment.',
          'Gather feedback and identify areas for improvement.',
          "Iterate and refactor as needed, keeping the pattern's principles in mind.",
        ],
        phase: 'Refinement',
      },
    ],
  },

  /**
   * Introduction to Design Patterns
   */
  introduction: {
    description:
      'This guide provides a structured approach to understanding and applying various software design patterns. Each pattern is presented with its definition, use cases, benefits, best practices, examples, and common pitfalls.',
  },

  /**
   * Pattern Selection Guidance
   */
  patternSelection: {
    description:
      'Choosing the right design pattern is crucial for the success of your project. Consider the following factors:',
    factors: [
      'Project Size and Complexity',
      'Scalability Requirements',
      'Maintainability Needs',
      'Team Expertise',
      'Deployment Environment',
      'Performance Goals',
      'Security Considerations',
    ],
  },

  /**
   * Design Patterns
   */
  patterns: {
    broker: {
      benefits: ['Loose Coupling', 'Scalability', 'Flexibility'],
      bestPractices: [
        'Use a reliable message broker (e.g., Apache Kafka, RabbitMQ).',
        'Define clear message schemas and contracts.',
        'Implement error handling and retry mechanisms.',
      ],
      description:
        'Uses a central broker component to mediate communication between distributed components. Components register with the broker and communicate through it.',
      example: `
// Example Broker Interaction (Conceptual - using a functional approach)

type Message = { topic: string; payload: any };
type Subscriber = (message: Message) => void;

const createBroker = () => {
  const subscribers: Map<string, Subscriber[]> = new Map();

  const publish = (topic: string, payload: any) => {
    const message: Message = { topic, payload };
    subscribers.get(topic)?.forEach(subscriber => subscriber(message));
  };

  const subscribe = (topic: string, subscriber: Subscriber) => {
    if (!subscribers.has(topic)) {
      subscribers.set(topic, []);
    }
    subscribers.get(topic)?.push(subscriber);
    
    return () => { // Unsubscribe function
      subscribers.set(topic, subscribers.get(topic)?.filter(s => s !== subscriber) || []);
    };
  };

  return { publish, subscribe };
};

// Usage
const broker = createBroker();

broker.subscribe('user-created', (message) => {
  console.log('User created:', message.payload);
});

broker.publish('user-created', { userId: 123, name: 'Alice' });
`,
      useCases: [
        "Distributed systems with loosely coupled components",
        "Systems where components need to interact without direct knowledge of each other"
      ],
      pitfalls: [
        'Broker becoming a single point of failure',
        'Complexity in managing message routing and delivery',
        'Performance bottlenecks if the broker is overloaded',
      ],
    },

    blackboard: {
      benefits: [
        "Flexibility",
        "Collaboration",
        "Modularity"
      ],
      description:
        'Uses a shared data structure (blackboard) that multiple components (knowledge sources) can access and modify. Components work independently and contribute to solving a problem collaboratively.',
      bestPractices: [
        'Define a clear structure for the blackboard data.',
        'Implement a control mechanism to manage the interaction between knowledge sources.',
        'Handle conflicts and inconsistencies in the blackboard data.',
      ],
      useCases: [
        "AI systems, expert systems",
        "Complex problem-solving applications"
      ],
      example: `
// Example Blackboard Interaction (Conceptual - using a functional approach)

type BlackboardData = { [key: string]: any };
type KnowledgeSource = (blackboard: Blackboard) => void;

class Blackboard {
  private data: BlackboardData = {};

  read(key: string): any {
    return this.data[key];
  }

  write(key: string, value: any): void {
    this.data[key] = value;
  }

  subscribe(key: string, callback: (value: any) => void): () => void {
    // In a real system, this would involve event listeners
    // Here we provide a simplified subscription for demonstration
    const intervalId = setInterval(() => {
      if (this.data[key] !== undefined) {
        callback(this.data[key]);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }
}

const knowledgeSourceA: KnowledgeSource = (blackboard: Blackboard) => {
  const data = blackboard.read('input');
  if (data) {
    const processedData = data.toUpperCase();
    blackboard.write('processed', processedData);
  }
};

const knowledgeSourceB: KnowledgeSource = (blackboard: Blackboard) => {
  const data = blackboard.read('processed');
  if (data) {
    console.log('Processed data:', data);
  }
};

// Usage
const blackboard = new Blackboard();
blackboard.subscribe('processed', (value) => console.log("Subscriber received:", value));

knowledgeSourceA(blackboard);
blackboard.write('input', 'hello'); // Trigger the process
`,
      pitfalls: [
        'Complexity in managing shared data and access control',
        'Potential for conflicts and inconsistencies',
        'Debugging challenges due to asynchronous interactions',
      ],
    },

    clientServer: {
      benefits: [
        "Centralized Data Management",
        "Scalability",
        "Resource Sharing"
      ],
      description:
        'Separates the application into two main components: Client (requests services) and Server (provides services).',
      bestPractices: [
        'Use robust protocols for communication (e.g., HTTPS).',
        'Implement proper authentication and authorization on the server.',
        'Design APIs that are easy to use and well-documented.',
      ],
      useCases: [
        "Networked applications",
        "Applications requiring centralized data management"
      ],
      example: `
// Example Client-Server Interaction using fetch API (functional approach)

// Client
const fetchUsers = async (): Promise<any> => {
  const response = await fetch('/api/users');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Server (using Express.js - can be adapted to functional style)
// app.get('/api/users', (req, res) => {
//   // ... database query to get users ...
//   res.json(users);
// });
`,
      pitfalls: [
        'Network latency affecting performance',
        'Single point of failure on the server',
        'Security vulnerabilities if not properly secured',
      ],
    },

    eventDriven: {
      benefits: [
        'Loose Coupling',
        'Scalability',
        'Responsiveness',
        'Flexibility',
      ],
      bestPractices: [
        'Use a message broker or event streaming platform (e.g., Kafka).',
        'Define clear event schemas.',
        'Consider event sourcing or CQRS patterns.',
        'Handle event ordering and delivery guarantees.',
      ],
      description:
        'Components communicate asynchronously by emitting and subscribing to events.',
      example: `
// Example Event-Driven Flow using a functional approach

type EventHandler = (eventData: any) => void;
const createEventBus = () => {
  const subscribers: Map<string, EventHandler[]> = new Map();

  const subscribe = (eventName: string, handler: EventHandler): (() => void) => {
    if (!subscribers.has(eventName)) {
      subscribers.set(eventName, []);
    }
    subscribers.get(eventName)?.push(handler);
    return () => { // Unsubscribe
      subscribers.set(eventName, subscribers.get(eventName)?.filter(h => h !== handler) || []);
    };
  };

  const emit = (eventName: string, eventData: any): void => {
    subscribers.get(eventName)?.forEach(handler => handler(eventData));
  };

  return { subscribe, emit };
};

// Usage
const eventBus = createEventBus();
const unsubscribe = eventBus.subscribe('order-placed', (data) => console.log('Order placed:', data));
eventBus.emit('order-placed', { orderId: 'xyz', amount: 100 });
unsubscribe(); // Optional: unsubscribe later
`,
      pitfalls: [
        'Complexity in managing event flows',
        'Potential for event duplication or loss',
        'Debugging challenges',
      ],
      useCases: [
        'Applications with asynchronous, loosely coupled interactions',
        'Systems requiring real-time responsiveness',
      ],
    },

    layered: {
      benefits: ['Modularity', 'Maintainability', 'Scalability', 'Flexibility'],
      bestPractices: [
        'Strictly enforce dependencies between layers (e.g., Presentation -> Application -> Business -> Data Access).',
        'Use interfaces to define contracts between layers.',
        'Avoid placing business logic in the Presentation or Data Access layers.',
      ],
      description:
        'Organizes the application into distinct horizontal layers, each with a specific responsibility (Presentation, Application, Business, Data Access).',
      example: `
// Example Layered Architecture Structure
src/
├── presentation/ # UI Layer (Components, Views)
│   └── components/
│   └── views/
├── application/  # Application Logic (Use Cases, Services)
│   └── services/
│   └── use-cases/
├── domain/       # Business Logic (Entities, Value Objects, Domain Events)
│   └── entities/
│   └── value-objects/
└── infrastructure/ # Data Access, External Services
    └── persistence/
    └── api-clients/
`,
      pitfalls: [
        'Overly complex layering for small applications',
        'Tight coupling between layers',
        'Inconsistent layer responsibilities',
      ],
      useCases: [
        'Applications with clear separation of concerns',
        'Projects where layers need to evolve independently',
      ],
    },

    microkernel: {
      benefits: ['Extensibility', 'Flexibility', 'Maintainability'],
      bestPractices: [
        'Define a clear plugin interface and contract.',
        'Use a plugin registry to manage plugin lifecycle.',
        'Implement plugin versioning and dependency management.',
        'Consider security implications when loading external plugins.',
      ],
      description:
        'Defines a core system that provides basic functionality and allows for the addition of independent extension modules (plugins).',
      example: `
// Example Microkernel Structure
core/             # Core system functionality
├── index.ts
├── services/
└── types/

plugins/          # Extension modules
├── plugin-a/
│   └── index.ts
└── plugin-b/
    └── index.ts

main.ts           # Application entry point, loads core and plugins
`,
      pitfalls: [
        'Complexity in managing plugin interactions and dependencies.',
        'Potential performance overhead due to plugin isolation.',
        'Security risks if plugins are not properly validated.',
      ],
      useCases: [
        'Applications that need to support a wide range of features that can be added or removed dynamically',
        'Building customizable or extensible systems.',
      ],
    },

    microservices: {
      benefits: [
        'Independent Deployments',
        'Scalability',
        'Fault Isolation',
        'Technology Diversity',
      ],
      bestPractices: [
        'Use API Gateways for communication.',
        'Implement service discovery and registration.',
        'Use asynchronous communication (e.g., message queues).',
        'Implement distributed tracing and monitoring.',
        'Consider a service mesh for advanced traffic management.',
      ],
      description:
        'Structures an application as a collection of small, independent services, each focusing on a specific business capability.',
      example: `
// Example Microservices Structure
services/
├── user-service/     # Handles user authentication and management
│   └── src/
│   └── package.json
├── product-service/  # Handles product catalog and inventory
│   └── src/
│   └── package.json
└── order-service/    # Handles order processing
    └── src/
    └── package.json

api-gateway/        # Entry point for client requests
  └── src/
  └── package.json
`,
      pitfalls: [
        'Increased operational complexity',
        'Data consistency challenges across services',
        'Debugging and monitoring difficulties',
      ],
      useCases: [
        'Large, complex applications',
        'Systems requiring independent scalability and deployment',
      ],
    },

    monolithic: {
      benefits: ['Simplicity', 'Performance', 'Easier Transaction Management'],
      bestPractices: [
        'Keep the codebase modular to avoid tight coupling.',
        'Use automated testing to ensure code quality.',
        'Monitor performance and consider refactoring if the application grows too large.',
      ],
      description:
        'Structures an application as a single, self-contained unit. All components are part of the same codebase and deployed together.',
      example: `
// Example Monolithic Application Structure
src/
├── components/     # Shared UI components
├── modules/        # Feature modules (e.g., users, products, orders)
│   ├── users/
│   ├── products/
│   └── orders/
├── services/       # Business logic services
├── config/         # Application configuration
├── utils/          # Utility functions
└── main.ts         # Application entry point
`,
      pitfalls: [
        'Difficulties in scaling specific parts of the application',
        'Longer deployment times as the application grows',
        'Challenges in adopting new technologies',
      ],
      useCases: [
        'Small to medium-sized applications',
        'Applications where simplicity is a priority',
      ],
    },

    mvc: {
      benefits: ['Separation of Concerns', 'Maintainability', 'Testability'],
      bestPractices: [
        'Keep controllers thin by moving business logic to the Model.',
        'Use data binding to keep the View and Model in sync.',
        'Avoid putting too much logic in the View.',
        'Consider using variants like MVVM for complex UIs.',
      ],
      description:
        'Separates an application into three interconnected parts: Model (data and business logic), View (user interface), and Controller (handles input and updates model/view).',
      example: `
// Example MVC Structure (Conceptual)
src/
├── models/         # Data representation and business logic
│   └── user.model.ts
├── views/          # User interface components (templates or React components)
│   └── user.view.tsx
└── controllers/    # Handles user input, interacts with model, updates view
    └── user.controller.ts

// --- Simplified Example Logic ---

// Model (Conceptual)
type User = { id: number; name: string };
const UserModel = {
  getUserById: (id: number): User | undefined => ({ id, name: 'Alice' }), // Dummy data
};

// Controller (Conceptual)
const UserController = {
  showUser: (userId: number): string => { // Returns HTML/View representation
    const user = UserModel.getUserById(userId);
    return renderUser(user); // Calls a view function
  },
};

// View (Conceptual function)
const renderUser = (user: User | undefined): string => {
  if (!user) return '<p>User not found</p>';
  return \`<p>User: \${user.name}</p>\`;
};

// Usage (Conceptual)
// const userView = UserController.showUser(123);
// display(userView); // Render the view
`,
      pitfalls: [
        "Overly complex controllers ('Fat Controllers')",
        'Tight coupling between Model and View',
        'Difficulties in testing UI components',
      ],
      useCases: [
        'Web applications',
        'Applications with a clear separation between UI, data, and control logic',
      ],
    },

    peerToPeer: {
      benefits: ['Decentralization', 'Scalability', 'Resilience'],
      bestPractices: [
        'Implement mechanisms for peer discovery and connection management.',
        'Consider security implications and implement appropriate measures.',
        'Handle data consistency and conflict resolution.',
      ],
      description:
        'Distributes responsibilities among equal participants (peers). Each peer can act as both a client and a server.',
      example: `
// Example Peer-to-Peer Interaction (Conceptual - using a functional approach)

type PeerId = string;
type Message = { sender: PeerId; content: string };
type MessageHandler = (message: Message) => void;

const createPeer = (id: PeerId) => {
  const connections = new Map<PeerId, MessageHandler>();
  let messageHandler: MessageHandler = () => {}; // Default handler

  const connect = (peerId: PeerId, handler: MessageHandler) => {
    connections.set(peerId, handler);
  };

  const disconnect = (peerId: PeerId) => {
    connections.delete(peerId);
  };

  const sendMessage = (peerId: PeerId, content: string) => {
    const handler = connections.get(peerId);
    if (handler) {
      handler({ sender: id, content });
    } else {
      console.warn(\`No connection to peer \${peerId}\`);
    }
  };

  // Set the handler for incoming messages
  const onMessage = (handler: MessageHandler) => {
    messageHandler = handler;
    return handler; // Return handler for chaining/verification if needed
  };

  // Internal function to simulate receiving a message
  const receiveMessage = (message: Message) => {
     messageHandler(message);
  };


  return { id, connect, disconnect, sendMessage, onMessage, receiveMessage }; // Expose receive for simulation
};

// Usage Simulation
const peerA = createPeer('A');
const peerB = createPeer('B');

peerA.connect('B', peerB.receiveMessage); // Peer A sends directly to B's receive
peerB.connect('A', peerA.receiveMessage); // Peer B sends directly to A's receive

peerA.onMessage((msg) => console.log(\`Peer A received: \${msg.content} from \${msg.sender}\`));
peerB.onMessage((msg) => console.log(\`Peer B received: \${msg.content} from \${msg.sender}\`));

peerA.sendMessage('B', 'Hello from A');
peerB.sendMessage('A', 'Hi from B');
`,
      pitfalls: [
        'Complexity in managing peer connections and discovery',
        'Security challenges in a decentralized environment',
        'Difficulties in ensuring data consistency',
      ],
      useCases: [
        'Decentralized applications',
        'File sharing, distributed computing',
      ],
    },
  },
}; 