/**
 * Core Domain Types for ExamPilot
 * Strictly typed according to AGENTS.md and PLAN.md
 */

export type ExamCategory = 'government' | 'teacher' | 'bank' | 'ict';

export interface Exam {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  description: string;
  category: ExamCategory;
  subjectsCount: number;
  totalMarks: number;
  isAvailable: boolean;
  badge?: string;
}

export interface Subject {
  id: string;
  examId: string;
  name: string;
  code: string;
  iconName: string;
  description: string;
  totalTopics: number;
  totalQuestions: number;
}

export interface Topic {
  id: string;
  subjectId: string;
  name: string;
  order: number;
  lessonsCount: number;
  questionsCount: number;
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  content: string;
  keyPoints: string[];
  readTimeMinutes: number;
}

export type QuestionType = 'mcq' | 'subjective' | 'short_answer';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface BaseQuestion {
  id: string;
  examId: string;
  subjectId: string;
  topicId: string;
  type: QuestionType;
  question: string;
  difficulty: Difficulty;
  marks: number;
  explanation: string;
  createdAt: string;
  updatedAt: string;
}

export interface MCQQuestion extends BaseQuestion {
  type: 'mcq';
  options: string[];
  correctOptionIndex: number;
}

export interface SubjectiveQuestion extends BaseQuestion {
  type: 'subjective';
  modelAnswer: string;
  keyPoints: string[];
  evaluationCriteria: string[];
}

export type Question = MCQQuestion | SubjectiveQuestion;

export interface AIEvaluation {
  score: number;
  maxScore: number;
  strengths: string[];
  weaknesses: string[];
  missingConcepts: string[];
  suggestions: string[];
  improvedAnswer: string;
}

export interface SubjectiveSubmission {
  id: string;
  questionId: string;
  examId: string;
  subjectId: string;
  userAnswer: string;
  evaluation?: AIEvaluation;
  submittedAt: string;
  timeSpentSeconds: number;
}

export interface UserStats {
  mcqTotalAttempted: number;
  mcqCorrect: number;
  subjectiveSubmitted: number;
  averageSubjectiveScorePercent: number;
  studyStreakDays: number;
  totalStudyMinutes: number;
}
