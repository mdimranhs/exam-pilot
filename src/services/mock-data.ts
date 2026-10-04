import { Exam, MCQQuestion, Subject, SubjectiveQuestion } from '@/types';

export const MOCK_EXAMS: Exam[] = [
  {
    id: 'asst-prog',
    name: 'Assistant Programmer',
    shortName: 'AP (Govt)',
    slug: 'assistant-programmer',
    description: 'Targeted preparation for ICT/Ministry/Commission Assistant Programmer written & MCQ tests.',
    category: 'ict',
    subjectsCount: 11,
    totalMarks: 200,
    isAvailable: true,
    badge: 'Popular',
  },
  {
    id: 'ntrca',
    name: 'NTRCA (Lecturer / Teacher)',
    shortName: 'NTRCA',
    slug: 'ntrca',
    description: 'Non-Government Teachers Registration and Certification Authority examination.',
    category: 'teacher',
    subjectsCount: 6,
    totalMarks: 100,
    isAvailable: true,
    badge: 'Registration',
  },
  {
    id: 'bcs',
    name: 'BCS (General & Technical Cadre)',
    shortName: 'BCS',
    slug: 'bcs',
    description: 'Bangladesh Civil Service competitive preliminary and written preparation.',
    category: 'government',
    subjectsCount: 10,
    totalMarks: 200,
    isAvailable: false,
    badge: 'Upcoming',
  },
];

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 'subj-oop',
    examId: 'asst-prog',
    name: 'Object-Oriented Programming (OOP)',
    code: 'CS-101',
    iconName: 'code-slash-outline',
    description: 'Encapsulation, Inheritance, Polymorphism, Abstraction, and SOLID principles.',
    totalTopics: 8,
    totalQuestions: 45,
  },
  {
    id: 'subj-dbms',
    examId: 'asst-prog',
    name: 'Database Management Systems (DBMS)',
    code: 'CS-102',
    iconName: 'server-outline',
    description: 'Relational algebra, SQL, Normalization, ACID transactions, and Indexing.',
    totalTopics: 10,
    totalQuestions: 60,
  },
  {
    id: 'subj-dsa',
    examId: 'asst-prog',
    name: 'Data Structures & Algorithms',
    code: 'CS-103',
    iconName: 'git-branch-outline',
    description: 'Arrays, Trees, Graphs, Sorting, Searching, and Asymptotic Complexity.',
    totalTopics: 12,
    totalQuestions: 80,
  },
  {
    id: 'subj-os',
    examId: 'asst-prog',
    name: 'Operating Systems',
    code: 'CS-104',
    iconName: 'hardware-chip-outline',
    description: 'Processes, Threads, Scheduling algorithms, Deadlocks, and Virtual Memory.',
    totalTopics: 7,
    totalQuestions: 50,
  },
  {
    id: 'subj-net',
    examId: 'asst-prog',
    name: 'Computer Networks',
    code: 'CS-105',
    iconName: 'globe-outline',
    description: 'OSI 7 Layers, TCP/IP, Subnetting, Routing protocols, and HTTP/HTTPS.',
    totalTopics: 9,
    totalQuestions: 55,
  },
  {
    id: 'subj-se',
    examId: 'asst-prog',
    name: 'Software Engineering',
    code: 'CS-106',
    iconName: 'construct-outline',
    description: 'SDLC, Agile/Scrum, Design Patterns, Testing methodologies, and CI/CD.',
    totalTopics: 6,
    totalQuestions: 40,
  },
];

