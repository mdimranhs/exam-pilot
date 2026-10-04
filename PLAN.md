# ExamPilot — Product Development Plan

## Product Tagline

Learn. Practice. Write. Improve.

---

# 1. Vision

ExamPilot is an AI-powered exam preparation platform.

The initial focus is competitive and government-job preparation in Bangladesh.

The platform should eventually support:

- Assistant Programmer
- NTRCA
- BCS
- Bank Jobs
- Primary Teacher
- LGED
- ICT jobs
- Other competitive examinations

The platform must be designed so adding a new exam does not require
rewriting the application.

---

# 2. Core Differentiator

Most exam preparation applications focus heavily on MCQs.

ExamPilot focuses on:

# Subjective Answer Practice

The core loop:

Learn
↓
Practice
↓
Write
↓
AI Evaluation
↓
Improve
↓
Rewrite

A candidate should be able to practice the same way they would answer
a real written examination.

---

# 3. Initial MVP

The first MVP focuses on:

## Assistant Programmer

Initial subjects:

1. Programming Fundamentals
2. C Programming
3. C++
4. Data Structures
5. Algorithms
6. OOP
7. DBMS
8. Operating Systems
9. Computer Networks
10. Computer Architecture
11. Software Engineering

---

# 4. Secondary Exam

After the Assistant Programmer MVP:

## NTRCA

Potential subjects:

- Bangla
- English
- ICT
- General Knowledge
- Subject-specific preparation
- Written/subjective preparation

---

# 5. User Journey

## New User

Open app
↓
Onboarding
↓
Choose exam
↓
Choose target
↓
Home dashboard

---

# 6. Home Dashboard

The dashboard should show:

- Current exam
- Overall progress
- Continue learning
- Daily target
- Study streak
- Recommended practice
- Weak topics
- Recent activity

Example:

Good evening 👋

Assistant Programmer

Progress
███████░░░ 70%

Continue Learning

Data Structures
Linked List

Today's Practice

20 MCQs
1 Subjective Answer
30 minutes

Weak Topic

Operating Systems

[Practice Now]

---

# 7. Exam Selection

Users should be able to select an exam.

Example:

## Government Jobs

Assistant Programmer
NTRCA
BCS
Primary Teacher
Bank Jobs

Each exam has:

- description
- syllabus
- subjects
- progress

---

# 8. Subject Screen

Example:

Assistant Programmer

Subjects:

Programming Fundamentals
██████████ 100%

Data Structures
███████░░░ 70%

Algorithms
█████░░░░░ 50%

DBMS
███░░░░░░░ 30%

Each subject contains:

- topics
- progress
- recommended practice

---

# 9. Topic Screen

Example:

Data Structures

Topics:

Arrays
Linked List
Stack
Queue
Tree
Graph
Hash Table

Each topic provides:

- Learn
- Practice
- Subjective
- Review

---

# 10. Lesson System

Each lesson should contain:

- concept explanation
- examples
- diagrams where useful
- code examples
- important notes
- common mistakes
- exam tips

At the bottom:

[Practice Questions]

[Subjective Practice]

---

# 11. MCQ System

MCQ screen:

Question
↓
Options
↓
Submit
↓
Correct / Incorrect
↓
Explanation
↓
Next Question

Support:

- single answer
- multiple answer later
- difficulty
- topic
- marks

---

# 12. Subjective System

Subjective screen:

Question

"Explain the difference between `=` and `==` in C."

Marks:

5

Answer editor:

[ ]

[ ]

[ ]

[ Submit Answer ]

After submission:

Score
4 / 5

Strengths

✓ Correct explanation of assignment
✓ Correct example

Missing

• Explicit comparison of both operators

Improvement

Explain that `==` evaluates whether two expressions are equal,
while `=` assigns a value.

[Rewrite Answer]

---

# 13. Subjective Evaluation

Evaluation dimensions may include:

- correctness
- completeness
- conceptual understanding
- structure
- examples
- clarity

The rubric should depend on the question.

Example:

10-mark question:

Content: 5
Accuracy: 2
Structure: 1
Example: 1
Clarity: 1

---

# 14. Rewrite System

After receiving feedback:

User can rewrite the answer.

The app should show:

Attempt 1
7/10

Attempt 2
8.5/10

Improvement:

+1.5 marks

This creates visible learning progress.

---

# 15. Mock Tests

Mock test types:

- Topic test
- Subject test
- Full exam
- Previous-question test
- Custom test

Features:

- countdown timer
- question navigation
- mark for review
- answer status
- submit test
- result
- detailed review

---

# 16. Progress

Track:

- total questions
- correct answers
- MCQ accuracy
- subjective average
- topic completion
- study time
- mock test scores
- weak topics
- streak

---

# 17. Bookmarks

Users can bookmark:

- questions
- lessons
- subjective questions

Bookmark categories can be added later.

---

# 18. Daily Practice

Daily practice should contain:

- MCQs
- one or more written questions
- revision recommendations

Example:

Today's Challenge

10 MCQs
1 Subjective Question
1 Weak Topic Review

---

# 19. Notifications

Future:

