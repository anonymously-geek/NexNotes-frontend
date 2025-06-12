import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders landing page by default', () => {
    render(<App />);
    expect(screen.getByText(/Querio AI/i)).toBeInTheDocument();
  });

  test('navigation works correctly', () => {
    render(<App />);
    const getStartedButton = screen.getByText(/Get Started/i);
    fireEvent.click(getStartedButton);
    
    // Should show teacher dashboard by default
    expect(screen.getByRole('tab', { name: /teacher/i })).toHaveAttribute('aria-selected', 'true');
    
    // Can switch to student dashboard
    const studentTab = screen.getByRole('tab', { name: /student/i });
    fireEvent.click(studentTab);
    expect(studentTab).toHaveAttribute('aria-selected', 'true');
  });
}); 