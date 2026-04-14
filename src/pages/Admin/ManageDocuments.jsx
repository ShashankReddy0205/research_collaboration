import { useState, useEffect } from 'react';
import { Card } from '../../components/Card';
import { dataService } from '../../services/dataService';
import { FileText, Download, Check, X, Eye } from 'lucide-react';

const ManageDocuments = () => {
    const [documents, setDocuments] = useState([]);

    const load = () => setDocuments(dataService.getAll('documents'));

    useEffect(() => { load(); }, []);

    const handleStatus = (id, status) => {
        dataService.update('documents', id, { status });
        load();
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Document Moderation</h1>
                <p className="text-sm text-slate-500 mt-1">Review and approve research materials submitted by collaborators.</p>
            </div>
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-600">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-medium">Document</th>
                                <th className="px-6 py-4 font-medium">Author</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map(doc => (
                                <tr key={doc.id} className="bg-white border-b border-slate-100 hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-primary-50 text-primary-600 rounded-lg"><FileText className="h-5 w-5" /></div>
                                            <div>
                                                <div className="font-semibold text-slate-900 leading-tight">{doc.title}</div>
                                                <div className="text-xs text-slate-500">{doc.size} · {new Date(doc.uploadDate).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">User {doc.author}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${doc.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                                                doc.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                                            }`}>{doc.status?.replace('_', ' ').toUpperCase()}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-1">
                                            <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition" title="Preview"><Eye className="h-4 w-4" /></button>
                                            <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition" title="Download"><Download className="h-4 w-4" /></button>
                                            {doc.status !== 'approved' && (
                                                <button onClick={() => handleStatus(doc.id, 'approved')} className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition" title="Approve"><Check className="h-4 w-4" /></button>
                                            )}
                                            {doc.status !== 'rejected' && (
                                                <button onClick={() => handleStatus(doc.id, 'rejected')} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition" title="Reject"><X className="h-4 w-4" /></button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ManageDocuments;
