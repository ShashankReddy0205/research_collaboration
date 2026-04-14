import { useAuth } from '../context/AuthContext';
import { User, Mail, ShieldCheck, Edit2 } from 'lucide-react';

const ProfilePage = () => {
    const { user } = useAuth();
    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-8">My Profile</h1>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    {/* Banner */}
                    <div className="h-28 bg-gradient-to-r from-primary-600 to-primary-400"></div>

                    {/* Avatar + info */}
                    <div className="px-8 pb-8 -mt-12 flex flex-col sm:flex-row gap-6 items-start sm:items-end">
                        <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden shadow-md flex-shrink-0 bg-primary-100 flex items-center justify-center">
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-3xl font-bold text-primary-600">{user.name.charAt(0)}</span>
                            )}
                        </div>
                        <div className="pt-12 sm:pt-0 flex-1">
                            <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
                            <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-widest ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-primary-100 text-primary-700'}`}>
                                {user.role}
                            </span>
                        </div>
                        <button className="btn-secondary flex items-center gap-2 text-sm mt-4 sm:mt-0 self-start sm:self-auto">
                            <Edit2 className="h-4 w-4" /> Edit Profile
                        </button>
                    </div>

                    {/* Details */}
                    <div className="border-t border-slate-100 px-8 py-6 space-y-5">
                        <div className="flex items-center gap-4">
                            <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                                <User className="h-5 w-5 text-slate-500" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Full Name</p>
                                <p className="text-sm font-semibold text-slate-800 mt-0.5">{user.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                                <Mail className="h-5 w-5 text-slate-500" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Email Address</p>
                                <p className="text-sm font-semibold text-slate-800 mt-0.5">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                                <ShieldCheck className="h-5 w-5 text-slate-500" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Account Role</p>
                                <p className="text-sm font-semibold text-slate-800 mt-0.5 capitalize">{user.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
