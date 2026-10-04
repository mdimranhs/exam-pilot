import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScreenHeader } from '@/components/ui/screen-header';
import { useExamStore } from '@/store/use-exam-store';
import { MOCK_EXAMS } from '@/services/mock-data';

export default function ExamsScreen() {
  const selectedExamId = useExamStore((state) => state.selectedExamId);
  const setSelectedExamId = useExamStore((state) => state.setSelectedExamId);

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950" edges={['top']}>
      <ScreenHeader
        title="Target Examination"
        subtitle="Choose the competitive exam you are preparing for"
      />
      <ScrollView
        className="flex-1 px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          {MOCK_EXAMS.map((exam) => {
            const isSelected = exam.id === selectedExamId;
            return (
              <Card
                key={exam.id}
                variant={isSelected ? 'elevated' : 'outlined'}
                isSelected={isSelected}>
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-row items-center gap-2">
                    <Badge
                      label={exam.category.toUpperCase()}
                      variant={isSelected ? 'primary' : 'neutral'}
                      size="sm"
                    />
                    {exam.badge && (
                      <Badge
                        label={exam.badge}
                        variant={exam.isAvailable ? 'success' : 'warning'}
                        size="sm"
                      />
                    )}
                  </View>
                  {isSelected && (
                    <View className="flex-row items-center bg-indigo-600 px-2.5 py-0.5 rounded-full">
                      <Ionicons name="checkmark" size={14} color="#ffffff" />
                      <Text className="text-white text-xs font-bold ml-1">Active</Text>
                    </View>
                  )}
                </View>

                <Text className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  {exam.name}
                </Text>
                <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-3">
                  {exam.description}
                </Text>

                <View className="flex-row items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <View className="flex-row items-center gap-3">
                    <View className="flex-row items-center">
                      <Ionicons name="book-outline" size={14} color="#64748b" />
                      <Text className="text-xs text-slate-600 dark:text-slate-300 ml-1">
                        {exam.subjectsCount} Subjects
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="ribbon-outline" size={14} color="#64748b" />
                      <Text className="text-xs text-slate-600 dark:text-slate-300 ml-1">
                        {exam.totalMarks} Marks
                      </Text>
                    </View>
                  </View>

                  {exam.isAvailable ? (
                    <Button
                      label={isSelected ? 'Current Target' : 'Select Exam'}
                      variant={isSelected ? 'secondary' : 'primary'}
                      size="sm"
                      disabled={isSelected}
                      onPress={() => setSelectedExamId(exam.id)}
                    />
                  ) : (
                    <Badge label="Coming Soon" variant="neutral" size="sm" />
                  )}
                </View>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
