import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserCog, User, AlertCircle, Eye, EyeOff, BookOpen } from 'lucide-react';

// Credential hints per role
const CREDENTIALS = {
    admin: { email: 'alice@admin.edu', password: 'password123' },
    researcher: { email: 'bob@research.edu', password: 'password123' },
};

const LoginPage = () => {
    const [searchParams] = useSearchParams();
    const role = searchParams.get('role') || 'researcher';
    const { login, loginByRole } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        email: CREDENTIALS[role]?.email || '',
        password: CREDENTIALS[role]?.password || '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate brief loading
        setTimeout(() => {
            const user = login(form.email, form.password);
            if (user) {
                navigate(user.role === 'admin' ? '/admin/dashboard' : '/researcher/dashboard', { replace: true });
            } else {
                setError('Invalid email or password. Please try again.');
                setLoading(false);
            }
        }, 400);
    };

    // One-click demo login
    const handleQuickLogin = () => {
        setLoading(true);
        setTimeout(() => {
            const user = loginByRole(role);
            if (user) {
                navigate(user.role === 'admin' ? '/admin/dashboard' : '/researcher/dashboard', { replace: true });
            } else {
                setError('Quick login failed.');
                setLoading(false);
            }
        }, 300);
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 via-primary-50/20 to-slate-100 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-600 shadow-lg mb-4">
                        {role === 'admin' ? (
                            <UserCog className="h-8 w-8 text-white" />
                        ) : (
                            <User className="h-8 w-8 text-white" />
                        )}
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 capitalize">{role} Sign In</h1>
                    <p className="mt-2 text-sm text-slate-500">Access your ResearchCollab dashboard</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
                    {/* Demo credentials hint */}
                    <div className="mb-6 p-3 bg-primary-50 rounded-lg border border-primary-100 text-xs text-primary-700">
                        <strong>Demo credentials:</strong> {CREDENTIALS[role]?.email} / {CREDENTIALS[role]?.password}
                    </div>

                    {error && (
                        <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="input-field"
                                placeholder="your@email.edu"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    className="input-field pr-10"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-3 text-base font-semibold flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Separator */}
                    <div className="my-4 flex items-center gap-3">
                        <div className="flex-1 h-px bg-slate-200"></div>
                        <span className="text-xs text-slate-400">or</span>
                        <div className="flex-1 h-px bg-slate-200"></div>
                    </div>

                    {/* Quick Login button for demo */}
                    <button
                        onClick={handleQuickLogin}
                        disabled={loading}
                        className="w-full py-2.5 rounded-md border-2 border-primary-500 text-primary-600 font-semibold text-sm hover:bg-primary-50 transition-colors"
                    >
                        ⚡ Quick Demo Login as {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>

                    <div className="mt-6 text-center space-y-2">
                        <button
                            onClick={() => navigate('/role-selection')}
                            className="text-sm text-slate-500 hover:text-primary-600 font-medium"
                        >
                            ← Change Role
                        </button>
                        <br />
                        <span className="text-sm text-slate-500">
                            No account?{' '}
                            <Link to="/register" className="text-primary-600 hover:underline font-medium">
                                Register here
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
