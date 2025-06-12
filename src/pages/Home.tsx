import React from 'react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Transform Your Business with AI-Powered Intelligence
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            Querio AI delivers cutting-edge artificial intelligence solutions that automate workflows, analyze data, and drive business decisions.
          </p>
          <div className="flex gap-4">
            <a href="/demo" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition">
              Get Started Free
            </a>
            <a href="/pricing" className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition">
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Leading Companies Choose Querio AI
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">Advanced AI Models</h3>
              <p className="text-gray-600">
                State-of-the-art machine learning models trained on vast datasets for superior performance.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">Real-time Processing</h3>
              <p className="text-gray-600">
                Process and analyze data in real-time for immediate insights and decision-making.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">Enterprise Security</h3>
              <p className="text-gray-600">
                Bank-grade security with end-to-end encryption and compliance with industry standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            Trusted by Industry Leaders
          </h2>
          <div className="grid md:grid-cols-4 gap-8 items-center">
            {/* Add real company logos here */}
            <div className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition">
              {/* Company Logo 1 */}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <article className="rounded-xl overflow-hidden shadow-lg">
              <img src="/case-study-1.jpg" alt="Enterprise AI Implementation" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4">
                  How Company X Increased Efficiency by 300% with Querio AI
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn how our AI solution transformed their business operations and drove unprecedented growth.
                </p>
                <a href="/case-studies/company-x" className="text-blue-600 font-semibold hover:text-blue-700">
                  Read Case Study →
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of companies using Querio AI to drive innovation and growth.
          </p>
          <a href="/demo" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition">
            Start Free Trial
          </a>
        </div>
      </section>

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Querio AI - Advanced Artificial Intelligence Platform",
          "description": "Transform your business with Querio AI's cutting-edge artificial intelligence solutions for workflow automation, data analysis, and decision making.",
          "provider": {
            "@type": "Organization",
            "name": "Querio AI",
            "url": "https://querio.ai"
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "description": "Start with our free trial"
          }
        })}
      </script>
    </>
  );
};

export default Home; 