export const MOCK_MCQ_QUESTIONS: MCQQuestion[] = [
  {
    id: 'mcq-1',
    examId: 'asst-prog',
    subjectId: 'subj-dbms',
    topicId: 'topic-norm',
    type: 'mcq',
    question: 'Which normal form is strictly based on the concept of "Transitive Functional Dependency"?',
    difficulty: 'medium',
    marks: 1,
    options: ['1NF', '2NF', '3NF', 'BCNF'],
    correctOptionIndex: 2,
    explanation: 'A relation is in 3NF if it is in 2NF and no non-prime attribute is transitively dependent on the primary key (X -> Y and Y -> Z where Z is non-prime).',
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'mcq-2',
    examId: 'asst-prog',
    subjectId: 'subj-oop',
    topicId: 'topic-poly',
    type: 'mcq',
    question: 'In C++, which mechanism is primarily used to achieve runtime polymorphism?',
    difficulty: 'easy',
    marks: 1,
    options: ['Function overloading', 'Operator overloading', 'Virtual functions', 'Friend functions'],
    correctOptionIndex: 2,
    explanation: 'Virtual functions resolved through a vtable (virtual method table) at runtime allow dynamic dispatch / runtime polymorphism.',
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'mcq-3',
    examId: 'asst-prog',
    subjectId: 'subj-net',
    topicId: 'topic-osi',
    type: 'mcq',
    question: 'At which OSI layer does the IP (Internet Protocol) operate?',
    difficulty: 'easy',
    marks: 1,
    options: ['Data Link Layer', 'Network Layer', 'Transport Layer', 'Session Layer'],
    correctOptionIndex: 1,
    explanation: 'The Network layer (Layer 3) handles logical addressing and packet routing across intermediate routers.',
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
];

export const MOCK_SUBJECTIVE_QUESTIONS: SubjectiveQuestion[] = [
  {
    id: 'subj-q-1',
    examId: 'asst-prog',
    subjectId: 'subj-dbms',
    topicId: 'topic-acid',
    type: 'subjective',
    question: 'Explain the ACID properties of a database transaction. For each property, provide a brief explanation and describe what failure would occur if that property were violated.',
    difficulty: 'medium',
    marks: 10,
    modelAnswer: `ACID stands for Atomicity, Consistency, Isolation, and Durability:

1. Atomicity: All operations within a transaction succeed or all fail ("all-or-nothing"). If power fails halfway through transferring funds, the transaction is rolled back.
Violation: Money is deducted from account A but never credited to account B.

2. Consistency: The database must move from one valid state to another, preserving all schema constraints, cascades, and invariants.
Violation: A transaction commits an order with an invalid or deleted customer foreign key.

3. Isolation: Concurrent transactions execute without interfering with one another as if executed serially.
Violation: Dirty reads, non-repeatable reads, or phantom reads where transaction A reads intermediate uncommitted state from transaction B.

4. Durability: Once a transaction commits, its changes survive system crashes or power outages, usually achieved through write-ahead logging (WAL).
Violation: Confirmed user payment record vanishes after server restart.`,
    keyPoints: [
      'Definition of Atomicity (all-or-nothing rollback)',
      'Definition of Consistency (schema rules & invariants)',
      'Definition of Isolation (concurrency control & dirty read prevention)',
      'Definition of Durability (persistence via WAL/logs after commit)',
      'Concrete failure or banking example for each',
    ],
    evaluationCriteria: [
      'Clear definition of all four properties (4 marks)',
      'Accurate failure consequences for each property (4 marks)',
      'Clarity, terminology, and technical precision (2 marks)',
    ],
    explanation: 'ACID properties guarantee reliability and correctness in relational database management systems.',
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'subj-q-2',
    examId: 'asst-prog',
    subjectId: 'subj-oop',
    topicId: 'topic-solid',
    type: 'subjective',
    question: 'What is the Liskov Substitution Principle (LSP) in SOLID design? Explain with a classic example of violation (e.g. Rectangle and Square) and how to resolve it.',
    difficulty: 'hard',
    marks: 10,
    modelAnswer: `The Liskov Substitution Principle (LSP) states that objects of a superclass should be replaceable with objects of a subclass without altering the correctness or desirable properties of the program.

Classic Violation:
A Square inheriting from Rectangle. If Rectangle has setWidth(w) and setHeight(h), changing width does not change height. However, in Square, setting width must change height to maintain square geometry. Code expecting a Rectangle behaves unexpectedly if a Square is passed.

Resolution:
Separate behaviors into common interfaces (e.g. Shape with getArea()) or favor composition over inheritance rather than forcing Square to inherit Rectangle mutable setters.`,
    keyPoints: [
      'Formal definition of LSP (substitutability without breaking client expectations)',
      'Rectangle vs Square violation explanation',
      'Reason why subclass violates contract/invariants',
      'Architectural fix (interface segregation or composition)',
    ],
    evaluationCriteria: [
      'Formal definition accuracy (3 marks)',
      'Clear explanation of the violation (4 marks)',
      'Correct architectural solution (3 marks)',
    ],
    explanation: 'LSP is fundamental to maintainable object-oriented architectures and predictable polymorphism.',
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
];
