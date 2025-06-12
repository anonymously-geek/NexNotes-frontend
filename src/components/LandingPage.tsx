import React from 'react';
import styles from './LandingPage.module.css';

interface LandingPageProps {
  onGetStarted: () => void;
}

function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className={styles.container}>
      {/* Animated background shapes */}
      <div className={styles.backgroundShapes}>
        <div className={styles.shapesContainer}>
          <div className={styles.shape1}></div>
          <div className={styles.shape2}></div>
          <div className={styles.shape3}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Transform Your Learning & Teaching
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Generate practice quizzes from your study notes and create professional question papers effortlessly.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">For Students</h2>
              <ul className="text-gray-300 space-y-3">
                <li>✓ Convert study notes to practice quizzes</li>
                <li>✓ Get instant feedback on your answers</li>
                <li>✓ Track your learning progress</li>
                <li>✓ Study smarter, not harder</li>
              </ul>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">For Teachers</h2>
              <ul className="text-gray-300 space-y-3">
                <li>✓ Create professional question papers</li>
                <li>✓ Customize difficulty levels</li>
                <li>✓ Generate answer keys automatically</li>
                <li>✓ Save time on assessment creation</li>
              </ul>
            </div>
          </div>

          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/25"
          >
            Get Started - It's Free
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage; 