import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/Card';
import { dataService } from '../../services/dataService';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, Clock, Calendar } from 'lucide-react';

const Milestones = () => {
    const { user } = useAuth();
    const [milestones, setMilestones] = useState([]);

    const load = () => {
        if (!user) return;
        setMilestones(dataService.getAll('milestones').filter(m => m.assignedTo === user.id));
    };

    useEffect(() => { load(); }, [user]);

    const toggle = (id, current) => {
        dataService.update('milestones', id, { status: current === 'completed' ? 'in_progress' : 'completed' });
        load();
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Tasks & Milestones</h1>
                <p className="text-sm text-slate-500 mt-1">Click the icon to toggle task completion status.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {milestones.map(m => {
                    const done = m.status === 'completed';
                    const overdue = !done && new Date(m.dueDate) < new Date();
                    return (
                        <Card key={m.id} className={`transition-all ${done ? 'border-emerald-200' : overdue ? 'border-red-200' : ''}`}>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${done ? 'bg-emerald-100 text-emerald-700' : overdue ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                        {done ? 'Completed' : overdue ? 'Overdue' : 'In Progress'}
                                    </span>
                                    <button
                                        onClick={() => toggle(m.id, m.status)}
                                        title={done ? 'Mark as pending' : 'Mark as done'}
                                        className={`p-2 rounded-full transition-all ${done ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200' :
                                                'bg-slate-100 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500'
                                            }`}
                                    >
                                        {done ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                                    </button>
                                </div>
                                <h3 className={`font-semibold text-lg text-slate-900 mb-4 ${done ? 'line-through text-slate-400' : ''}`}>
                                    {m.title}
                                </h3>
                                <div className={`flex items-center gap-2 text-sm ${overdue ? 'text-red-500 font-medium' : 'text-slate-500'}`}>
                                    <Calendar className="h-4 w-4" />
                                    Due: {new Date(m.dueDate).toLocaleDateString()}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
                {milestones.length === 0 && (
                    <div className="col-span-full py-14 text-center text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">
                        No tasks assigned to you yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Milestones;
