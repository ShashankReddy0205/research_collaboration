import { Link } from 'react-router-dom';
import { BookOpen, Target, Users, Shield, ArrowRight } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <div className="bg-white border-b border-slate-200 py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mb-6">
                        <BookOpen className="h-8 w-8 text-primary-600" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">About ResearchCollab</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        A modern platform purpose-built for academics and researchers to collaborate, manage projects, and drive discovery together.
                    </p>
                </div>
            </div>

            {/* Mission */}
            <div className="max-w-5xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: Target, title: 'Our Mission', text: 'To accelerate academic research by providing tools that streamline collaboration, reduce administrative overhead, and foster knowledge sharing across institutions.' },
                        { icon: Users, title: 'Who We Serve', text: 'Research teams, academic departments, and individual scholars who need a reliable, structured space to manage long-term research projects.' },
                        { icon: Shield, title: 'Our Values', text: 'Transparency, openness, and rigor. Every feature we build is guided by the principles of scientific integrity and collaborative discovery.' },
                    ].map(({ icon: Icon, title, text }) => (
                        <div key={title} className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm flex flex-col gap-4">
                            <div className="h-12 w-12 rounded-lg bg-primary-50 flex items-center justify-center">
                                <Icon className="h-6 w-6 text-primary-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link to="/role-selection" className="btn-primary inline-flex items-center gap-2 text-base py-3 px-6">
                        Get Started <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
