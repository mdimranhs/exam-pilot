import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScreenHeader } from '@/components/ui/screen-header';
import { useExamStore } from '@/store/use-exam-store';
import { MOCK_EXAMS } from '@/services/mock-data';

export default function ProfileScreen() {
  const selectedExamId = useExamStore((state) => state.selectedExamId);
  const currentExam =
    MOCK_EXAMS.find((e) => e.id === selectedExamId) || MOCK_EXAMS[0];

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950" edges={['top']}>
      <ScreenHeader title="Account & Preferences" />

      <ScrollView
        className="flex-1 px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <Card
          variant="elevated"
          style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
          <View className="w-14 h-14 rounded-full bg-indigo-600 items-center justify-center mr-4">
            <Text className="text-white text-xl font-bold">IP</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-bold text-slate-900 dark:text-white">
              Candidate
            </Text>
            <Text className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Preparing for {currentExam.shortName}
            </Text>
            <View className="mt-2">
              <Badge label="Active Aspirant" variant="primary" size="sm" />
            </View>
          </View>
        </Card>

        {/* Target Examination Setting */}
        <Card variant="outlined" style={{ marginBottom: 16 }}>
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active Target
            </Text>
            <Badge label="Primary" variant="success" size="sm" />
          </View>
          <Text className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            {currentExam.name}
          </Text>
          <Text className="text-xs text-slate-500 mb-3">
            {currentExam.description}
          </Text>
          <Button
            label="Switch Exam"
            variant="outline"
            size="sm"
            onPress={() => router.push('/(tabs)/exams')}
          />
        </Card>

        {/* App Info & Principles */}
        <Card variant="flat" style={{ marginBottom: 16 }}>
          <Text className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-2">
            ExamPilot Core Loop
          </Text>
          <Text className="text-xs text-slate-500 leading-relaxed">
            LEARN → PRACTICE → WRITE → EVALUATE → IMPROVE → REWRITE
          </Text>
        </Card>

        <View className="items-center py-6">
          <Text className="text-xs font-medium text-slate-400">
            ExamPilot Mobile v1.0.0
          </Text>
          <Text className="text-[11px] text-slate-400 mt-0.5">
            Academic Edition • Assistant Programmer & NTRCA
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
