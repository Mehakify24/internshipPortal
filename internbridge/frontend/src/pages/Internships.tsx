import { useState, useEffect } from 'react';
import api from '../api/axios';

const Internships = () => {
  const [internships, setInternships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const { data } = await api.get('/internships');
        setInternships(data);
      } catch (err) {
        console.error('Failed to fetch internships', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInternships();
  }, []);

  const handleApply = async (id: string) => {
    setApplyingId(id);
    try {
      await api.post('/applications', { internshipId: id });
      alert('Successfully applied!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to apply');
    } finally {
      setApplyingId(null);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading internships...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Discover Internships</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internships.map((job) => (
          <div key={job._id} className="card p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-slate-200 rounded-md flex items-center justify-center text-lg font-bold text-slate-500">
                {job.recruiter?.companyName?.charAt(0) || 'C'}
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">{job.title}</h3>
                <p className="text-slate-500 text-sm">{job.recruiter?.companyName}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded font-medium">{job.type}</span>
              <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded font-medium">{job.location}</span>
              {job.stipend && <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded font-medium">{job.stipend}</span>}
            </div>

            <p className="text-sm text-slate-600 mb-6 flex-grow line-clamp-3">
              {job.description}
            </p>

            <button 
              onClick={() => handleApply(job._id)} 
              disabled={applyingId === job._id}
              className="btn-primary w-full mt-auto"
            >
              {applyingId === job._id ? 'Applying...' : 'Apply Now'}
            </button>
          </div>
        ))}
      </div>
      
      {internships.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          No internships available right now. Check back later!
        </div>
      )}
    </div>
  );
};

export default Internships;
