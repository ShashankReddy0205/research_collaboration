import { Bell, Search, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 z-10">
            <div className="flex-1 flex" />

            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-2.5 top-2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-9 pr-4 py-1.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-64 bg-slate-50"
                    />
                </div>

                <button className="text-slate-500 hover:text-slate-700 relative p-1">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-6 w-px bg-slate-200 mx-2"></div>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-slate-700">{user.name}</p>
                        <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden border border-slate-200">
                        {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                        ) : (
                            <User className="h-4 w-4 text-primary-600" />
                        )}
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="ml-2 text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                    title="Logout"
                >
                    <LogOut className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
};

export default Navbar;
