import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/Card';
import { dataService } from '../../services/dataService';
import { useAuth } from '../../context/AuthContext';
import { UploadCloud, FileText, CheckCircle, Clock, Trash2 } from 'lucide-react';

const DocumentUpload = () => {
    const { user } = useAuth();
    const [documents, setDocuments] = useState([]);

    const load = () => {
        if (!user) return;
        setDocuments(dataService.getAll('documents').filter(d => d.author === user.id));
    };

    useEffect(() => { load(); }, [user]);

    const handleUpload = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const file = fd.get('file');
        if (file && file.name) {
            dataService.create('documents', {
                projectId: fd.get('projectId'),
                title: file.name,
                author: user.id,
                size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
                uploadDate: new Date().toISOString(),
                status: 'pending_review'
            });
            load();
            e.target.reset();
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this document?')) {
            dataService.remove('documents', id);
            load();
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Document Management</h1>
                <p className="text-sm text-slate-500 mt-1">Upload and track your research materials.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                    <CardHeader><CardTitle>Upload Document</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={handleUpload} className="space-y-4">
                            <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                                <input type="file" name="file" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                <UploadCloud className="h-10 w-10 text-primary-500 mx-auto mb-2" />
                                <p className="text-sm font-medium text-slate-700">Click or drag & drop your file here</p>
                                <p className="text-xs text-slate-400 mt-1">PDF, DOCX, XLSX supported</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Select Project</label>
                                <select name="projectId" className="input-field" required>
                                    <option value="p1">Quantum Computing Advances</option>
                                    <option value="p2">AI in Healthcare</option>
                                    <option value="p3">Renewable Energy</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full btn-primary">Upload Now</button>
                        </form>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader><CardTitle>My Files</CardTitle></CardHeader>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-600 uppercase bg-slate-50 border-y border-slate-200">
                                <tr>
                                    <th className="px-6 py-3">File</th>
                                    <th className="px-6 py-3">Size</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map(doc => (
                                    <tr key={doc.id} className="bg-white border-b border-slate-100 hover:bg-slate-50">
                                        <td className="px-6 py-4 flex items-center gap-3">
                                            <div className="p-2 bg-blue-50 text-blue-600 rounded"><FileText className="h-4 w-4" /></div>
                                            <span className="font-medium text-slate-900 truncate max-w-[180px]">{doc.title}</span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">{doc.size}</td>
                                        <td className="px-6 py-4">
                                            <span className={`flex items-center gap-1 px-2 py-0.5 text-xs rounded-full w-fit font-medium ${doc.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                                                    doc.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                                }`}>
                                                {doc.status === 'approved' ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                                                {doc.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => handleDelete(doc.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition"><Trash2 className="h-4 w-4" /></button>
                                        </td>
                                    </tr>
                                ))}
                                {documents.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-slate-400">No documents uploaded yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DocumentUpload;
