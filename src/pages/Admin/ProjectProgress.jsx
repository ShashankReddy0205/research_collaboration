import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/Card';
import { dataService } from '../../services/dataService';
import { Clock, CheckCircle, Target } from 'lucide-react';

const ProjectProgress = () => {
    const [projects, setProjects] = useState([]);
    const [milestones, setMilestones] = useState([]);

    useEffect(() => {
        setProjects(dataService.getAll('projects'));
        setMilestones(dataService.getAll('milestones'));
    }, []);

    const getProgress = (projectId) => {
        const pms = milestones.filter(m => m.projectId === projectId);
        if (!pms.length) return 0;
        return Math.round((pms.filter(m => m.status === 'completed').length / pms.length) * 100);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Progress Tracking</h1>
                <p className="text-sm text-slate-500 mt-1">Monitor milestone completion across all projects.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => {
                    const progress = getProgress(project.id);
                    const pending = milestones.filter(m => m.projectId === project.id && m.status !== 'completed');
                    return (
                        <Card key={project.id} className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-base">{project.title}</CardTitle>
                                <span className={`text-xs font-bold uppercase tracking-wider ${project.status === 'active' ? 'text-emerald-600' : project.status === 'completed' ? 'text-blue-600' : 'text-amber-600'
                                    }`}>{project.status}</span>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col pt-0">
                                <div className="mb-5">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-600 font-medium">Completion</span>
                                        <span className="font-bold text-primary-600">{progress}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                                        <div className={`h-2.5 rounded-full ${progress === 100 ? 'bg-emerald-500' : 'bg-primary-500'}`} style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>
                                <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-1.5"><Target className="h-4 w-4 text-slate-400" />Open Tasks</h4>
                                {pending.length ? (
                                    <ul className="space-y-2">
                                        {pending.slice(0, 3).map(m => (
                                            <li key={m.id} className="text-sm flex items-center gap-2 text-slate-600">
                                                <Clock className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
                                                <span className="truncate">{m.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="text-sm flex items-center gap-2 p-3 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
                                        <CheckCircle className="h-4 w-4" /> All tasks completed!
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectProgress;
