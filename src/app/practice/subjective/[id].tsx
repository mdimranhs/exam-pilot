import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScreenHeader } from '@/components/ui/screen-header';
import { useExamStore } from '@/store/use-exam-store';
import { MOCK_SUBJECTIVE_QUESTIONS } from '@/services/mock-data';
import { AIEvaluation } from '@/types';

export default function SubjectiveQuestionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const question = MOCK_SUBJECTIVE_QUESTIONS.find((q) => q.id === id) || MOCK_SUBJECTIVE_QUESTIONS[0];

  const subjectiveDrafts = useExamStore((state) => state.subjectiveDrafts);
  const saveDraft = useExamStore((state) => state.saveDraft);
  const addSubmission = useExamStore((state) => state.addSubmission);

  const initialText = subjectiveDrafts[question.id] || '';
  const [answer, setAnswer] = useState<string>(initialText);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<AIEvaluation | null>(null);
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);

  // Auto-save draft as candidate types
  useEffect(() => {
    saveDraft(question.id, answer);
  }, [answer, question.id, saveDraft]);

  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;

  const handleEvaluate = () => {
    if (answer.trim().length < 20) {
      Alert.alert(
        'Answer Too Brief',
        'Please write a comprehensive answer (at least 20 characters) before requesting evaluation.'
      );
      return;
    }

    setIsEvaluating(true);

    // Simulate AI evaluation with structured feedback according to AGENTS.md specs
    setTimeout(() => {
      const mockResult: AIEvaluation = {
        score: 8.0,
        maxScore: question.marks,
        strengths: [
          'Accurately addressed all the core conceptual terms.',
          'Clear logical flow between definitions and real-world impact.',
        ],
        weaknesses: [
          'Could elaborate more on transaction isolation levels (Dirty Read vs Phantom Read).',
        ],
        missingConcepts: [
          'Write-Ahead Logging (WAL) mechanism for Durability.',
          'Explicit mention of cascade constraints for Consistency.',
        ],
        suggestions: [
          'In competitive exams, use bullet points with underlined keywords for faster examiner scoring.',
          'Add a short 2-line banking transfer example to cement Atomicity.',
        ],
        improvedAnswer: question.modelAnswer,
      };

      setEvaluation(mockResult);
      setIsEvaluating(false);

      addSubmission({
        id: `sub-${Date.now()}`,
        questionId: question.id,
        examId: question.examId,
        subjectId: question.subjectId,
        userAnswer: answer,
        evaluation: mockResult,
        submittedAt: new Date().toISOString(),
        timeSpentSeconds: 180,
      });
    }, 1500);
  };

  const handleRewrite = () => {
    setEvaluation(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950" edges={['bottom']}>
      <ScreenHeader
        title="Subjective Writing"
        subtitle={`Exam Marks: ${question.marks}`}
        showBack
        rightAction={
          <Badge
            label={`${question.marks} Marks`}
            variant="primary"
            size="sm"
          />
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1">
        <ScrollView
          className="flex-1 px-5 pt-3"
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}>
          {/* Question Card */}
          <Card
            variant="elevated"
            style={{ marginBottom: 16, backgroundColor: '#f8fafc', borderColor: '#e0e7ff' }}>
            <View className="flex-row items-center justify-between mb-2">
              <Badge label="Official Format" variant="neutral" size="sm" />
              <Badge
                label={question.difficulty.toUpperCase()}
                variant={question.difficulty === 'hard' ? 'danger' : 'warning'}
                size="sm"
              />
            </View>
            <Text className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
              {question.question}
            </Text>

            {/* Evaluation Criteria guidance */}
            <View className="mt-3 pt-3 border-t border-indigo-100 dark:border-indigo-900/40">
              <Text className="text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-1.5">
                Key Scoring Criteria:
              </Text>
              {question.evaluationCriteria.map((crit, idx) => (
                <Text
                  key={idx}
                  className="text-xs text-slate-600 dark:text-slate-400 mb-0.5">
                  • {crit}
                </Text>
              ))}
            </View>
          </Card>

          {/* AI Evaluation View if already submitted */}
          {evaluation ? (
            <View className="mb-5 gap-4">
              <Card
                variant="elevated"
                style={{ borderColor: '#a7f3d0', backgroundColor: '#f0fdf4' }}>
                <View className="flex-row items-center justify-between mb-3">
                  <View>
                    <Text className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase">
                      AI Evaluation Result
                    </Text>
                    <Text className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                      {evaluation.score} / {evaluation.maxScore}
                    </Text>
                  </View>
                  <View className="bg-emerald-600 px-3 py-1.5 rounded-full">
                    <Text className="text-white font-bold text-xs">
                      {Math.round((evaluation.score / evaluation.maxScore) * 100)}% Proficiency
                    </Text>
                  </View>
                </View>

                {/* Strengths */}
                <View className="mb-3">
                  <Text className="text-xs font-bold text-slate-800 dark:text-slate-100 mb-1 flex-row items-center">
                    ✓ Strengths:
                  </Text>
                  {evaluation.strengths.map((str, i) => (
                    <Text key={i} className="text-xs text-emerald-800 dark:text-emerald-300 ml-2 mb-0.5">
                      • {str}
                    </Text>
                  ))}
                </View>

                {/* Weaknesses & Missing Concepts */}
                <View className="mb-3">
                  <Text className="text-xs font-bold text-rose-800 dark:text-rose-300 mb-1">
                    ⚠ Missing Concepts & Gaps:
                  </Text>
                  {evaluation.missingConcepts.map((mis, i) => (
                    <Text key={i} className="text-xs text-rose-700 dark:text-rose-400 ml-2 mb-0.5">
                      • {mis}
                    </Text>
                  ))}
                </View>

                {/* Improvement Suggestions */}
                <View>
                  <Text className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-1">
                    💡 Actionable Improvement:
                  </Text>
                  {evaluation.suggestions.map((sug, i) => (
                    <Text key={i} className="text-xs text-slate-700 dark:text-slate-300 ml-2 mb-0.5">
                      • {sug}
                    </Text>
                  ))}
                </View>
              </Card>

              {/* Model Answer Toggle */}
              <Button
                label={showModelAnswer ? 'Hide Benchmark Answer' : 'Show Benchmark Model Answer'}
                variant="outline"
                size="md"
                onPress={() => setShowModelAnswer(!showModelAnswer)}
              />

              {showModelAnswer && (
                <Card variant="outlined" style={{ padding: 16 }}>
                  <Text className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-2">
                    Official Model Benchmark Answer:
                  </Text>
                  <Text className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-mono">
                    {question.modelAnswer}
                  </Text>
                </Card>
              )}

              {/* Loop Step: Rewrite */}
              <Button
                label="Improve & Rewrite Answer"
                variant="primary"
                size="lg"
                onPress={handleRewrite}
              />
            </View>
          ) : (
            /* Answer Input Writing Area */
            <View>
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Your Written Answer
                </Text>
                <View className="flex-row items-center">
                  <Ionicons name="cloud-done-outline" size={14} color="#10b981" />
                  <Text className="text-xs text-emerald-600 ml-1 mr-3">Draft Auto-Saved</Text>
                  <Text className="text-xs font-semibold text-slate-500">{wordCount} words</Text>
                </View>
              </View>

              <Card variant="outlined" style={{ padding: 12, marginBottom: 16 }}>
                <TextInput
                  value={answer}
                  onChangeText={setAnswer}
                  placeholder="Write your structured answer here. Include definitions, key principles, code snippets, or bullet points..."
                  placeholderTextColor="#94a3b8"
                  multiline
                  textAlignVertical="top"
                  className="text-sm text-slate-900 dark:text-white min-h-[220px] leading-relaxed font-sans"
                />
              </Card>

              <Button
                label={isEvaluating ? 'Evaluating with AI...' : 'Submit Answer for AI Evaluation'}
                onPress={handleEvaluate}
                variant="primary"
                size="lg"
                loading={isEvaluating}
                disabled={isEvaluating}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
