import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, Briefcase, Activity, MessageSquare } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = ({ role }) => {
    const adminLinks = [
        { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview' },
        { to: '/admin/projects', icon: Briefcase, label: 'Manage Projects' },
        { to: '/admin/users', icon: Users, label: 'Manage Users' },
        { to: '/admin/documents', icon: FileText, label: 'Documents' },
        { to: '/admin/progress', icon: Activity, label: 'Progress Tracking' },
    ];

    const researcherLinks = [
        { to: '/researcher/dashboard', icon: LayoutDashboard, label: 'My Dashboard' },
        { to: '/researcher/projects', icon: Briefcase, label: 'My Projects' },
        { to: '/researcher/documents', icon: FileText, label: 'Documents' },
        { to: '/researcher/milestones', icon: Activity, label: 'Milestones' },
        { to: '/researcher/discussions', icon: MessageSquare, label: 'Discussions' },
    ];

    const links = role === 'admin' ? adminLinks : researcherLinks;

    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 text-white flex flex-col h-full">
            <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
                <span className="font-bold text-lg tracking-tight text-primary-400">ResearchCollab</span>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            clsx(
                                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-primary-900/50 text-primary-400 border border-primary-900/50'
                                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-transparent'
                            )
                        }
                    >
                        <link.icon className="h-5 w-5 flex-shrink-0" />
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors cursor-pointer rounded-md hover:bg-slate-800">
                    <Settings className="h-5 w-5" />
                    Settings
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
