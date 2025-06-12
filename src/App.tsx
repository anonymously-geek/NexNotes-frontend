import React, { useState, Suspense } from 'react';
import { Box, AppBar, Tabs, Tab, Container, Button, Toolbar, Typography, CircularProgress } from '@mui/material';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components
const TeacherDashboard = React.lazy(() => import('./components/teacher/TeacherDashboard'));
const StudentDashboard = React.lazy(() => import('./components/student/StudentDashboard'));
const LandingPage = React.lazy(() => import('./components/LandingPage'));

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <CircularProgress />
  </div>
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function App() {
  const [value, setValue] = useState(-1); // -1 represents landing page

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleGetStarted = () => {
    setValue(0); // Switch to Teacher dashboard
  };

  if (value === -1) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <LandingPage onGetStarted={handleGetStarted} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        sx={{ 
          background: 'rgba(17, 24, 39, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: 1, 
              background: 'linear-gradient(to right, #60A5FA, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              cursor: 'pointer'
            }}
            onClick={() => setValue(-1)}
          >
            Querio AI
          </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-selected': {
                  color: '#ffffff'
                }
              }
            }}
          >
            <Tab label="Teacher" />
            <Tab label="Student" />
          </Tabs>
        </Toolbar>
      </AppBar>

      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <TabPanel value={value} index={0}>
            <TeacherDashboard />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <StudentDashboard />
          </TabPanel>
        </Suspense>
      </ErrorBoundary>
    </Box>
  );
}

export default App; 