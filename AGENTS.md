This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md

# ExamPilot — AI Coding Agent Instructions

## Project

ExamPilot is a mobile-first exam preparation application built with
React Native and Expo.

The initial target audience is candidates preparing for competitive and
government examinations in Bangladesh.

The first target exams are:

- Assistant Programmer
- NTRCA

The architecture must allow additional exams to be added later without
rewriting the application.

---

# 1. Technology Stack

## Mobile

- React Native
- Expo
- Expo Router
- TypeScript

## State

- Zustand for client/application state
- TanStack Query for server state

## Forms

- React Hook Form
- Zod

## Backend

- Supabase

## Database

- PostgreSQL

## Authentication

- Supabase Auth

## Storage

- Supabase Storage

## AI

- AI API accessed through Supabase Edge Functions

## Styling

- NativeWind

Do not introduce another state-management or styling library unless
there is a clear architectural reason.

---

# 2. Core Development Principles

## TypeScript

Use strict TypeScript.

Do not use:

- `any`
- unnecessary type assertions
- `@ts-ignore`
- `@ts-expect-error`

unless there is a documented reason.

Prefer explicit interfaces/types.

---

# 3. React Native Rules

Use Expo-compatible APIs.

Do not introduce native dependencies unless they are actually necessary.

Prefer Expo APIs when available.

The application must work on:

- Android
- iOS
- Web where practical

Mobile experience is the primary target.

---

# 4. Architecture

Use feature-oriented organization where practical.

Example:

app/
components/
features/
hooks/
lib/
services/
store/
types/
constants/

Avoid putting all application logic inside `app/`.

The `app/` directory should primarily contain routing/screens.

Business logic should live in:

- `features/`
- `services/`
- `hooks/`
- `lib/`

---

# 5. UI Principles

ExamPilot should feel:

- clean
- modern
- focused
- academic
- trustworthy
- fast

Avoid excessive animations.

Avoid unnecessary gradients.

Avoid visual clutter.

The application should prioritize readability because users will spend
significant time reading questions and writing answers.

---

# 6. Navigation

Use Expo Router.

Expected navigation structure:

(auth)
login
register
forgot-password

(tabs)
home
exams
practice
progress
profile

exam/
[examId]

subject/
[subjectId]

topic/
[topicId]

lesson/
[lessonId]

question/
[questionId]

mock-test/
[testId]

subjective/
[questionId]

---

# 7. Data Architecture

The application should be content-driven.

Do NOT hard-code exam questions into components.

Content should eventually come from Supabase.

Initial conceptual hierarchy:

Exam
↓
Subject
↓
Topic
↓
Lesson
↓
Questions

Questions can be:

- MCQ
- Short Answer
- Subjective
- Written

---

# 8. Question Architecture

All question types should share common metadata.

Example:

Question:

- id
- examId
- subjectId
- topicId
- type
- question
- difficulty
- marks
- explanation
- createdAt
- updatedAt

MCQ-specific data:

- options
- correctOption

Subjective-specific data:

- modelAnswer
- keyPoints
- evaluationCriteria

Do not create completely separate incompatible systems for every question
type.

---

# 9. Subjective Answer System

This is the core differentiator of ExamPilot.

The main learning loop is:

LEARN
↓
PRACTICE
↓
WRITE
↓
EVALUATE
↓
IMPROVE
↓
REWRITE

A subjective question should allow the user to:

1. Read the question
2. See marks
3. Write an answer
4. Submit
5. Receive evaluation
6. See strengths
7. See weaknesses
8. See missing concepts
9. See improvement suggestions
10. Rewrite the answer

---

# 10. AI Architecture

NEVER expose an AI API key inside the React Native application.

Never put secret API keys in:

- `.env` variables bundled into the client
- React Native source code
- Expo public environment variables

AI requests should go:

React Native
↓
Supabase Edge Function
↓
AI Provider
↓
Structured response
↓
React Native

