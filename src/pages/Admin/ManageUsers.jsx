import { useState, useEffect } from 'react';
import { Card } from '../../components/Card';
import { dataService } from '../../services/dataService';
import { UserPlus, UserX, Mail } from 'lucide-react';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(dataService.getAll('users'));
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Users</h1>
                    <p className="text-sm text-slate-500 mt-1">View and manage platform accounts.</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <UserPlus className="h-4 w-4" /> Invite User
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map(u => (
                    <Card key={u.id} className="p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                        <div className="h-20 w-20 rounded-full border-4 border-slate-100 overflow-hidden shadow-sm mb-4 bg-primary-100">
                            {u.avatar ? (
                                <img src={u.avatar} alt={u.name} className="h-full w-full object-cover" />
                            ) : (
                                <span className="h-full w-full flex items-center justify-center text-2xl font-bold text-primary-600">{u.name.charAt(0)}</span>
                            )}
                        </div>
                        <h3 className="font-semibold text-slate-900 text-lg">{u.name}</h3>
                        <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                            <Mail className="h-3 w-3" /> {u.email}
                        </p>
                        <span className={`mt-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-primary-100 text-primary-700'
                            }`}>
                            {u.role}
                        </span>
                        <div className="mt-5 flex w-full gap-2 pt-4 border-t border-dashed border-slate-200">
                            <button className="flex-1 py-2 text-sm text-slate-600 hover:text-primary-600 hover:bg-slate-50 rounded-md transition">Edit</button>
                            {u.role !== 'admin' && (
                                <button className="flex-1 py-2 text-sm text-slate-600 hover:text-red-600 hover:bg-slate-50 rounded-md transition flex items-center justify-center gap-1">
                                    <UserX className="h-3.5 w-3.5" /> Suspend
                                </button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ManageUsers;
