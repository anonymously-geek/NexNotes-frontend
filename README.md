# Querio AI Frontend

A modern React application for generating quizzes from study notes and creating professional question papers.

## Features

- **For Students:**
  - Generate practice quizzes from study notes
  - Multiple question types (MCQ, short answer, true/false)
  - Adaptive difficulty levels
  - Instant feedback and explanations

- **For Teachers:**
  - Create professional question papers
  - Customize difficulty levels
  - Generate answer keys automatically
  - Save and reuse question templates

## Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/querio-ai.git
   cd querio-ai/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration.

4. Start development server:
   ```bash
   npm start
   ```

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Deployment

This project is configured for deployment on Vercel. Simply push to your repository and Vercel will automatically deploy your changes.

### Manual Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

## Technology Stack

- React 18
- TypeScript
- Material-UI
- Tailwind CSS
- React Router
- Framer Motion
- React Helmet

## Project Structure

```
frontend/
├── public/          # Static files
├── src/
│   ├── components/  # React components
│   │   ├── teacher/
│   │   └── student/
│   ├── pages/       # Page components
│   ├── hooks/       # Custom React hooks
│   └── services/    # API services
├── .env.example     # Example environment variables
└── vercel.json      # Vercel deployment config
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 