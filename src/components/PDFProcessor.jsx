import React, { useState } from 'react';
import { FiUpload, FiFileText, FiBook } from 'react-icons/fi';

const PDFProcessor = () => {
  const [mode, setMode] = useState('questions');
  const [userType, setUserType] = useState('student');
  const [text, setText] = useState(''); // This will now hold pasted text OR extracted file text
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [followUpQ, setFollowUpQ] = useState('');
  const [followUpA, setFollowUpA] = useState('');
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [fileToUpload, setFileToUpload] = useState(null); // New state for the selected file

  // Handles changes in the textarea
  const handleTextChange = (e) => {
    setText(e.target.value);
    setFileToUpload(null); // Clear file selection if user starts typing
    setResult(null); // Clear previous results
    setScore(null);
    setUserAnswers({});
  };

  // Handles file selection from the input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileToUpload(file);
      setText(''); // Clear text area if a file is selected
      setResult(null); // Clear previous results
      setScore(null);
      setUserAnswers({});
    } else {
      setFileToUpload(null);
    }
  };

  const handleSubmitAnswers = () => {
    let correct = 0;
    if (result && result.questions) {
      result.questions.forEach((q, idx) => {
        if (userAnswers[idx] === q.answer) {
          correct++;
        }
      });
      setScore(correct);
    }
  };

  const handleGenerate = async () => {
    setProcessing(true);
    setResult(null);
    setFollowUpA('');
    setFollowUpQ('');
    setScore(null); // reset previous score
    setUserAnswers({});

    let contentToProcess = text; // Start with text from textarea

    // If a file is selected, first extract text from it
    if (fileToUpload) {
      try {
        const formData = new FormData();
        formData.append('file', fileToUpload);

        const uploadResponse = await fetch('https://arush1234sharma-querio-backend.hf.space/api/upload-and-extract', { // Update endpoint
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(`File extraction failed: ${errorData.detail || 'Unknown error'}`);
        }

        const uploadResult = await uploadResponse.json();
        contentToProcess = uploadResult.extracted_text;
        setText(contentToProcess); // Update the textarea with extracted text for display/editing
        setFileToUpload(null); // Clear the file input after extraction

        if (!contentToProcess.trim()) {
          setResult({ error: "No readable text found in the uploaded file." });
          setProcessing(false);
          return;
        }

      } catch (err) {
        console.error('File processing error:', err.message);
        setResult({ error: `File processing error: ${err.message}` });
        setProcessing(false);
        return;
      }
    }

    if (!contentToProcess.trim()) {
      setResult({ error: "No content to process. Please enter text or upload a file." });
      setProcessing(false);
      return;
    }

    // Now, call the AI model API with contentToProcess
    try {
      const API_BASE = 'https://arush1234sharma-querio-backend.hf.space';
      const endpoint = mode === 'questions'
        ? `${API_BASE}/api/generate-questions`
        : `${API_BASE}/api/summarize`;

      const payload = mode === 'questions'
        ? { text: contentToProcess, difficulty, count: questionCount }
        : { text: contentToProcess };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error:', err.message);
      setResult({ error: err.message });
    } finally {
      setProcessing(false);
    }
  };

  const handleFollowUp = async () => {
    if (!followUpQ || !result?.summary) return;

    setFollowUpA(''); // Clear previous follow-up answer

    try {
      const response = await fetch('https://arush1234sharma-querio-backend.hf.space/api/follow-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summary: result.summary,
          question: followUpQ
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Follow-up API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      setFollowUpA(data.answer);
    } catch (err) {
      console.error('Follow-up error:', err.message);
      setFollowUpA(`Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold text-gradient">NexNotes AI</h1>
          <div className="glass-effect rounded-full p-1">
            <div className="flex">
              <button
                className={`px-4 py-2 rounded-full transition-all ${userType === 'student' ? 'button-gradient' : 'text-gray-400'}`}
                onClick={() => setUserType('student')}
              >
                Student
              </button>
              <button
                className={`px-4 py-2 rounded-full transition-all ${userType === 'teacher' ? 'button-gradient' : 'text-gray-400'}`}
                onClick={() => setUserType('teacher')}
              >
                Teacher
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">
            Generate Exam Questions & Summaries with AI
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            NexNotes AI instantly creates exam-style questions from notes or text.
            Ideal for exam prep. No sign-up required. Completely free to use.
            Paste YouTube links, notes, or upload PDFs to get started.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Input Card */}
            <div className="glass-effect rounded-2xl p-6">
              <textarea
                className="w-full h-64 bg-transparent border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Paste your text here or upload a file..."
                value={text}
                onChange={handleTextChange}
              />

              <div className="flex gap-4 mt-4 flex-wrap">
                {/* Single File Upload Input */}
                <label className="flex-1 min-w-[150px]">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx" // Accept multiple file types
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="glass-effect rounded-xl p-4 text-center cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-center gap-2">
                    <FiUpload className="text-xl" />
                    <span>Upload File ({fileToUpload ? fileToUpload.name : 'PDF/Word/PPT'})</span>
                  </div>
                </label>

                {/* Mode Toggles (Questions/Summary) */}
                <div className="glass-effect rounded-xl p-2 flex flex-1 min-w-[200px]">
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${mode === 'questions' ? 'button-gradient' : 'text-gray-400'}`}
                    onClick={() => setMode('questions')}
                  >
                    <FiFileText />
                    Questions
                  </button>
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${mode === 'summary' ? 'button-gradient' : 'text-gray-400'}`}
                    onClick={() => setMode('summary')}
                  >
                    <FiBook />
                    Summary
                  </button>
                </div>
              </div>

              {/* Difficulty and Question Count (only for questions mode) */}
              {mode === 'questions' && (
                <div className="mt-4 flex gap-4">
                  <div className="flex-1">
                    <label htmlFor="difficulty" className="block text-sm text-white mb-1">Select Difficulty</label>
                    <select
                      id="difficulty"
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="bg-gray-800 p-2 rounded w-full text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label htmlFor="questionCount" className="block text-sm text-white mb-1">Number of Questions</label>
                    <input
                      type="number"
                      id="questionCount"
                      value={questionCount}
                      onChange={(e) => setQuestionCount(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      max="10"
                      className="bg-gray-800 p-2 rounded w-full text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Generate Button */}
              <button
                className="w-full button-gradient rounded-xl py-4 mt-4 font-semibold text-white flex items-center justify-center gap-2"
                onClick={handleGenerate}
                disabled={processing || (!text.trim() && !fileToUpload)} // Disable if no text AND no file
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

          {/* Output Card */}
          <div className="glass-effect rounded-2xl p-6 h-[calc(100vh-24rem)] overflow-y-auto">
            {!result && !processing && (
              <div className="h-full flex items-center justify-center text-gray-400">
                Generated {mode === 'questions' ? 'questions' : 'summary'} will appear here
              </div>
            )}

            {result?.error && (
              <div className="text-red-500 mt-4">Error: {result.error}</div>
            )}

            {result && !result.error && (
              <div className="prose prose-invert max-w-none">
                <div className="glass-effect rounded-xl p-6">
                  {/* Summary Display */}
                  {mode === 'summary' && (
                    <>
                      <p className="whitespace-pre-wrap text-lg">{result.summary}</p> {/* Font size change */}

                      {/* Follow-up Section */}
                      <div className="mt-6">
                        <h4 className="font-semibold mb-2">Ask a follow-up question:</h4>
                        <input
                          type="text"
                          value={followUpQ}
                          onChange={(e) => setFollowUpQ(e.target.value)}
                          placeholder="Ask something based on the summary..."
                          className="w-full p-2 border border-gray-700 rounded bg-transparent text-white mb-2 focus:outline-none focus:border-blue-500"
                        />
                        <button
                          onClick={handleFollowUp}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
                          disabled={!followUpQ}
                        >
                          Ask
                        </button>

                        {followUpA && (
                          <div className="mt-4 bg-gray-900 p-4 rounded border border-gray-700">
                            <strong className="text-green-400">Answer:</strong>
                            <p>{followUpA}</p>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Questions Display */}
                  {mode === 'questions' && Array.isArray(result.questions) && (
                    <div className="space-y-6">
                      {result.questions.map((q, index) => (
                        <div key={index} className="border border-gray-700 rounded-lg p-4">
                          <p className="font-semibold mb-2 text-lg">Q{index + 1}: {q.text}</p> {/* Font size change */}
                          <ul className="space-y-1 mb-2">
                            {q.options.map((opt, i) => (
                              <li
                                key={i}
                                className={`px-2 py-1 rounded flex items-center gap-2 text-base ${ // Font size change
                                  score !== null && userAnswers[index] === opt && opt === q.answer ? 'bg-green-800' : ''
                                } ${
                                  score !== null && userAnswers[index] === opt && opt !== q.answer ? 'bg-red-800' : ''
                                }`}
                              >
                                {userType === 'student' && (
                                  <input
                                    type="radio"
                                    name={`q-${index}`}
                                    value={opt}
                                    checked={userAnswers[index] === opt}
                                    onChange={() => setUserAnswers({ ...userAnswers, [index]: opt })}
                                    className="form-radio text-blue-500"
                                    disabled={score !== null}
                                  />
                                )}
                                {String.fromCharCode(65 + i)}. {opt}
                                {score !== null && userType === 'student' && opt === q.answer && (
                                  <span className="ml-2 text-green-400 font-bold">✓</span>
                                )}
                                {score !== null && userType === 'student' && userAnswers[index] === opt && opt !== q.answer && (
                                  <span className="ml-2 text-red-400 font-bold">✗</span>
                                )}
                              </li>
                            ))}
                          </ul>
                          {userType === 'teacher' && (
                            <p className="text-green-400 font-medium mt-2">Correct Answer: {q.answer}</p>
                          )}
                          {userType === 'student' && score !== null && userAnswers[index] !== q.answer && (
                            <p className="text-green-400 font-medium mt-2">Correct Answer: {q.answer}</p>
                          )}
                        </div>
                      ))}
                      {userType === 'student' && (
                        <>
                          <button
                            onClick={handleSubmitAnswers}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold disabled:opacity-50"
                            disabled={score !== null || Object.keys(userAnswers).length !== result.questions.length}
                          >
                            Submit Answers
                          </button>

                          {score !== null && (
                            <div className="text-green-400 font-semibold mt-4 text-lg text-center">
                              Your Score: {score} / {result.questions.length}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
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
