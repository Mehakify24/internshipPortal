import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const PostInternship = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('REMOTE');
  const [stipend, setStipend] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/internships', { title, description, location, type, stipend });
      navigate('/recruiter');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to post internship');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Post a New Internship</h2>
      <div className="card p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 bg-red-50 p-3 rounded">{error}</div>}
          
          <div>
            <label className="block text-sm font-medium mb-1">Job Title</label>
            <input required type="text" className="input-field" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Frontend Engineering Intern" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea required rows={4} className="input-field" value={description} onChange={e => setDescription(e.target.value)} placeholder="Role responsibilities..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input required type="text" className="input-field" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. San Francisco, CA" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Work Type</label>
              <select className="input-field" value={type} onChange={e => setType(e.target.value)}>
                <option value="REMOTE">Remote</option>
                <option value="HYBRID">Hybrid</option>
                <option value="ONSITE">On-site</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Stipend (Optional)</label>
            <input type="text" className="input-field" value={stipend} onChange={e => setStipend(e.target.value)} placeholder="e.g. $40/hr" />
          </div>

          <button type="submit" disabled={isLoading} className="btn-primary w-full mt-4">
            {isLoading ? 'Posting...' : 'Publish Internship'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostInternship;
