import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useExamStore } from '@/store/use-exam-store';
import { MOCK_EXAMS, MOCK_SUBJECTS, MOCK_SUBJECTIVE_QUESTIONS } from '@/services/mock-data';

export default function HomeScreen() {
  const selectedExamId = useExamStore((state) => state.selectedExamId);
  const stats = useExamStore((state) => state.stats);

  const currentExam =
    MOCK_EXAMS.find((e) => e.id === selectedExamId) || MOCK_EXAMS[0];
  const examSubjects = MOCK_SUBJECTS.filter((s) => s.examId === currentExam.id);
  const featuredQuestion = MOCK_SUBJECTIVE_QUESTIONS[0];

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <View className="px-5 pt-3 pb-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Target Examination
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/(tabs)/exams')}
                className="flex-row items-center mt-0.5">
                <Text className="text-xl font-bold text-slate-900 dark:text-white mr-1.5">
                  {currentExam.name}
                </Text>
                <Ionicons name="chevron-forward" size={18} color="#6366f1" />
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center bg-amber-50 dark:bg-amber-950 px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-800">
              <Ionicons name="flame" size={16} color="#d97706" />
              <Text className="text-xs font-bold text-amber-700 dark:text-amber-400 ml-1">
                {stats.studyStreakDays} Day Streak
              </Text>
            </View>
          </View>
        </View>

        <View className="px-5 mt-5">
          {/* Daily Quick Stats Card */}
          <Card variant="elevated" style={{ marginBottom: 20 }}>
            <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Preparation Metrics
            </Text>
            <View className="flex-row justify-between">
              <View className="items-center flex-1 border-r border-slate-100 dark:border-slate-800">
                <Text className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                  {stats.mcqCorrect}/{stats.mcqTotalAttempted}
                </Text>
                <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  MCQ Solved
                </Text>
              </View>
              <View className="items-center flex-1 border-r border-slate-100 dark:border-slate-800">
                <Text className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {stats.subjectiveSubmitted}
                </Text>
                <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Written Answers
                </Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-2xl font-black text-slate-800 dark:text-slate-200">
                  {stats.averageSubjectiveScorePercent}%
                </Text>
                <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Avg. Score
                </Text>
              </View>
            </View>
          </Card>

          {/* Core Feature Highlight: Subjective Practice */}
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-2.5">
              <View className="flex-row items-center">
                <Ionicons name="pencil" size={18} color="#4f46e5" />
                <Text className="text-base font-bold text-slate-900 dark:text-white ml-2">
                  Daily Subjective Challenge
                </Text>
              </View>
              <Badge label="10 Marks" variant="primary" size="sm" />
            </View>

            <Card
              variant="elevated"
              onPress={() => router.push(`/practice/subjective/${featuredQuestion.id}`)}
              style={{
                borderColor: '#c7d2fe',
                backgroundColor: '#f5f7ff',
                marginBottom: 4,
              }}>
              <View className="flex-row items-center mb-2">
                <Badge label="DBMS" variant="neutral" size="sm" />
                <Text className="text-xs font-medium text-slate-500 dark:text-slate-400 ml-2">
                  Written Question
                </Text>
              </View>
              <Text
                className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3"
                numberOfLines={3}>
                {featuredQuestion.question}
              </Text>
              <View className="flex-row items-center justify-between pt-2 border-t border-indigo-100 dark:border-indigo-900">
                <View className="flex-row items-center">
                  <Ionicons name="bulb-outline" size={14} color="#6366f1" />
                  <Text className="text-xs text-indigo-700 dark:text-indigo-300 ml-1 font-medium">
                    AI Evaluation & Detailed Feedback
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mr-1">
                    Write Answer
                  </Text>
                  <Ionicons name="arrow-forward" size={14} color="#4f46e5" />
                </View>
              </View>
            </Card>
          </View>

          {/* Subjects Grid */}
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-base font-bold text-slate-900 dark:text-white">
                Core Subjects ({examSubjects.length})
              </Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/practice')}>
                <Text className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  View All Practice
                </Text>
              </TouchableOpacity>
            </View>

            <View className="gap-3">
              {examSubjects.map((subject) => (
                <Card
                  key={subject.id}
                  variant="outlined"
                  onPress={() => router.push('/(tabs)/practice')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View className="flex-row items-center flex-1 pr-3">
                    <View className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 items-center justify-center mr-3">
                      <Ionicons
                        name={subject.iconName as any}
                        size={20}
                        color="#4f46e5"
                      />
                    </View>
                    <View className="flex-1">
                      <Text
                        className="text-sm font-bold text-slate-900 dark:text-white"
                        numberOfLines={1}>
                        {subject.name}
                      </Text>
                      <Text className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {subject.totalTopics} Topics • {subject.totalQuestions} Questions
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#94a3b8" />
                </Card>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
