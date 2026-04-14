import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/Card';
import { dataService } from '../../services/dataService';
import { useAuth } from '../../context/AuthContext';
import { Users, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyProjects = () => {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        if (!user) return;
        setProjects(dataService.getProjectsForUser(user.id));
        setAllUsers(dataService.getAll('users'));
    }, [user]);

    const getInitials = (id) => {
        const u = allUsers.find(u => u.id === id);
        return u ? u.name.charAt(0) : '?';
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Projects</h1>
                <p className="text-sm text-slate-500 mt-1">Research initiatives you are assigned to.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map(p => (
                    <div key={p.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md hover:border-primary-300 transition-all group flex flex-col">
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <h3 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors text-base leading-tight">{p.title}</h3>
                                <span className={`flex-shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full ${p.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                                        p.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                                    }`}>{p.status}</span>
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5 line-clamp-3">{p.description}</p>
                            <div className="flex items-center justify-between text-xs text-slate-400">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {new Date(p.createdAt).toLocaleDateString()}
                                </div>
                                <div className="flex -space-x-2">
                                    {p.members?.slice(0, 4).map((id, i) => (
                                        <div key={i} className="h-6 w-6 rounded-full bg-primary-100 border border-white flex items-center justify-center text-[10px] font-bold text-primary-700">
                                            {getInitials(id)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-slate-100 px-6 py-3 bg-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link to="/researcher/discussions" className="text-sm font-medium text-primary-600 flex items-center justify-between hover:text-primary-700">
                                Go to Discussion <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                ))}
                {projects.length === 0 && (
                    <div className="col-span-full py-14 text-center text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">
                        You are not assigned to any projects yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProjects;
