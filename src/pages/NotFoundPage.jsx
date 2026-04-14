import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFoundPage = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
        <div className="mb-8">
            <p className="text-8xl font-black text-primary-600 leading-none">404</p>
            <h1 className="text-3xl font-bold text-slate-900 mt-4">Page Not Found</h1>
            <p className="text-slate-500 mt-2 max-w-sm mx-auto">The page you are looking for does not exist or has been moved.</p>
        </div>
        <div className="flex gap-3">
            <Link to="/" className="btn-primary flex items-center gap-2">
                <Home className="h-4 w-4" /> Go Home
            </Link>
            <Link to="/role-selection" className="btn-secondary flex items-center gap-2">
                <Search className="h-4 w-4" /> Find my Dashboard
            </Link>
        </div>
    </div>
);

export default NotFoundPage;
