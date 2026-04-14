import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Message sent! (This is a simulation)');
        e.target.reset();
    };

    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Contact Us</h1>
                    <p className="text-slate-600 text-lg max-w-xl mx-auto">Have questions or feedback? Our team is ready to help.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {[
                            { Icon: Mail, label: 'Email', value: 'support@researchcollab.edu' },
                            { Icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
                            { Icon: MapPin, label: 'Location', value: '123 Academia Drive, Research City, RC 45678' },
                        ].map(({ Icon, label, value }) => (
                            <div key={label} className="flex items-start gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                <div className="h-10 w-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                                    <Icon className="h-5 w-5 text-primary-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
                                    <p className="text-sm text-slate-800 font-medium mt-1">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name</label>
                                    <input type="text" required placeholder="John" className="input-field" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name</label>
                                    <input type="text" required placeholder="Doe" className="input-field" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                                <input type="email" required placeholder="you@university.edu" className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
                                <input type="text" required placeholder="How can we help?" className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                                <textarea rows="5" required placeholder="Write your message..." className="input-field resize-none"></textarea>
                            </div>
                            <button type="submit" className="w-full btn-primary py-3">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
