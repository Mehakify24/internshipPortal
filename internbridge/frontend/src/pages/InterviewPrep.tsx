import { useState, useEffect } from 'react';

const InterviewPrep = () => {
  const [activeTab, setActiveTab] = useState<'GUIDES' | 'QA' | 'MOCK'>('GUIDES');
  const [expandedQ, setExpandedQ] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<'technical' | 'behavioral' | 'resume' | null>(null);
  const [matchState, setMatchState] = useState<'idle' | 'searching' | 'matched'>('idle');

  const startMatchmaking = () => {
    setMatchState('searching');
    setTimeout(() => {
      setMatchState('matched');
    }, 2000);
  };

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
            <button className="text-blue-600 font-medium text-sm hover:underline" onClick={() => setActiveModal('technical')}>Read Guide →</button>
          </div>
          <div className="card p-6 border-t-4 border-purple-500">
            <h3 className="font-bold text-lg mb-2">Behavioral (STAR)</h3>
            <p className="text-sm text-slate-600 mb-4">Learn to format your answers using Situation, Task, Action, Result.</p>
            <button className="text-blue-600 font-medium text-sm hover:underline" onClick={() => setActiveModal('behavioral')}>Read Guide →</button>
          </div>
          <div className="card p-6 border-t-4 border-green-500">
            <h3 className="font-bold text-lg mb-2">Resume Optimization</h3>
            <p className="text-sm text-slate-600 mb-4">How to bypass ATS systems and make your experience stand out.</p>
            <button className="text-blue-600 font-medium text-sm hover:underline" onClick={() => setActiveModal('resume')}>Read Guide →</button>
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
        <div className="card p-8 text-center max-w-2xl mx-auto transition-all">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🎥</div>
          
          {matchState === 'idle' && (
            <>
              <h3 className="text-xl font-bold mb-2">Schedule a Peer Mock Interview</h3>
              <p className="text-slate-600 mb-6">Practice makes perfect. Connect with another student to practice your behavioral or technical skills in a realistic environment.</p>
              <button className="btn-primary" onClick={startMatchmaking}>
                Find a Partner
              </button>
            </>
          )}

          {matchState === 'searching' && (
            <div className="py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-bold mb-2 text-slate-700">Searching for an available peer...</h3>
              <p className="text-slate-500">This usually takes a few seconds.</p>
            </div>
          )}

          {matchState === 'matched' && (
            <div className="py-4 animate-fade-in">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">🎉</div>
              <h3 className="text-2xl font-bold mb-2 text-slate-800">Match Found!</h3>
              <p className="text-slate-600 mb-6">You have been matched with <strong>Alex from Stanford University</strong>.</p>
              <div className="flex gap-4 justify-center">
                <a href="https://meet.google.com/new" target="_blank" rel="noreferrer" className="btn-primary flex items-center gap-2">
                  <span>Join Mock Interview</span>
                </a>
                <button className="btn-secondary" onClick={() => setMatchState('idle')}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-xl text-slate-800">
                {activeModal === 'technical' && 'Technical Interview Guide'}
                {activeModal === 'behavioral' && 'Behavioral (STAR) Guide'}
                {activeModal === 'resume' && 'Resume Optimization Guide'}
              </h3>
              <button 
                className="text-slate-400 hover:text-slate-700 transition-colors"
                onClick={() => setActiveModal(null)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              {activeModal === 'technical' && (
                <div className="space-y-4 text-slate-700">
                  <p>Technical interviews assess your coding skills, problem-solving ability, and computer science fundamentals.</p>
                  <h4 className="font-semibold text-slate-900 mt-4">Key Topics to Study:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Data Structures:</strong> Arrays, Hash Tables, Linked Lists, Trees, Graphs.</li>
                    <li><strong>Algorithms:</strong> Sorting, Searching, Dynamic Programming, BFS/DFS.</li>
                    <li><strong>System Design:</strong> Scalability, Load Balancing, Microservices, Databases.</li>
                  </ul>
                  <div className="bg-blue-50 p-4 rounded-lg mt-6 border border-blue-100">
                    <p className="font-semibold text-blue-800">Pro Tip:</p>
                    <p className="text-sm text-blue-700 mt-1">Always communicate your thought process out loud. Interviewers care more about how you solve the problem than if you get the perfect syntax on the first try.</p>
                  </div>
                </div>
              )}

              {activeModal === 'behavioral' && (
                <div className="space-y-4 text-slate-700">
                  <p>Behavioral interviews use past performance to predict future behavior. The STAR method is the industry standard for answering these questions.</p>
                  <h4 className="font-semibold text-slate-900 mt-4">The STAR Framework:</h4>
                  <ul className="space-y-3 mt-2">
                    <li className="flex gap-3"><strong className="text-purple-600">Situation:</strong> Set the scene and give the necessary details of your example.</li>
                    <li className="flex gap-3"><strong className="text-purple-600">Task:</strong> Describe what your responsibility was in that situation.</li>
                    <li className="flex gap-3"><strong className="text-purple-600">Action:</strong> Explain exactly what steps you took to address it.</li>
                    <li className="flex gap-3"><strong className="text-purple-600">Result:</strong> Share what outcomes your actions achieved (use metrics!).</li>
                  </ul>
                </div>
              )}

              {activeModal === 'resume' && (
                <div className="space-y-4 text-slate-700">
                  <p>Your resume is your first impression. It needs to pass both automated ATS systems and the 6-second recruiter skim test.</p>
                  <h4 className="font-semibold text-slate-900 mt-4">Actionable Optimization Steps:</h4>
                  <ul className="list-decimal pl-5 space-y-2">
                    <li>Use a clean, single-column layout without complex tables or images.</li>
                    <li>Start every bullet point with a strong action verb (e.g., "Architected", "Spearheaded").</li>
                    <li>Quantify your impact using the XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]."</li>
                    <li>Tailor your keywords to match the specific job description.</li>
                  </ul>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button className="btn-primary" onClick={() => setActiveModal(null)}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default InterviewPrep;
