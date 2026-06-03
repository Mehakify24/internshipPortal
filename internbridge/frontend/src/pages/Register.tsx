import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const Register = () => {
  const [role, setRole] = useState<'STUDENT' | 'RECRUITER'>('STUDENT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [designation, setDesignation] = useState('');

  const { register, isAuthenticated, isLoading, error, clearError, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    clearError();
    if (isAuthenticated && user) {
      navigate(`/${user.role.toLowerCase()}`);
    }
  }, [isAuthenticated, user, navigate, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = role === 'STUDENT' 
      ? { email, password, role, firstName, lastName }
      : { email, password, role, companyName, designation };
    await register(userData);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="card max-w-md w-full p-8">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-900">Create an account</h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Or <Link to="/login" className="font-medium text-accent hover:text-blue-500">sign in to your existing account</Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">{error}</div>}
          
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'STUDENT' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              onClick={() => setRole('STUDENT')}
            >
              Student
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'RECRUITER' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              onClick={() => setRole('RECRUITER')}
            >
              Recruiter
            </button>
          </div>

          <div className="rounded-md shadow-sm space-y-4">
            {role === 'STUDENT' ? (
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                  <input type="text" required className="input-field" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input type="text" required className="input-field" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                  <input type="text" required className="input-field" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <input type="text" required className="input-field" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
              <input type="email" required className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input type="password" required className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <div>
            <button type="submit" disabled={isLoading} className="w-full flex justify-center btn-primary">
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
