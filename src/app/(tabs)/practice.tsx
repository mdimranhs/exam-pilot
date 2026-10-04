import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScreenHeader } from '@/components/ui/screen-header';
import { useExamStore } from '@/store/use-exam-store';
import {
  MOCK_MCQ_QUESTIONS,
  MOCK_SUBJECTS,
  MOCK_SUBJECTIVE_QUESTIONS,
} from '@/services/mock-data';

export default function PracticeScreen() {
  const [activeTab, setActiveTab] = useState<'subjective' | 'mcq'>('subjective');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const subjectiveDrafts = useExamStore((state) => state.subjectiveDrafts);

  const subjects = [
    { id: 'all', name: 'All Subjects' },
    ...MOCK_SUBJECTS.map((s) => ({ id: s.id, name: s.name.split(' (')[0] })),
  ];

  const filteredSubjective = MOCK_SUBJECTIVE_QUESTIONS.filter(
    (q) => selectedSubjectId === 'all' || q.subjectId === selectedSubjectId
  );

  const filteredMCQ = MOCK_MCQ_QUESTIONS.filter(
    (q) => selectedSubjectId === 'all' || q.subjectId === selectedSubjectId
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950" edges={['top']}>
      <ScreenHeader
        title="Practice Hub"
        subtitle="Master written answers & speed MCQs"
      />

      {/* Segmented Mode Selector */}
      <View className="px-5 pt-3 pb-2 bg-white dark:bg-slate-900">
        <View className="flex-row bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <TouchableOpacity
            onPress={() => setActiveTab('subjective')}
            className={`flex-1 py-2 rounded-lg items-center justify-center flex-row ${
              activeTab === 'subjective'
                ? 'bg-white dark:bg-slate-900 shadow-xs'
                : ''
            }`}>
            <Ionicons
              name="pencil"
              size={15}
              color={activeTab === 'subjective' ? '#4f46e5' : '#64748b'}
            />
            <Text
              className={`text-xs font-bold ml-1.5 ${
                activeTab === 'subjective'
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-400'
              }`}>
              Subjective Written
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('mcq')}
            className={`flex-1 py-2 rounded-lg items-center justify-center flex-row ${
              activeTab === 'mcq'
                ? 'bg-white dark:bg-slate-900 shadow-xs'
                : ''
            }`}>
            <Ionicons
              name="checkbox-outline"
              size={15}
              color={activeTab === 'mcq' ? '#4f46e5' : '#64748b'}
            />
            <Text
              className={`text-xs font-bold ml-1.5 ${
                activeTab === 'mcq'
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-400'
              }`}>
              MCQ Questions
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Subject Filter Chips */}
      <View className="bg-white dark:bg-slate-900 pb-3 border-b border-slate-100 dark:border-slate-800">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
          {subjects.map((sub) => {
            const isSelected = selectedSubjectId === sub.id;
            return (
              <TouchableOpacity
                key={sub.id}
                onPress={() => setSelectedSubjectId(sub.id)}
                className={`px-3 py-1.5 rounded-full border ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-600'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                }`}>
                <Text
                  className={`text-xs font-semibold ${
                    isSelected ? 'text-white' : 'text-slate-700 dark:text-slate-300'
                  }`}>
                  {sub.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Questions List */}
      <ScrollView
        className="flex-1 px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        {activeTab === 'subjective' ? (
          <View className="gap-4">
            {filteredSubjective.length === 0 ? (
              <Text className="text-center text-slate-500 py-10">
                No subjective questions found for this subject.
              </Text>
            ) : (
              filteredSubjective.map((q) => {
                const hasDraft = Boolean(subjectiveDrafts[q.id]);
                return (
                  <Card
                    key={q.id}
                    variant="elevated"
                    onPress={() => router.push(`/practice/subjective/${q.id}`)}>
                    <View className="flex-row items-center justify-between mb-2">
                      <View className="flex-row items-center gap-2">
                        <Badge label={`${q.marks} Marks`} variant="primary" size="sm" />
                        <Badge
                          label={q.difficulty.toUpperCase()}
                          variant={q.difficulty === 'hard' ? 'danger' : 'warning'}
                          size="sm"
                        />
                      </View>
                      {hasDraft && (
                        <View className="flex-row items-center bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                          <Ionicons name="document-text" size={12} color="#d97706" />
                          <Text className="text-[10px] font-bold text-amber-700 dark:text-amber-400 ml-1">
                            Draft Saved
                          </Text>
                        </View>
                      )}
                    </View>

                    <Text className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                      {q.question}
                    </Text>

                    <View className="flex-row items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                      <Text className="text-xs text-slate-500 dark:text-slate-400">
                        {q.keyPoints.length} Evaluation Criteria Points
                      </Text>
                      <View className="flex-row items-center">
                        <Text className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mr-1">
                          {hasDraft ? 'Resume Writing' : 'Start Writing'}
                        </Text>
                        <Ionicons name="arrow-forward" size={14} color="#4f46e5" />
                      </View>
                    </View>
                  </Card>
                );
              })
            )}
          </View>
        ) : (
          <View className="gap-3">
            {filteredMCQ.length === 0 ? (
              <Text className="text-center text-slate-500 py-10">
                No MCQs found for this subject.
              </Text>
            ) : (
              filteredMCQ.map((q) => (
                <Card
                  key={q.id}
                  variant="outlined"
                  onPress={() => router.push(`/practice/mcq/${q.id}`)}>
                  <View className="flex-row items-center justify-between mb-2">
                    <Badge label={`${q.marks} Mark`} variant="neutral" size="sm" />
                    <Badge
                      label={q.difficulty.toUpperCase()}
                      variant={q.difficulty === 'hard' ? 'danger' : 'warning'}
                      size="sm"
                    />
                  </View>
                  <Text className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-3">
                    {q.question}
                  </Text>
                  <View className="flex-row items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <Text className="text-xs text-slate-500 dark:text-slate-400">
                      {q.options.length} Options
                    </Text>
                    <View className="flex-row items-center">
                      <Text className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mr-1">
                        Solve MCQ
                      </Text>
                      <Ionicons name="arrow-forward" size={14} color="#4f46e5" />
                    </View>
                  </View>
                </Card>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
