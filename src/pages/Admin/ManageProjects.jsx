import { useState, useEffect } from 'react';
import { Card } from '../../components/Card';
import { dataService } from '../../services/dataService';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    const load = () => setProjects(dataService.getAll('projects'));

    useEffect(() => { load(); }, []);

    const handleDelete = (id) => {
        if (window.confirm('Delete this project?')) {
            dataService.remove('projects', id);
            load();
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = {
            title: fd.get('title'),
            description: fd.get('description'),
            status: fd.get('status'),
            members: editing?.members || [],
            createdAt: editing?.createdAt || new Date().toISOString()
        };
        if (editing) {
            dataService.update('projects', editing.id, data);
        } else {
            dataService.create('projects', data);
        }
        setModalOpen(false);
        setEditing(null);
        load();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Projects</h1>
                    <p className="text-sm text-slate-500 mt-1">Create, update, and remove research projects.</p>
                </div>
                <button onClick={() => { setEditing(null); setModalOpen(true); }} className="btn-primary flex items-center gap-2">
                    <Plus className="h-4 w-4" /> New Project
                </button>
            </div>

            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-600">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-medium">Project Name</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Created</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(p => (
                                <tr key={p.id} className="bg-white border-b border-slate-100 hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-900">{p.title}</div>
                                        <div className="text-xs text-slate-500 truncate max-w-xs">{p.description}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${p.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                                                p.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                                            }`}>{p.status?.charAt(0).toUpperCase() + p.status?.slice(1)}</span>
                                    </td>
                                    <td className="px-6 py-4">{new Date(p.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-1">
                                        <button onClick={() => { setEditing(p); setModalOpen(true); }} className="p-2 text-slate-400 hover:text-primary-600 transition-colors"><Edit2 className="h-4 w-4" /></button>
                                        <button onClick={() => handleDelete(p.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="h-4 w-4" /></button>
                                    </td>
                                </tr>
                            ))}
                            {projects.length === 0 && (
                                <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-400">No projects yet. Create one!</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" onClick={() => setModalOpen(false)}>
                    <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md" onClick={e => e.stopPropagation()}>
                        <div className="px-6 py-4 border-b border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900">{editing ? 'Edit Project' : 'Create New Project'}</h3>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Project Title</label>
                                <input name="title" required defaultValue={editing?.title} className="input-field" placeholder="Enter project title" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea name="description" required defaultValue={editing?.description} rows="3" className="input-field resize-none" placeholder="Project description..."></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                <select name="status" defaultValue={editing?.status || 'active'} className="input-field">
                                    <option value="active">Active</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">Cancel</button>
                                <button type="submit" className="btn-primary">Save Project</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProjects;