- daily reminder
- streak reminder
- unfinished practice
- new question notification
- exam countdown

---

# 20. AI Features

Initial AI feature:

## Subjective Answer Evaluation

Future AI features:

- personalized study plan
- weak-topic detection
- question generation
- answer improvement
- concept explanation
- adaptive practice
- mock interview practice

Do not implement all AI features in MVP.

---

# 21. Admin Dashboard

Separate web application.

Technology:

Next.js
Supabase

Admin can:

- create exam
- create subject
- create topic
- create lesson
- create question
- create MCQ options
- create model answer
- define marking rubric
- publish/unpublish content
- create mock tests

---

# 22. Database

Initial schema concept:

profiles

exams
subjects
topics
lessons

questions
question_options

mock_tests
mock_test_questions

user_answers
subjective_submissions

user_progress
study_sessions
bookmarks

---

# 23. Authentication

Support:

- email/password
- Google login later

User profile:

- name
- target exam
- study goal
- preferences

---

# 24. App Navigation

Bottom tabs:

Home
Exams
Practice
Progress
Profile

Additional routes:

Exam
Subject
Topic
Lesson
Question
Subjective
Mock Test
Results
Settings

---

# 25. UI Direction

Visual identity:

Name:

ExamPilot

Brand concept:

A pilot guiding the student toward exam success.

Possible visual direction:

- clean
- modern
- academic
- trustworthy
- focused

Avoid making it look like a children's education app.

---

# 26. MVP Development Phases

## Phase 1 — Foundation

- [ ] Expo project
- [ ] TypeScript
- [ ] Expo Router
- [ ] Git
- [ ] Project structure
- [ ] Theme
- [ ] Navigation
- [ ] Reusable UI components

---

## Phase 2 — UI Prototype

Build with local mock data.

- [ ] Splash
- [ ] Onboarding
- [ ] Login
- [ ] Home
- [ ] Exam selection
- [ ] Subject
- [ ] Topic
- [ ] Lesson
- [ ] MCQ
- [ ] Subjective
- [ ] Progress
- [ ] Profile

Do not connect Supabase yet.

---

## Phase 3 — Supabase

- [ ] Create Supabase project
- [ ] Database
- [ ] Auth
- [ ] RLS
- [ ] Database types
- [ ] Mobile integration

---

## Phase 4 — Content

- [ ] Exams
- [ ] Subjects
- [ ] Topics
- [ ] Lessons
- [ ] MCQs
- [ ] Subjective questions
- [ ] Model answers
- [ ] Rubrics

---

## Phase 5 — User Progress

- [ ] Answer history
- [ ] Progress
- [ ] Bookmarks
- [ ] Study sessions
- [ ] Streak

---

## Phase 6 — Mock Tests

- [ ] Test engine
- [ ] Timer
- [ ] Navigation
- [ ] Submission
- [ ] Results
- [ ] Review

---

## Phase 7 — AI

- [ ] Supabase Edge Function
- [ ] AI integration
- [ ] Evaluation prompt
- [ ] Structured output
- [ ] Scoring
- [ ] Feedback
- [ ] Rewrite flow

---

## Phase 8 — Admin

- [ ] Next.js admin
- [ ] Admin authentication
- [ ] Exam management
- [ ] Subject management
- [ ] Topic management
- [ ] Lesson management
- [ ] Question management
- [ ] Mock test management

---

## Phase 9 — Beta

- [ ] Error monitoring
- [ ] Analytics
- [ ] Performance optimization
- [ ] Android testing
- [ ] Real content
- [ ] User testing
- [ ] AI evaluation testing

---

# 27. Future Monetization

Potential model:

## Free

- limited MCQs
- limited subjective evaluations
- basic lessons
- basic progress

## Premium

- unlimited practice
- AI evaluation
- detailed analytics
- full mock tests
- previous questions
- personalized preparation

Pricing should be decided only after user validation.

---

# 28. MVP Definition of Done

MVP is complete when a user can:

1. Register
2. Login
3. Select Assistant Programmer
4. Browse subjects
5. Browse topics
6. Read lessons
7. Practice MCQs
8. See explanations
9. Answer subjective questions
10. Submit written answers
11. Receive AI evaluation
12. Rewrite answers
13. See progress
14. Bookmark questions
15. Take a mock test
16. See results

---

# 29. What NOT to Build Yet

Do not build these before the core MVP works:

- payment
- subscriptions
- leaderboards
- social feed
- chat
- complicated gamification
- live classes
- community
- advanced AI tutor
- multi-country support

First make the learning loop excellent.

---

# 30. Success Metric

The most important metric is not downloads.

It is:

## "Do users improve their written answers?"

Useful metrics:

- subjective attempts per user
- rewrite rate
- score improvement between attempts
- questions completed
- weekly active learners
- study sessions
- mock test completion

---

# 31. Long-Term Vision

ExamPilot should become:

"Your AI-powered preparation cockpit for competitive exams."

The product should help a candidate move from:

"I don't know this."

to:

"I understand this."

to:

"I can answer this."

to:

"I can answer this under exam conditions."

to:

"I am ready for the exam."
