import { Link } from 'react-router-dom';
import { UserCog, User } from 'lucide-react';

const RoleSelectionPage = () => {
    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
                    Select Your Role
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Choose how you want to access the platform
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl px-4">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                    <Link to="/login?role=admin" className="card hover:border-primary-500 hover:ring-1 hover:ring-primary-500 transition-all p-8 text-center group bg-white cursor-pointer">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 group-hover:bg-primary-600 transition-colors">
                            <UserCog className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors" aria-hidden="true" />
                        </div>
                        <h3 className="mt-6 text-lg font-semibold text-slate-900 text-center">Admin</h3>
                        <p className="mt-2 text-sm text-slate-500 text-center">
                            Manage projects, users, and oversee all research activities.
                        </p>
                    </Link>

                    <Link to="/login?role=researcher" className="card hover:border-primary-500 hover:ring-1 hover:ring-primary-500 transition-all p-8 text-center group bg-white cursor-pointer">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 group-hover:bg-primary-600 transition-colors">
                            <User className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors" aria-hidden="true" />
                        </div>
                        <h3 className="mt-6 text-lg font-semibold text-slate-900 text-center">Researcher</h3>
                        <p className="mt-2 text-sm text-slate-500 text-center">
                            Collaborate on projects, upload documents, and track milestones.
                        </p>
                    </Link>

                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-500">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RoleSelectionPage;
