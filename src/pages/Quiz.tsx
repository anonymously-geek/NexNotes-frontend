import React, { useState } from 'react';
import { QuizGenerator } from '../components/quiz/QuizGenerator';
import { QuizTaker } from '../components/quiz/QuizTaker';
import { QuizResponse } from '../services/api';

export const QuizPage: React.FC = () => {
  const [quiz, setQuiz] = useState<QuizResponse | null>(null);
  const [score, setScore] = useState<{ score: number; total: number } | null>(null);

  const handleQuizGenerated = (newQuiz: QuizResponse) => {
    setQuiz(newQuiz);
    setScore(null);
  };

  const handleQuizComplete = (score: number, total: number) => {
    setScore({ score, total });
  };

  const handleReset = () => {
    setQuiz(null);
    setScore(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Querio AI Quiz Generator</h1>
          <p className="mt-2 text-gray-600">
            Generate quizzes from your notes, study materials, or any text
          </p>
        </div>

        {!quiz ? (
          <QuizGenerator onQuizGenerated={handleQuizGenerated} />
        ) : (
          <QuizTaker
            quiz={quiz}
            onComplete={handleQuizComplete}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}; 