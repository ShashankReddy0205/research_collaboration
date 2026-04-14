import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'researcher',
        password: '',
        confirmPassword: '',
    });

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Full name is required.';
        if (!formData.email.includes('@')) newErrors.email = 'Enter a valid email.';
        if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
        return newErrors;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        // Simulate registration success
        setSuccess(true);
        setTimeout(() => navigate('/login?role=' + formData.role), 2000);
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 via-primary-50/30 to-slate-100 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-lg">
                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary-600 shadow-lg mb-4">
                        <BookOpen className="h-7 w-7 text-white" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900">Create your account</h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Already have an account?{' '}
                        <Link to="/role-selection" className="font-medium text-primary-600 hover:text-primary-500 underline underline-offset-2">
                            Sign in
                        </Link>
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
                    {success ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                            <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
                                <CheckCircle className="h-9 w-9 text-emerald-600" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900">Registration Successful!</h2>
                            <p className="text-slate-500 text-sm">Redirecting you to sign in...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate className="space-y-5">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Dr. Jane Smith"
                                        className={`input-field pl-9 ${errors.name ? 'border-red-400 focus:ring-red-400' : ''}`}
                                    />
                                </div>
                                {errors.name && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" />{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@university.edu"
                                        className={`input-field pl-9 ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
                                    />
                                </div>
                                {errors.email && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" />{errors.email}</p>}
                            </div>

                            {/* Role */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">I am a…</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['researcher', 'admin'].map((role) => (
                                        <label
                                            key={role}
                                            className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer text-sm font-medium capitalize transition-all ${formData.role === role
                                                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                                                    : 'border-slate-200 text-slate-600 hover:border-primary-400 hover:bg-slate-50'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="role"
                                                value={role}
                                                checked={formData.role === role}
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            {role}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Min. 6 characters"
                                        className={`input-field pl-9 pr-10 ${errors.password ? 'border-red-400 focus:ring-red-400' : ''}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" />{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Re-enter password"
                                        className={`input-field pl-9 ${errors.confirmPassword ? 'border-red-400 focus:ring-red-400' : ''}`}
                                    />
                                </div>
                                {errors.confirmPassword && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" />{errors.confirmPassword}</p>}
                            </div>

                            <button type="submit" className="w-full btn-primary py-3 text-base font-semibold mt-2">
                                Create Account
                            </button>

                            <p className="text-center text-xs text-slate-500 mt-2">
                                By signing up, you agree to the platform's{' '}
                                <span className="text-primary-600 cursor-pointer hover:underline">Terms of Service</span>.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
