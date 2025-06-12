import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Grid
} from '@mui/material';
import { apiService } from '../../services/api';

interface QuestionPaperSettings {
  difficulty: 'easy' | 'medium' | 'hard';
  totalMarks: number;
  timeInMinutes: number;
  easyQuestionsPercentage: number;
  mediumQuestionsPercentage: number;
  hardQuestionsPercentage: number;
}

const TeacherDashboard: React.FC = () => {
  const [notes, setNotes] = useState('');
  const [topic, setTopic] = useState('');
  const [questionPaper, setQuestionPaper] = useState<any>(null);
  const [settings, setSettings] = useState<QuestionPaperSettings>({
    difficulty: 'medium',
    totalMarks: 100,
    timeInMinutes: 60,
    easyQuestionsPercentage: 30,
    mediumQuestionsPercentage: 40,
    hardQuestionsPercentage: 30
  });

  const handleSettingsChange = (field: keyof QuestionPaperSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleDifficultyDistributionChange = (type: 'easy' | 'medium' | 'hard', value: number) => {
    const otherTypes = ['easy', 'medium', 'hard'].filter(t => t !== type) as Array<'easy' | 'medium' | 'hard'>;
    const remaining = 100 - value;
    const currentOtherValues = otherTypes.map(t => settings[`${t}QuestionsPercentage`]);
    const totalOtherValues = currentOtherValues.reduce((a, b) => a + b, 0);
    
    const newSettings = { ...settings };
    newSettings[`${type}QuestionsPercentage`] = value;
    
    if (totalOtherValues > 0) {
      otherTypes.forEach(t => {
        newSettings[`${t}QuestionsPercentage`] = Math.round(
          (settings[`${t}QuestionsPercentage`] / totalOtherValues) * remaining
        );
      });
    } else {
      const equalShare = Math.round(remaining / otherTypes.length);
      otherTypes.forEach(t => {
        newSettings[`${t}QuestionsPercentage`] = equalShare;
      });
    }
    
    setSettings(newSettings);
  };

  const handleGenerateQuestionPaper = async () => {
    try {
      const response = await apiService.sendMessage({
        message: topic,
        task: 'generate_question_paper',
        context: notes,
        settings: settings // Include settings in the request
      });
      setQuestionPaper(response);
    } catch (error) {
      console.error('Error generating question paper:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mb: 4, 
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '12px'
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ 
              color: '#1976d2',
              fontWeight: 600
            }}
          >
            Teacher Dashboard
          </Typography>
          <Typography 
            variant="subtitle1" 
            gutterBottom
            sx={{ color: '#666666' }}
          >
            Create question papers from your notes
          </Typography>
        </Paper>

        <Paper 
          sx={{ 
            p: 4, 
            mt: 3, 
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff'
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={6}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff'
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mt: 2 }}>
                Question Paper Settings
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Overall Difficulty</InputLabel>
                <Select
                  value={settings.difficulty}
                  onChange={(e) => handleSettingsChange('difficulty', e.target.value)}
                  label="Overall Difficulty"
                >
                  <MenuItem value="easy">Easy</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="hard">Hard</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Total Marks"
                value={settings.totalMarks}
                onChange={(e) => handleSettingsChange('totalMarks', parseInt(e.target.value))}
                variant="outlined"
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Time (minutes)"
                value={settings.timeInMinutes}
                onChange={(e) => handleSettingsChange('timeInMinutes', parseInt(e.target.value))}
                variant="outlined"
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Question Distribution
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography gutterBottom>Easy Questions: {settings.easyQuestionsPercentage}%</Typography>
              <Slider
                value={settings.easyQuestionsPercentage}
                onChange={(_, value) => handleDifficultyDistributionChange('easy', value as number)}
                aria-labelledby="easy-questions-slider"
                valueLabelDisplay="auto"
                sx={{ color: '#4caf50' }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography gutterBottom>Medium Questions: {settings.mediumQuestionsPercentage}%</Typography>
              <Slider
                value={settings.mediumQuestionsPercentage}
                onChange={(_, value) => handleDifficultyDistributionChange('medium', value as number)}
                aria-labelledby="medium-questions-slider"
                valueLabelDisplay="auto"
                sx={{ color: '#ff9800' }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography gutterBottom>Hard Questions: {settings.hardQuestionsPercentage}%</Typography>
              <Slider
                value={settings.hardQuestionsPercentage}
                onChange={(_, value) => handleDifficultyDistributionChange('hard', value as number)}
                aria-labelledby="hard-questions-slider"
                valueLabelDisplay="auto"
                sx={{ color: '#f44336' }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateQuestionPaper}
                sx={{ 
                  mt: 2,
                  py: 1.5,
                  px: 4,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                Generate Question Paper
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {questionPaper && (
          <Paper 
            sx={{ 
              p: 4, 
              mt: 3, 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ color: '#1976d2', fontWeight: 600 }}
            >
              Generated Question Paper
            </Typography>
            <Box 
              sx={{ 
                backgroundColor: '#f8f9fa',
                p: 2,
                borderRadius: '8px',
                mt: 2
              }}
            >
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(questionPaper, null, 2)}
              </pre>
            </Box>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default TeacherDashboard; 