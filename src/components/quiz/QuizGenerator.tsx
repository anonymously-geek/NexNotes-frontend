import React, { useState } from 'react';
import { useAI } from '../../hooks/useAI';
import { QuizResponse } from '../../services/api';

interface QuizGeneratorProps {
  onQuizGenerated: (quiz: QuizResponse) => void;
}

export const QuizGenerator: React.FC<QuizGeneratorProps> = ({ onQuizGenerated }) => {
  const [notes, setNotes] = useState('');
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { sendMessage } = useAI();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const text = await file.text();
        setNotes(text);
      } catch (err) {
        setError('Error reading file');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim() || !topic.trim()) {
      setError('Please provide both topic and notes');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessage(topic, 'quiz', notes);
      if (response.quiz) {
        onQuizGenerated(response.quiz);
      } else {
        throw new Error('Failed to generate quiz');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate quiz');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Generate Quiz</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
            Topic Name
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter topic name"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={8}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Paste your notes here or upload a file"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="block">
            <span className="sr-only">Choose file</span>
            <input
              type="file"
              accept=".txt,.doc,.docx,.pdf"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
          </label>
        </div>

        {error && (
          <div className="text-red-600 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Generating Quiz...' : 'Generate Quiz'}
        </button>
      </form>
    </div>
  );
}; 