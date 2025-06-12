import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography,
  Paper, Container, Tabs, Tab, Switch, FormControlLabel
} from '@mui/material';
import { generateQuiz, summarizeNotes } from '../../services/api';
import FileUpload from '../../components/FileUpload'; // ✅ Adjust path if needed

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const StudentDashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [inputType, setInputType] = useState(0); // 0: Notes, 1: YouTube, 2: PDF
  const [inputData, setInputData] = useState('');
  const [quiz, setQuiz] = useState<any | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [summarize, setSummarize] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleInputTypeChange = (event: React.SyntheticEvent, newValue: number) => {
    setInputType(newValue);
    setInputData('');
    setQuiz(null);
    setSummary(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputData.trim()) return;

    setLoading(true);
    setQuiz(null);
    setSummary(null);

    try {
      if (summarize) {
        const summaryData = await summarizeNotes(inputData);
        setSummary(summaryData);
      } else {
        const quizData = await generateQuiz(inputData, "My Topic");
        setQuiz(quizData);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Student Dashboard
        </Typography>

        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Generate" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Paper sx={{ p: 3 }}>
            {/* Input Type Tabs */}
            <Tabs value={inputType} onChange={handleInputTypeChange} sx={{ mb: 2 }}>
              <Tab label="Text Notes" />
              <Tab label="YouTube Link" />
              <Tab label="PDF Upload" />
            </Tabs>

            {/* Input Field by Type */}
            {inputType === 0 && (
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Enter your study notes"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                margin="normal"
              />
            )}

            {inputType === 1 && (
              <TextField
                fullWidth
                label="Paste YouTube video link"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                margin="normal"
              />
            )}

            {inputType === 2 && (
              <FileUpload onTextExtracted={(text) => setInputData(text)} />
            )}

            {/* Toggle and Submit */}
            <FormControlLabel
              control={
                <Switch
                  checked={summarize}
                  onChange={(e) => setSummarize(e.target.checked)}
                  color="primary"
                />
              }
              label="Summarize Instead of Quiz"
              sx={{ mt: 2 }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ mt: 2 }}
              disabled={loading || !inputData.trim()}
            >
              {loading ? 'Processing...' : summarize ? 'Summarize' : 'Generate Quiz'}
            </Button>
          </Paper>

          {/* Output Display */}
          {summary && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>Summary</Typography>
              <Paper sx={{ p: 3, backgroundColor: "#1e1e1e" }}>
                <Typography>{summary}</Typography>
              </Paper>
            </Box>
          )}

          {quiz && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>Quiz: {quiz.topic}</Typography>
              {quiz.questions.map((q: any, idx: number) => (
                <Paper key={idx} sx={{ p: 2, my: 2 }}>
                  <Typography><strong>Q{idx + 1}:</strong> {q.question}</Typography>
                  <Box sx={{ ml: 2 }}>
                    {q.options.map((opt: string, i: number) => (
                      <Typography key={i}>• {opt}</Typography>
                    ))}
                  </Box>
                  <Typography sx={{ mt: 1 }}><strong>Answer:</strong> {q.correct_answer}</Typography>
                  {q.explanation && (
                    <Typography sx={{ fontStyle: 'italic', mt: 1 }}>
                      Explanation: {q.explanation}
                    </Typography>
                  )}
                </Paper>
              ))}
            </Box>
          )}
        </TabPanel>
      </Box>
    </Container>
  );
};

export default StudentDashboard;
