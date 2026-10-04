import { create } from 'zustand';
import { SubjectiveSubmission, UserStats } from '@/types';

interface ExamStoreState {
  selectedExamId: string;
  setSelectedExamId: (examId: string) => void;

  // Auto-saved subjective drafts
  subjectiveDrafts: Record<string, string>;
  saveDraft: (questionId: string, text: string) => void;
  clearDraft: (questionId: string) => void;

  // Submissions and history
  submissions: SubjectiveSubmission[];
  addSubmission: (submission: SubjectiveSubmission) => void;

  // Bookmarks
  bookmarkedQuestionIds: string[];
  toggleBookmark: (questionId: string) => void;

  // Practice stats
  stats: UserStats;
  recordMCQResult: (isCorrect: boolean) => void;
}

export const useExamStore = create<ExamStoreState>((set) => ({
  selectedExamId: 'asst-prog',
  setSelectedExamId: (examId) => set({ selectedExamId: examId }),

  subjectiveDrafts: {},
  saveDraft: (questionId, text) =>
    set((state) => ({
      subjectiveDrafts: {
        ...state.subjectiveDrafts,
        [questionId]: text,
      },
    })),
  clearDraft: (questionId) =>
    set((state) => {
      const nextDrafts = { ...state.subjectiveDrafts };
      delete nextDrafts[questionId];
      return { subjectiveDrafts: nextDrafts };
    }),

  submissions: [],
  addSubmission: (submission) =>
    set((state) => ({
      submissions: [submission, ...state.submissions],
      stats: {
        ...state.stats,
        subjectiveSubmitted: state.stats.subjectiveSubmitted + 1,
      },
    })),

  bookmarkedQuestionIds: [],
  toggleBookmark: (questionId) =>
    set((state) => {
      const exists = state.bookmarkedQuestionIds.includes(questionId);
      return {
        bookmarkedQuestionIds: exists
          ? state.bookmarkedQuestionIds.filter((id) => id !== questionId)
          : [...state.bookmarkedQuestionIds, questionId],
      };
    }),

  stats: {
    mcqTotalAttempted: 12,
    mcqCorrect: 9,
    subjectiveSubmitted: 2,
    averageSubjectiveScorePercent: 78,
    studyStreakDays: 3,
    totalStudyMinutes: 85,
  },
  recordMCQResult: (isCorrect) =>
    set((state) => ({
      stats: {
        ...state.stats,
        mcqTotalAttempted: state.stats.mcqTotalAttempted + 1,
        mcqCorrect: isCorrect ? state.stats.mcqCorrect + 1 : state.stats.mcqCorrect,
      },
    })),
}));