AI responses must be structured JSON.

Example:

{
"score": 7.5,
"maxScore": 10,
"strengths": [],
"weaknesses": [],
"missingConcepts": [],
"suggestions": [],
"improvedAnswer": ""
}

---

# 11. AI Evaluation Rules

AI evaluation must consider:

- Question
- Maximum marks
- Model answer
- Key points
- Evaluation criteria
- User answer

The AI should NOT simply compare text similarity.

It should evaluate conceptual correctness.

AI feedback should be educational.

Do not encourage users to blindly copy the improved answer.

---

# 12. Database

Initial conceptual tables:

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

# 13. Supabase Security

Use Row Level Security.

Users should only be able to access their own:

- progress
- answers
- bookmarks
- study sessions
- submissions

Public learning content can be readable according to its publishing status.

Admin operations must be protected.

Never place Supabase service-role keys in the mobile application.

---

# 14. State Management

Use Zustand for:

- UI preferences
- selected exam
- temporary local state
- user preferences

Use TanStack Query for:

- exams
- subjects
- topics
- lessons
- questions
- progress
- mock tests
- server data

Do not duplicate server state in Zustand unnecessarily.

---

# 15. Offline Strategy

The app should eventually support cached learning content.

At minimum:

- cache recently viewed lessons
- cache recent questions
- preserve unfinished subjective answers locally

Offline support should be implemented incrementally.

Do not over-engineer the first MVP.

---

# 16. Error Handling

Every network operation must have:

- loading state
- success state
- error state
- retry capability where appropriate

Never leave the user staring at a blank screen.

Avoid silently swallowing errors.

---

# 17. Loading States

Prefer skeleton/loading states for major screens.

Avoid excessive spinners.

---

# 18. Empty States

Every list should have a meaningful empty state.

Example:

"No questions available yet."

Do not show empty screens without explanation.

---

# 19. Accessibility

Use:

- accessible labels
- sufficient contrast
- readable font sizes
- large touch targets

Do not communicate information using color alone.

---

# 20. Performance

Avoid:

- unnecessary re-renders
- huge lists without virtualization
- fetching entire datasets when only a page is needed
- unnecessary global state

Use FlatList/FlashList when appropriate.

Keep screens lightweight.

---

# 21. Coding Style

Prefer:

- small components
- reusable components
- descriptive names
- early returns
- pure functions
- separation of concerns

Avoid:

- huge components
- deeply nested conditional rendering
- duplicated UI
- duplicated business logic

---

# 22. Before Changing Architecture

Do not introduce a new dependency just because it is popular.

Before adding a dependency:

1. Check whether Expo already provides the capability.
2. Check whether an existing dependency can solve it.
3. Consider bundle size and maintenance.
4. Explain the reason in the PR/commit if significant.

---

# 23. Development Workflow

When implementing a feature:

1. Read `PLAN.md`.
2. Inspect the existing code.
3. Understand the current architecture.
4. Implement the smallest correct version.
5. Run TypeScript checks.
6. Run linting.
7. Test the affected screen.
8. Fix errors.
9. Update `PLAN.md` if the roadmap changed.

Do not rewrite unrelated parts of the application.

---

# 24. Important Rule

Do not build future features prematurely.

For example, while building the first MCQ screen, do NOT simultaneously implement:

- subscriptions
- payment system
- social features
- leaderboards
- advanced analytics
- complex offline synchronization

Build the MVP first.

---

# 25. Product Priority

Priority order:

1. Excellent learning experience
2. Excellent question experience
3. Subjective writing experience
4. AI evaluation
5. Progress tracking
6. Mock tests
7. Content management
8. Monetization
9. Advanced features

---

# 26. Definition of Done

A feature is not complete merely because the code compiles.

A feature is complete when:

- TypeScript passes
- UI works
- loading state exists
- error state exists
- empty state exists where applicable
- navigation works
- data flow is clear
- mobile layout is usable
- no obvious console errors remain
