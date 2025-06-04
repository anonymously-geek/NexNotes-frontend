// Backend API URL (Hugging Face Space)
export const API_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://arush1234sharma-quegenai.hf.space'
    : 'http://localhost:7860');

export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
};

export const TASKS = {
    CHAT: 'chat',
    QA: 'qa',
    CLASSIFICATION: 'classification',
    SUMMARIZATION: 'summarization',
} as const; 