import { useState, useCallback } from 'react';
import apiService, { ChatRequest, ChatResponse, Task } from '../services/api';

interface UseAIReturn {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  sendMessage: (message: string, task: string, context?: string) => Promise<ChatResponse>;
  loadTasks: () => Promise<void>;
}

export const useAI = (): UseAIReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await apiService.getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (
    message: string,
    task: string,
    context?: string
  ): Promise<ChatResponse> => {
    try {
      setLoading(true);
      setError(null);
      const request: ChatRequest = { message, task, context };
      const response = await apiService.sendMessage(request);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tasks,
    loading,
    error,
    sendMessage,
    loadTasks,
  };
}; 