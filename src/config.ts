declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_API_URL?: string;
            NODE_ENV: 'development' | 'production' | 'test';
        }
    }
}

// Backend API URL (Hugging Face Space)
const DEFAULT_API_URL = 'https://arush1234sharma-quegenai.hf.space';
export const API_URL = process.env.REACT_APP_API_URL || DEFAULT_API_URL;

export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
};

export const TASKS = {
    CHAT: 'chat',
    QA: 'qa',
    CLASSIFICATION: 'classification',
    SUMMARIZATION: 'summarization',
} as const; 