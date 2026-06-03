import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const RecruiterDashboard = () => {
  const [pipeline, setPipeline] = useState<any[]>([]);

  useEffect(() => {
    fetchPipeline();
  }, []);

  const fetchPipeline = async () => {
    try {
      const { data } = await api.get('/applications/pipeline');
      setPipeline(data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStage = async (appId: string, newStage: string) => {
    try {
      await api.patch(`/applications/${appId}/stage`, { stage: newStage });
      fetchPipeline(); // Refresh
    } catch (err) {
      alert('Failed to update candidate stage');
    }
  };

  const stages = ['APPLIED', 'ASSESSMENT', 'INTERVIEW', 'OFFER_EXTENDED', 'REJECTED'];

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Candidate Pipeline</h2>
        <Link to="/post-internship" className="btn-primary">+ Post New Internship</Link>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {stages.map(stage => (
          <div key={stage} className="flex-1 min-w-[300px] bg-slate-100 rounded-xl p-4 flex flex-col h-[calc(100vh-200px)]">
            <h4 className="font-bold text-slate-700 mb-4 flex justify-between items-center">
              {stage.replace('_', ' ')}
              <span className="bg-slate-200 text-slate-600 text-xs px-2 py-1 rounded-full">
                {pipeline.filter(a => a.stage === stage).length}
              </span>
            </h4>
            <div className="flex flex-col gap-3 overflow-y-auto pr-2">
              {pipeline.filter(a => a.stage === stage).map(app => (
                <div key={app._id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-semibold text-slate-900">
                      {app.student?.firstName} {app.student?.lastName}
                    </h5>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-medium">
                      Score: {app.student?.readinessScore || 0}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4 font-medium">{app.internship?.title}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {app.student?.skills?.slice(0, 3).map((skill: string) => (
                      <span key={skill} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{skill}</span>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 pt-3 flex gap-2">
                    <select 
                      className="text-xs border border-slate-200 rounded px-2 py-1 flex-1 bg-slate-50"
                      value={app.stage}
                      onChange={(e) => updateStage(app._id, e.target.value)}
                    >
                      {stages.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                    </select>
                  </div>
                </div>
              ))}
              {pipeline.filter(a => a.stage === stage).length === 0 && (
                <div className="text-center text-sm text-slate-400 py-6 border-2 border-dashed border-slate-200 rounded-lg">
                  Empty
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
