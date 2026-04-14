import { Outlet, Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <header className="bg-white shadow-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition">
                            <BookOpen className="h-6 w-6" />
                            <span className="font-bold text-xl tracking-tight">ResearchCollab</span>
                        </Link>
                        <nav className="flex gap-6 items-center">
                            <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition">About</Link>
                            <Link to="/contact" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition">Contact</Link>
                            <Link to="/role-selection" className="btn-primary text-sm">Log In</Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <Outlet />
            </main>

            <footer className="bg-slate-900 text-slate-400 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
                    <p>&copy; 2026 Academic Research Collaboration Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
