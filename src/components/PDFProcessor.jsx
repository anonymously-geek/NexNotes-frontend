import React, { useState } from 'react';
import { FiUpload, FiFileText, FiBook } from 'react-icons/fi';

const PDFProcessor = () => {
  const [mode, setMode] = useState('questions'); // 'questions' or 'summary'
  const [userType, setUserType] = useState('student'); // 'student' or 'teacher'
  const [text, setText] = useState('');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload logic here
      console.log('File uploaded:', file);
    }
  };

  const handleGenerate = async () => {
    if (!text) return;
    
    setProcessing(true);
    try {
      const endpoint = mode === 'questions' ? '/api/generate-questions' : '/api/summarize';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* Brand and Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold text-gradient">Querio AI</h1>
          <div className="glass-effect rounded-full p-1">
            <div className="flex">
              <button
                className={`px-4 py-2 rounded-full transition-all ${
                  userType === 'student' ? 'button-gradient' : 'text-gray-400'
                }`}
                onClick={() => setUserType('student')}
              >
                Student
              </button>
              <button
                className={`px-4 py-2 rounded-full transition-all ${
                  userType === 'teacher' ? 'button-gradient' : 'text-gray-400'
                }`}
                onClick={() => setUserType('teacher')}
              >
                Teacher
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">
            Generate Exam Questions & Summaries with AI
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Querio AI instantly creates exam-style questions from notes or text. 
            Ideal for exam prep. No Sign up required. Completely free to use.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="glass-effect rounded-2xl p-6">
              <textarea
                className="w-full h-64 bg-transparent border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Paste your text here or upload PDF"
                value={text}
                onChange={handleTextChange}
              />
              
              <div className="flex gap-4 mt-4">
                <label className="flex-1">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="glass-effect rounded-xl p-4 text-center cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-center gap-2">
                    <FiUpload className="text-xl" />
                    <span>Upload PDF</span>
                  </div>
                </label>
                
                <div className="glass-effect rounded-xl p-2 flex">
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      mode === 'questions' ? 'button-gradient' : 'text-gray-400'
                    }`}
                    onClick={() => setMode('questions')}
                  >
                    <FiFileText />
                    Questions
                  </button>
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      mode === 'summary' ? 'button-gradient' : 'text-gray-400'
                    }`}
                    onClick={() => setMode('summary')}
                  >
                    <FiBook />
                    Summary
                  </button>
                </div>
              </div>

              <button
                className="w-full button-gradient rounded-xl py-4 mt-4 font-semibold text-white flex items-center justify-center gap-2"
                onClick={handleGenerate}
                disabled={!text || processing}
              >
                {processing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  <>Generate {mode === 'questions' ? 'Questions' : 'Summary'}</>
                )}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="glass-effect rounded-2xl p-6 h-[calc(100vh-24rem)] overflow-y-auto">
            {!result && !processing && (
              <div className="h-full flex items-center justify-center text-gray-400">
                Generated {mode === 'questions' ? 'questions' : 'summary'} will appear here
              </div>
            )}
            
            {result && mode === 'questions' && (
              <div className="space-y-6">
                {result.questions?.map((question, index) => (
                  <div key={index} className="glass-effect rounded-xl p-6">
                    <p className="font-semibold mb-4">Q{index + 1}: {question.text}</p>
                    {question.options?.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className="flex items-center gap-3 mb-2 p-2 rounded hover:bg-white/5"
                      >
                        <span className="text-gray-400">
                          {String.fromCharCode(65 + optIndex)}.
                        </span>
                        <span>{option}</span>
                      </div>
                    ))}
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <span className="text-green-400 font-medium">Answer: </span>
                      {question.answer}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {result && mode === 'summary' && (
              <div className="prose prose-invert max-w-none">
                <div className="glass-effect rounded-xl p-6">
                  {result.summary}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFProcessor; 