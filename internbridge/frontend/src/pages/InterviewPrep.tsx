import { useState } from 'react';

const InterviewPrep = () => {
  const [activeTab, setActiveTab] = useState<'GUIDES' | 'QA' | 'MOCK'>('GUIDES');
  const [expandedQ, setExpandedQ] = useState<number | null>(null);

  const toggleQ = (index: number) => {
    if (expandedQ === index) setExpandedQ(null);
    else setExpandedQ(index);
  };

  const qaList = [
    {
      q: "Tell me about yourself.",
      a: "Focus on your present role, past experiences that led you there, and future goals that align with the company. Keep it under 2 minutes."
    },
    {
      q: "What is your greatest weakness?",
      a: "Choose a real but non-critical weakness. More importantly, explain the proactive steps you are taking to improve it."
    },
    {
      q: "Explain React Hooks.",
      a: "React hooks allow functional components to have state and lifecycle methods. The most common are useState (for local state) and useEffect (for side effects like data fetching)."
    },
    {
      q: "What happens when you type a URL into the browser?",
      a: "1. DNS Lookup. 2. TCP connection. 3. TLS handshake. 4. HTTP Request. 5. Server processes and sends HTTP Response. 6. Browser renders HTML, CSS, JS."
    }
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">Interview Preparations</h2>
      <p className="text-slate-500 mb-8">Master the skills you need to land your dream internship.</p>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-8">
        <button
          className={`py-3 px-6 font-medium text-sm transition-colors border-b-2 ${activeTab === 'GUIDES' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          onClick={() => setActiveTab('GUIDES')}
        >
          Resource Library
        </button>
        <button
          className={`py-3 px-6 font-medium text-sm transition-colors border-b-2 ${activeTab === 'QA' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          onClick={() => setActiveTab('QA')}
        >
          Common Q&A
        </button>
        <button
          className={`py-3 px-6 font-medium text-sm transition-colors border-b-2 ${activeTab === 'MOCK' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          onClick={() => setActiveTab('MOCK')}
        >
          Mock Interviews
        </button>
      </div>

      {/* Content */}
      {activeTab === 'GUIDES' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card p-6 border-t-4 border-blue-500">
            <h3 className="font-bold text-lg mb-2">Technical Interviews</h3>
            <p className="text-sm text-slate-600 mb-4">Master Data Structures, Algorithms, and System Design concepts.</p>
            <button className="text-blue-600 font-medium text-sm hover:underline">Read Guide →</button>
          </div>
          <div className="card p-6 border-t-4 border-purple-500">
            <h3 className="font-bold text-lg mb-2">Behavioral (STAR)</h3>
            <p className="text-sm text-slate-600 mb-4">Learn to format your answers using Situation, Task, Action, Result.</p>
            <button className="text-blue-600 font-medium text-sm hover:underline">Read Guide →</button>
          </div>
          <div className="card p-6 border-t-4 border-green-500">
            <h3 className="font-bold text-lg mb-2">Resume Optimization</h3>
            <p className="text-sm text-slate-600 mb-4">How to bypass ATS systems and make your experience stand out.</p>
            <button className="text-blue-600 font-medium text-sm hover:underline">Read Guide →</button>
          </div>
        </div>
      )}

      {activeTab === 'QA' && (
        <div className="space-y-4 max-w-3xl">
          {qaList.map((qa, i) => (
            <div key={i} className="card overflow-hidden">
              <button 
                className="w-full p-4 flex justify-between items-center text-left hover:bg-slate-50 transition-colors"
                onClick={() => toggleQ(i)}
              >
                <span className="font-semibold text-slate-800">{qa.q}</span>
                <span className="text-slate-400 font-mono">{expandedQ === i ? '−' : '+'}</span>
              </button>
              {expandedQ === i && (
                <div className="p-4 bg-slate-50 border-t border-slate-100 text-slate-700 text-sm leading-relaxed">
                  {qa.a}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'MOCK' && (
        <div className="card p-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🎥</div>
          <h3 className="text-xl font-bold mb-2">Schedule a Peer Mock Interview</h3>
          <p className="text-slate-600 mb-6">Practice makes perfect. Connect with another student to practice your behavioral or technical skills in a realistic environment.</p>
          <button className="btn-primary" onClick={() => alert("Mock Interview scheduling will be available in V2!")}>
            Find a Partner
          </button>
        </div>
      )}

    </div>
  );
};

export default InterviewPrep;
