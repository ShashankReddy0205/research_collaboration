import { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/Card';
import { dataService } from '../../services/dataService';
import { useAuth } from '../../context/AuthContext';
import { Send, Users } from 'lucide-react';

const Discussions = () => {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const endRef = useRef(null);

    useEffect(() => {
        if (!user) return;
        const myProjects = dataService.getProjectsForUser(user.id);
        setProjects(myProjects);
        setAllUsers(dataService.getAll('users'));
        if (myProjects.length > 0) setSelectedProjectId(myProjects[0].id);
    }, [user]);

    useEffect(() => {
        if (selectedProjectId) {
            setMessages(dataService.getMessagesForProject(selectedProjectId));
            setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
        }
    }, [selectedProjectId]);

    const send = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedProjectId) return;
        const msg = dataService.create('messages', {
            projectId: selectedProjectId,
            senderId: user.id,
            message: newMessage.trim(),
            timestamp: new Date().toISOString()
        });
        setMessages(prev => [...prev, msg]);
        setNewMessage('');
        setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    };

    const getUser = (id) => allUsers.find(u => u.id === id) || { name: 'Unknown', avatar: null };

    return (
        <div style={{ height: 'calc(100vh - 8rem)' }} className="flex gap-6">
            {/* Project List Sidebar */}
            <Card className="w-64 flex-shrink-0 flex flex-col h-full hidden lg:flex">
                <CardHeader className="bg-slate-50/80 border-b border-slate-200">
                    <CardTitle className="text-sm">Project Channels</CardTitle>
                </CardHeader>
                <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                    {projects.map(p => (
                        <button
                            key={p.id}
                            onClick={() => setSelectedProjectId(p.id)}
                            className={`w-full text-left p-4 hover:bg-slate-50 transition-colors border-l-4 ${selectedProjectId === p.id ? 'border-primary-500 bg-primary-50/50' : 'border-transparent'
                                }`}
                        >
                            <p className="font-semibold text-sm text-slate-800 truncate">{p.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><Users className="h-3 w-3" />{p.members?.length} members</p>
                        </button>
                    ))}
                    {!projects.length && <p className="p-4 text-sm text-slate-400 text-center">No projects available.</p>}
                </div>
            </Card>

            {/* Chat Area */}
            <Card className="flex-1 flex flex-col h-full overflow-hidden">
                {selectedProjectId ? (
                    <>
                        <CardHeader className="bg-white border-b border-slate-200 shadow-sm z-10">
                            <CardTitle>{projects.find(p => p.id === selectedProjectId)?.title}</CardTitle>
                        </CardHeader>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30 space-y-5">
                            {messages.map((msg, i) => {
                                const me = msg.senderId === user.id;
                                const sender = getUser(msg.senderId);
                                const showAvatar = i === 0 || messages[i - 1].senderId !== msg.senderId;
                                return (
                                    <div key={msg.id} className={`flex gap-3 max-w-[80%] ${me ? 'ml-auto flex-row-reverse' : ''}`}>
                                        <div className="w-8 flex-shrink-0">
                                            {showAvatar && (
                                                <div className="h-8 w-8 rounded-full bg-primary-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                                                    {sender.avatar ? <img src={sender.avatar} className="h-full w-full object-cover" alt="" /> : (
                                                        <span className="text-xs font-bold text-primary-600">{sender.name.charAt(0)}</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div className={`flex flex-col ${me ? 'items-end' : 'items-start'}`}>
                                            {showAvatar && <span className="text-[11px] text-slate-400 mb-1 px-1">{me ? 'You' : sender.name}</span>}
                                            <div className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm leading-relaxed ${me ? 'bg-primary-600 text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm'
                                                }`}>
                                                {msg.message}
                                            </div>
                                            <span className="text-[10px] text-slate-400 mt-1 px-1">
                                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                            {!messages.length && <p className="text-center text-slate-400 text-sm py-12">No messages yet. Start the conversation!</p>}
                            <div ref={endRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-slate-200">
                            <form onSubmit={send} className="flex items-center gap-3">
                                <input
                                    value={newMessage}
                                    onChange={e => setNewMessage(e.target.value)}
                                    placeholder="Type your message…"
                                    className="flex-1 input-field py-3 rounded-full bg-slate-50"
                                />
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim()}
                                    className="h-12 w-12 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="h-5 w-5 ml-0.5" />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                        <Users className="h-12 w-12 text-slate-300 mb-4" />
                        <h3 className="text-lg font-semibold text-slate-800">Select a Project Channel</h3>
                        <p className="text-sm text-slate-400 max-w-xs mt-2">Pick a project from the sidebar to start or view discussions.</p>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Discussions;
