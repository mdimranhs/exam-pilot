import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScreenHeader } from '@/components/ui/screen-header';
import { useExamStore } from '@/store/use-exam-store';
import { MOCK_MCQ_QUESTIONS } from '@/services/mock-data';

export default function MCQQuestionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const question =
    MOCK_MCQ_QUESTIONS.find((q) => q.id === id) || MOCK_MCQ_QUESTIONS[0];

  const recordMCQResult = useExamStore((state) => state.recordMCQResult);
  const isDark = useColorScheme() === 'dark';

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const handleSelect = (index: number) => {
    if (hasSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setHasSubmitted(true);
    const isCorrect = selectedOption === question.correctOptionIndex;
    recordMCQResult(isCorrect);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setHasSubmitted(false);
  };

  const isCorrect = selectedOption === question.correctOptionIndex;

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950" edges={['bottom']}>
      <ScreenHeader
        title="MCQ Practice"
        subtitle={`Single Choice • ${question.marks} Mark`}
        showBack
        rightAction={
          <Badge
            label={question.difficulty.toUpperCase()}
            variant={question.difficulty === 'hard' ? 'danger' : 'warning'}
            size="sm"
          />
        }
      />

      <ScrollView
        className="flex-1 px-5 pt-3"
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}>
        {/* Question Card */}
        <Card variant="elevated" style={{ marginBottom: 20 }}>
          <Text className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
            {question.question}
          </Text>
        </Card>

        {/* Options List */}
        <View className="gap-3 mb-6">
          {question.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isRightAnswer = idx === question.correctOptionIndex;

            let borderColor = isDark ? '#334155' : '#e2e8f0';
            let backgroundColor = isDark ? '#0f172a' : '#ffffff';
            let textColor = isDark ? '#f8fafc' : '#1e293b';

            if (hasSubmitted) {
              if (isRightAnswer) {
                borderColor = '#10b981';
                backgroundColor = isDark ? '#064e3b' : '#ecfdf5';
                textColor = isDark ? '#6ee7b7' : '#065f46';
              } else if (isSelected && !isRightAnswer) {
                borderColor = '#ef4444';
                backgroundColor = isDark ? '#4c0519' : '#fff1f2';
                textColor = isDark ? '#fda4af' : '#9f1239';
              }
            } else if (isSelected) {
              borderColor = '#4f46e5';
              backgroundColor = isDark ? '#1e1b4b' : '#eef2ff';
              textColor = isDark ? '#c7d2fe' : '#3730a3';
            }

            return (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.7}
                onPress={() => handleSelect(idx)}
                style={{
                  borderWidth: isSelected || (hasSubmitted && isRightAnswer) ? 2 : 1,
                  borderColor,
                  backgroundColor,
                  padding: 16,
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View className="flex-row items-center flex-1 pr-3">
                  <View
                    className={`w-7 h-7 rounded-full items-center justify-center mr-3 ${
                      isSelected
                        ? 'bg-indigo-600'
                        : 'bg-slate-100 dark:bg-slate-800'
                    }`}>
                    <Text
                      className={`text-xs font-bold ${
                        isSelected ? 'text-white' : 'text-slate-600 dark:text-slate-400'
                      }`}>
                      {String.fromCharCode(65 + idx)}
                    </Text>
                  </View>
                  <Text style={{ color: textColor, fontSize: 14, fontWeight: isSelected ? '600' : '400', flex: 1 }}>
                    {option}
                  </Text>
                </View>

                {hasSubmitted && isRightAnswer && (
                  <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                )}
                {hasSubmitted && isSelected && !isRightAnswer && (
                  <Ionicons name="close-circle" size={20} color="#ef4444" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Action Button */}
        {!hasSubmitted ? (
          <Button
            label="Check Answer"
            onPress={handleSubmit}
            variant="primary"
            size="lg"
            disabled={selectedOption === null}
          />
        ) : (
          <View className="gap-4">
            <Card
              variant="elevated"
              style={{
                borderColor: isCorrect ? '#a7f3d0' : '#fecdd3',
                backgroundColor: isCorrect ? '#f0fdf4' : '#fff1f2',
              }}>
              <View className="flex-row items-center mb-2">
                <Ionicons
                  name={isCorrect ? 'checkmark-circle' : 'alert-circle'}
                  size={20}
                  color={isCorrect ? '#10b981' : '#ef4444'}
                />
                <Text
                  className={`text-sm font-bold ml-2 ${
                    isCorrect
                      ? 'text-emerald-800 dark:text-emerald-300'
                      : 'text-rose-800 dark:text-rose-300'
                  }`}>
                  {isCorrect ? 'Correct! +1 Mark' : 'Incorrect'}
                </Text>
              </View>

              <Text className="text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mt-2 mb-1">
                Detailed Explanation:
              </Text>
              <Text className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {question.explanation}
              </Text>
            </Card>

            <Button
              label="Try Again"
              onPress={handleReset}
              variant="outline"
              size="md"
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
