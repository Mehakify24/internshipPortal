import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import useAuthStore from '../store/useAuthStore';

const StudentDashboard = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const { data } = await api.get('/applications/me');
        setApplications(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchApps();
  }, []);

  const stages = ['APPLIED', 'ASSESSMENT', 'INTERVIEW', 'OFFER_EXTENDED'];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back!</h2>
        <Link to="/internships" className="btn-primary">Browse Internships</Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6 bg-slate-900 text-white col-span-1 md:col-span-2 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">Internship Readiness Score</h3>
            <p className="text-sm text-slate-400">Complete your profile to increase your score.</p>
          </div>
          <div className="text-5xl font-bold text-accent">85<span className="text-xl text-slate-500">/100</span></div>
        </div>
        <div className="card p-6 flex flex-col justify-center">
          <h3 className="text-slate-500 font-medium mb-1">Active Applications</h3>
          <p className="text-3xl font-bold">{applications.length}</p>
        </div>
        <div className="card p-6 flex flex-col justify-center">
          <h3 className="text-slate-500 font-medium mb-1">Interviews</h3>
          <p className="text-3xl font-bold text-blue-600">
            {applications.filter(a => a.stage === 'INTERVIEW').length}
          </p>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4">Application Tracker</h3>
      <div className="flex gap-6 overflow-x-auto pb-4">
        {stages.map(stage => (
          <div key={stage} className="flex-1 min-w-[280px] bg-slate-100 rounded-xl p-4 flex flex-col h-[500px]">
            <h4 className="font-bold text-slate-700 mb-4 flex justify-between items-center">
              {stage.replace('_', ' ')}
              <span className="bg-slate-200 text-slate-600 text-xs px-2 py-1 rounded-full">
                {applications.filter(a => a.stage === stage).length}
              </span>
            </h4>
            <div className="flex flex-col gap-3 overflow-y-auto pr-2">
              {applications.filter(a => a.stage === stage).map(app => (
                <div key={app._id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                  <h5 className="font-semibold text-slate-900">{app.internship?.title || 'Unknown Role'}</h5>
                  <p className="text-sm text-slate-500">{app.internship?.recruiter?.companyName || 'Unknown Company'}</p>
                  <div className="mt-3 text-xs text-slate-400">
                    Applied: {new Date(app.appliedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
              {applications.filter(a => a.stage === stage).length === 0 && (
                <div className="text-center text-sm text-slate-400 py-4 border-2 border-dashed border-slate-200 rounded-lg">
                  No applications
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
