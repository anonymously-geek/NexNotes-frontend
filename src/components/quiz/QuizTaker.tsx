import React, { useState } from 'react';
import { QuizResponse, QuizQuestion } from '../../services/api';

interface QuizTakerProps {
  quiz: QuizResponse;
  onComplete: (score: number, totalQuestions: number) => void;
  onReset: () => void;
}

interface Answer {
  questionIndex: number;
  selectedOption: string;
  isCorrect: boolean;
}

export const QuizTaker: React.FC<QuizTakerProps> = ({ quiz, onComplete, onReset }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (option: string) => {
    const question = quiz.questions[currentQuestion];
    const isCorrect = option === question.correct_answer;
    
    setAnswers([
      ...answers,
      { questionIndex: currentQuestion, selectedOption: option, isCorrect }
    ]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = answers.filter(a => a.isCorrect).length;
      setIsCompleted(true);
      onComplete(score, quiz.questions.length);
    }
  };

  const getCurrentQuestion = (): QuizQuestion => quiz.questions[currentQuestion];

  if (isCompleted) {
    const score = answers.filter(a => a.isCorrect).length;
    const percentage = (score / quiz.questions.length) * 100;

    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Quiz Complete!</h2>
        <div className="text-center mb-6">
          <p className="text-4xl font-bold text-indigo-600">{percentage}%</p>
          <p className="text-gray-600">You scored {score} out of {quiz.questions.length}</p>
        </div>
        
        <div className="space-y-4">
          {quiz.questions.map((question, index) => {
            const answer = answers[index];
            return (
              <div key={index} className={`p-4 rounded-lg ${
                answer.isCorrect ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <p className="font-medium">{question.question}</p>
                <p className="text-sm mt-2">
                  Your answer: {answer.selectedOption}
                  {!answer.isCorrect && (
                    <span className="text-red-600"> (Correct: {question.correct_answer})</span>
                  )}
                </p>
                {question.explanation && (
                  <p className="text-sm text-gray-600 mt-2">{question.explanation}</p>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={onReset}
          className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate New Quiz
        </button>
      </div>
    );
  }

  const question = getCurrentQuestion();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{quiz.topic}</h2>
        <span className="text-gray-600">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </span>
      </div>

      <div className="mb-6">
        <p className="text-lg font-medium text-gray-900 mb-4">{question.question}</p>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showExplanation && handleAnswer(option)}
              disabled={showExplanation}
              className={`w-full p-3 text-left rounded-lg border ${
                showExplanation
                  ? option === question.correct_answer
                    ? 'bg-green-50 border-green-500'
                    : answers[currentQuestion]?.selectedOption === option
                    ? 'bg-red-50 border-red-500'
                    : 'bg-white border-gray-300'
                  : 'hover:bg-gray-50 border-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {showExplanation && (
        <div className="mb-6">
          <div className={`p-4 rounded-lg ${
            answers[currentQuestion].isCorrect ? 'bg-green-50' : 'bg-red-50'
          }`}>
            <p className="font-medium">
              {answers[currentQuestion].isCorrect ? 'Correct!' : 'Incorrect'}
            </p>
            {question.explanation && (
              <p className="text-sm text-gray-600 mt-2">{question.explanation}</p>
            )}
          </div>
          <button
            onClick={handleNext}
            className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      )}
    </div>
  );
}; 