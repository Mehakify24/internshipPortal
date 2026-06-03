import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';
import Login from './pages/Login';
import Register from './pages/Register';
import Internships from './pages/Internships';
import PostInternship from './pages/PostInternship';
import StudentDashboard from './pages/StudentDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import InterviewPrep from './pages/InterviewPrep';

const LandingPage = () => (
  <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-slate-50 text-center px-4">
    <h1 className="text-5xl font-bold text-slate-900 tracking-tight mb-4">
      Launch Your Career. <br /> Build Your Team.
    </h1>
    <p className="text-lg text-slate-600 max-w-2xl mb-8">
      The unified platform connecting top student talent with industry leaders.
    </p>
    <div className="flex gap-4">
      <Link to="/register" className="btn-primary">Get Started</Link>
      <Link to="/login" className="btn-secondary">Sign In</Link>
    </div>
  </div>
);

const AdminDashboard = () => (
  <div className="p-8 max-w-7xl mx-auto">
    <h2 className="text-2xl font-bold mb-6">Admin Analytics</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="card p-6"><h3 className="font-semibold">Total Students</h3><p className="text-2xl font-bold">1,200</p></div>
      <div className="card p-6"><h3 className="font-semibold">Placed</h3><p className="text-2xl font-bold text-green-600">850</p></div>
      <div className="card p-6"><h3 className="font-semibold">Active Applications</h3><p className="text-2xl font-bold">3,450</p></div>
    </div>
  </div>
);

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && user && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  
  return <>{children}</>;
};

function App() {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen font-sans bg-slate-50">
        <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center gap-8">
                <Link to={isAuthenticated && user ? `/${user.role.toLowerCase()}` : '/'} className="text-xl font-bold tracking-tight text-accent">
                  InternBridge
                </Link>
                {isAuthenticated && user?.role === 'STUDENT' && (
                  <div className="hidden md:flex gap-4">
                    <Link to="/student" className="text-sm font-medium text-slate-600 hover:text-slate-900">Dashboard</Link>
                    <Link to="/internships" className="text-sm font-medium text-slate-600 hover:text-slate-900">Job Board</Link>
                    <Link to="/interview-prep" className="text-sm font-medium text-slate-600 hover:text-slate-900">Interview Prep</Link>
                  </div>
                )}
              </div>
              <div className="flex gap-4 items-center">
                {isAuthenticated ? (
                  <>
                    <span className="text-sm text-slate-500 mr-4">Logged in as <span className="font-semibold text-slate-900">{user?.email}</span></span>
                    <button onClick={logout} className="text-sm font-medium text-red-600 hover:text-red-800">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">Sign In</Link>
                    <Link to="/register" className="btn-primary !px-3 !py-1.5 text-sm">Sign Up</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={isAuthenticated && user ? <Navigate to={`/${user.role.toLowerCase()}`} replace /> : <LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/internships" element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <Internships />
            </ProtectedRoute>
          } />

          <Route path="/interview-prep" element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <InterviewPrep />
            </ProtectedRoute>
          } />

          <Route path="/post-internship" element={
            <ProtectedRoute allowedRoles={['RECRUITER']}>
              <PostInternship />
            </ProtectedRoute>
          } />

          <Route path="/student" element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/recruiter" element={
            <ProtectedRoute allowedRoles={['RECRUITER']}>
              <RecruiterDashboard />
            </ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
