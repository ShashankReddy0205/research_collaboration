import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Activity, MessageSquare, Briefcase } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative isolate pt-14">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-400 to-primary-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
                </div>

                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                        Elevate Your <span className="text-primary-600">Research Collaboration</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
                        A comprehensive platform designed for academics to streamline project management, document sharing, and team communication in real-time.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link to="/role-selection" className="btn-primary text-lg px-6 py-3 flex items-center gap-2">
                            Get Started
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                        <Link to="/about" className="text-sm font-semibold leading-6 text-slate-900 group">
                            Learn more <span aria-hidden="true" className="group-hover:translate-x-1 inline-block transition-transform">→</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Feature Section */}
            <div className="bg-white py-24 sm:py-32 border-t border-slate-200">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-base font-semibold leading-7 text-primary-600">Why choose us</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Everything you need to collaborate</p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            {[
                                { name: 'Project Management', description: 'Organize research projects and assign tasks effortlessly.', icon: Briefcase },
                                { name: 'Document Sharing', description: 'Real-time document uploads, version control, and approvals.', icon: BookOpen },
                                { name: 'Team Communication', description: 'Internal discussions and message threading per project.', icon: MessageSquare },
                                { name: 'Milestone Tracking', description: 'Keep track of crucial deadlines with dynamic timelines.', icon: Activity },
                                { name: 'Role-based Access', description: 'Secure dashboards tailored for Admins and Researchers.', icon: Users },
                                { name: 'Data Visualization', description: 'Intuitive statistics and progress charts for quick insights.', icon: Briefcase }
                            ].map((feature) => (
                                <div key={feature.name} className="flex flex-col">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary-600">
                                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                                        <p className="flex-auto">{feature.description}</p>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
