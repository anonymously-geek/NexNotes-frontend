import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
  explanation?: string;
}

export interface QuizResponse {
  questions: QuizQuestion[];
  topic: string;
}

export interface ChatRequest {
  message: string;
  task: string;
  context?: string;
}

export interface ChatResponse {
  response: string;
  task: string;
  confidence?: number;
  quiz?: QuizResponse;
}

export interface Task {
  id: string;
  name: string;
  description: string;
}

export interface QuestionPaper {
  topic: string;
  questions: Array<{
    question: string;
    marks: number;
    type: 'short' | 'long' | 'mcq';
  }>;
  totalMarks: number;
  duration: number;
}

export const apiService = {
  // Get available tasks
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data.tasks;
  },

  // Send chat message
  sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
    const response = await api.post('/chat', request);
    return response.data;
  },

  // Generate quiz from notes
  generateQuiz: async (topic: string, notes: string): Promise<QuizResponse> => {
    const response = await api.post('/chat', {
      message: topic,
      task: 'quiz',
      context: notes
    });
    if (!response.data.quiz) {
      throw new Error('Failed to generate quiz');
    }
    return response.data.quiz;
  },

  // Generate question paper
  generateQuestionPaper: async (topic: string, notes: string): Promise<QuestionPaper> => {
    const response = await api.post('/chat', {
      message: topic,
      task: 'generate_question_paper',
      context: notes
    });
    if (!response.data.questionPaper) {
      throw new Error('Failed to generate question paper');
    }
    return response.data.questionPaper;
  },

  // Summarize notes
  summarizeNotes: async (notes: string, topic: string): Promise<string> => {
    const response = await api.post('/chat', {
      message: notes,
      task: 'summarize',
      context: topic
    });
    return response.data.response;
  },

  // Check API health
  checkHealth: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default apiService; 