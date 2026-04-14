import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/Card';
import { dataService } from '../../services/dataService';
import { useAuth } from '../../context/AuthContext';
import { Briefcase, FileText, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResearcherDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({ myProjects: 0, myDocuments: 0, pending: 0, done: 0 });
    const [myMilestones, setMyMilestones] = useState([]);

    useEffect(() => {
        if (!user) return;
        const projects = dataService.getProjectsForUser(user.id);
        const documents = dataService.getAll('documents').filter(d => d.author === user.id);
        const milestones = dataService.getAll('milestones').filter(m => m.assignedTo === user.id);
        setStats({
            myProjects: projects.length,
            myDocuments: documents.length,
            pending: milestones.filter(m => m.status !== 'completed').length,
            done: milestones.filter(m => m.status === 'completed').length
        });
        setMyMilestones(milestones.slice(0, 5));
    }, [user]);

    const statCards = [
        { title: 'My Projects', value: stats.myProjects, icon: Briefcase, color: 'text-primary-600', bg: 'bg-primary-100', path: '/researcher/projects' },
        { title: 'My Documents', value: stats.myDocuments, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100', path: '/researcher/documents' },
        { title: 'Pending Tasks', value: stats.pending, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100', path: '/researcher/milestones' },
        { title: 'Tasks Completed', value: stats.done, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100', path: '/researcher/milestones' }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back, {user?.name?.split(' ')[0]}!</h1>
                <p className="text-sm text-slate-500 mt-1">Here is your research activity summary.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((s, i) => (
                    <Card key={i} className="hover:shadow-md transition-all cursor-pointer group" onClick={() => navigate(s.path)}>
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-1 group-hover:text-primary-600 transition-colors">{s.title}</p>
                                <p className="text-3xl font-bold text-slate-900">{s.value}</p>
                            </div>
                            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${s.bg}`}>
                                <s.icon className={`h-6 w-6 ${s.color}`} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>My Tasks</CardTitle></CardHeader>
                    <CardContent>
                        {myMilestones.length ? (
                            <div className="space-y-3">
                                {myMilestones.map(m => (
                                    <div key={m.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors">
                                        <div className={`p-2 rounded-full ${m.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                            {m.status === 'completed' ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-sm text-slate-900">{m.title}</p>
                                            <p className="text-xs text-slate-500">Due: {new Date(m.dueDate).toLocaleDateString()}</p>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${m.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {m.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-400 text-center py-6">No personal tasks assigned yet.</p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'Upload Document', icon: FileText, path: '/researcher/documents' },
                                { label: 'View Projects', icon: Briefcase, path: '/researcher/projects' },
                                { label: 'Track Milestones', icon: CheckCircle, path: '/researcher/milestones' },
                                { label: 'Discussions', icon: Briefcase, path: '/researcher/discussions' },
                            ].map(a => (
                                <button key={a.label} onClick={() => navigate(a.path)} className="flex flex-col items-center gap-3 p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-primary-50 hover:border-primary-200 transition-all group">
                                    <div className="p-3 bg-white rounded-lg shadow-sm group-hover:shadow transition-all">
                                        <a.icon className="h-5 w-5 text-slate-400 group-hover:text-primary-600 transition-colors" />
                                    </div>
                                    <span className="text-xs font-medium text-slate-600 text-center">{a.label}</span>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ResearcherDashboard;
