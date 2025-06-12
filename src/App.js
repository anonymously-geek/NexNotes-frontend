import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
        <header className="bg-gray-800/30 backdrop-blur-lg shadow-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Querio AI
              </h1>
              <nav className="space-x-6">
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  About
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 