import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/Card';
import { Users, Briefcase, FileText, CheckCircle } from 'lucide-react';
import { dataService } from '../../services/dataService';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ users: 0, projects: 0, documents: 0, milestones: 0 });

    useEffect(() => {
        const users = dataService.getAll('users');
        const projects = dataService.getAll('projects');
        const documents = dataService.getAll('documents');
        const milestones = dataService.getAll('milestones');
        setStats({
            users: users.length,
            projects: projects.length,
            documents: documents.length,
            milestones: milestones.filter(m => m.status === 'completed').length
        });
    }, []);

    const statCards = [
        { title: 'Total Users', value: stats.users, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
        { title: 'Total Projects', value: stats.projects, icon: Briefcase, color: 'text-primary-600', bg: 'bg-primary-100' },
        { title: 'Documents Uploaded', value: stats.documents, icon: FileText, color: 'text-amber-600', bg: 'bg-amber-100' },
        { title: 'Milestones Done', value: stats.milestones, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Overview</h1>
                <p className="text-sm text-slate-500 mt-1">Platform-wide statistics and recent activity.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                            </div>
                            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${stat.bg}`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { dot: 'bg-primary-500', text: <><span className="font-medium text-slate-900">Dr. Alice Smith</span> approved a document</>, time: '2h ago' },
                                { dot: 'bg-emerald-500', text: <><span className="font-medium text-slate-900">Dr. Bob Jones</span> completed a milestone</>, time: '5h ago' },
                                { dot: 'bg-blue-500', text: <>New project "Renewable Energy" was created</>, time: '1d ago' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 text-sm">
                                    <div className={`h-2 w-2 rounded-full flex-shrink-0 ${item.dot}`}></div>
                                    <p className="flex-1 text-slate-600">{item.text}</p>
                                    <span className="text-slate-400 flex-shrink-0">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>System Health</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-5">
                            {[
                                { label: 'Storage Usage', value: 45, color: 'bg-primary-500' },
                                { label: 'Active Sessions', value: 30, color: 'bg-blue-500' },
                                { label: 'Projects Active', value: 67, color: 'bg-emerald-500' },
                            ].map((item) => (
                                <div key={item.label}>
                                    <div className="flex justify-between text-sm mb-1.5">
                                        <span className="text-slate-600">{item.label}</span>
                                        <span className="font-semibold">{item.value}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div className={`${item.color} h-2 rounded-full transition-all`} style={{ width: `${item.value}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
