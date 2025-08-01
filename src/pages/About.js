import React from 'react';

function About() {
  return (
    <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        About Querio AI
      </h1>
      
      <div className="space-y-6 text-gray-200">
        <p>
          Welcome to Querio AI, your intelligent study companion and teaching assistant. Our platform 
          specializes in two core functionalities: generating practice quizzes from study notes for 
          students and creating professional question papers for teachers.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-700/30 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3 text-blue-400">For Students</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Convert study notes to practice quizzes</li>
              <li>Generate targeted review questions</li>
              <li>Track learning progress</li>
              <li>Instant feedback and explanations</li>
            </ul>
          </div>
          
          <div className="bg-gray-700/30 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3 text-purple-400">For Teachers</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Create professional question papers</li>
              <li>Customize difficulty levels</li>
              <li>Generate answer keys</li>
              <li>Save and reuse question templates</li>
            </ul>
          </div>
        </div>

        <p className="mt-6">
          Whether you're a student preparing for exams or a teacher creating assessments,
          Querio AI streamlines your workflow with intelligent question generation technology.
          Start using our platform today - no sign up needed!
        </p>
      </div>
    </div>
  );
}

export default About; 