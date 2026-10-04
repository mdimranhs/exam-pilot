import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScreenHeader } from '@/components/ui/screen-header';
import { useExamStore } from '@/store/use-exam-store';
import { MOCK_SUBJECTIVE_QUESTIONS } from '@/services/mock-data';

export default function ProgressScreen() {
  const stats = useExamStore((state) => state.stats);
  const submissions = useExamStore((state) => state.submissions);

  const mcqAccuracy =
    stats.mcqTotalAttempted > 0
      ? Math.round((stats.mcqCorrect / stats.mcqTotalAttempted) * 100)
      : 0;

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950" edges={['top']}>
      <ScreenHeader
        title="Learning Progress"
        subtitle="Track your preparation efficiency and feedback"
      />
      <ScrollView
        className="flex-1 px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        {/* Top Summary Cards */}
        <View className="flex-row gap-3 mb-5">
          <Card variant="elevated" style={{ flex: 1 }}>
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                MCQ Accuracy
              </Text>
              <Ionicons name="pie-chart" size={16} color="#6366f1" />
            </View>
            <Text className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
              {mcqAccuracy}%
            </Text>
            <Text className="text-[11px] text-slate-500 mt-1">
              {stats.mcqCorrect} correct of {stats.mcqTotalAttempted}
            </Text>
          </Card>

          <Card variant="elevated" style={{ flex: 1 }}>
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Study Time
              </Text>
              <Ionicons name="time" size={16} color="#10b981" />
            </View>
            <Text className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {stats.totalStudyMinutes}m
            </Text>
            <Text className="text-[11px] text-slate-500 mt-1">
              {stats.studyStreakDays} consecutive days
            </Text>
          </Card>
        </View>

        {/* Written Submissions Review Section */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-bold text-slate-900 dark:text-white">
              Written Submissions History
            </Text>
            <Badge
              label={`${submissions.length} Recorded`}
              variant="neutral"
              size="sm"
            />
          </View>

          {submissions.length === 0 ? (
            <Card variant="outlined" style={{ padding: 24, alignItems: 'center' }}>
              <Ionicons name="document-text-outline" size={32} color="#94a3b8" />
              <Text className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-2">
                No subjective submissions yet
              </Text>
              <Text className="text-xs text-slate-500 text-center mt-1">
                Go to Practice and write your first subjective answer to receive structured AI evaluation.
              </Text>
            </Card>
          ) : (
            <View className="gap-3">
              {submissions.map((sub) => {
                const question = MOCK_SUBJECTIVE_QUESTIONS.find(
                  (q) => q.id === sub.questionId
                );
                return (
                  <Card key={sub.id} variant="elevated">
                    <View className="flex-row items-center justify-between mb-1">
                      <Badge
                        label={`Score: ${sub.evaluation?.score ?? 0}/${sub.evaluation?.maxScore ?? 10}`}
                        variant="success"
                        size="sm"
                      />
                      <Text className="text-xs text-slate-400">
                        {new Date(sub.submittedAt).toLocaleDateString()}
                      </Text>
                    </View>
                    <Text className="text-sm font-semibold text-slate-900 dark:text-white my-1" numberOfLines={2}>
                      {question?.question ?? 'Subjective Question'}
                    </Text>
                    {sub.evaluation?.strengths && sub.evaluation.strengths.length > 0 && (
                      <Text className="text-xs text-emerald-700 dark:text-emerald-400 mt-1" numberOfLines={1}>
                        ✓ Strength: {sub.evaluation.strengths[0]}
                      </Text>
                    )}
                  </Card>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
