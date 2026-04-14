import { Bell, CheckCheck } from 'lucide-react';

const mockNotifications = [
    { id: 1, type: 'info', message: 'Dr. Alice Smith approved your document "Error Rates Data.xlsx"', time: '2 hours ago', read: false },
    { id: 2, type: 'success', message: 'Milestone "Literature Review Completion" was marked as done.', time: '5 hours ago', read: false },
    { id: 3, type: 'info', message: 'You were added to the "Renewable Energy Optimization" project.', time: '1 day ago', read: true },
    { id: 4, type: 'warning', message: 'Milestone "Initial Algorithm Design" is due in 3 days.', time: '2 days ago', read: true },
];

const NotificationsPage = () => (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900">Notifications</h1>
                    <p className="text-slate-500 text-sm mt-1">Stay up to date with your research activity.</p>
                </div>
                <button className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium">
                    <CheckCheck className="h-4 w-4" /> Mark all as read
                </button>
            </div>

            <div className="space-y-3">
                {mockNotifications.map(n => (
                    <div key={n.id} className={`flex items-start gap-4 p-5 rounded-xl border shadow-sm transition-all ${n.read ? 'bg-white border-slate-200 opacity-70' : 'bg-white border-primary-200 shadow-primary-50'}`}>
                        <div className={`h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full ${n.read ? 'bg-slate-100' : 'bg-primary-50'}`}>
                            <Bell className={`h-5 w-5 ${n.read ? 'text-slate-400' : 'text-primary-600'}`} />
                        </div>
                        <div className="flex-1">
                            <p className={`text-sm ${n.read ? 'text-slate-600' : 'text-slate-900 font-medium'}`}>{n.message}</p>
                            <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                        </div>
                        {!n.read && (
                            <div className="h-2.5 w-2.5 rounded-full bg-primary-500 flex-shrink-0 mt-1.5"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default NotificationsPage;
