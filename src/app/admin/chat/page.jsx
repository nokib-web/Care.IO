"use client";

import { useEffect, useState, useRef } from "react";
import { getAllConversations, getAdminMessages, adminReply } from "@/actions/server/chatActions";

export default function AdminChatPage() {
    const [conversations, setConversations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Fetch conversations periodically
    useEffect(() => {
        getAllConversations().then(setConversations);
        const interval = setInterval(() => {
            getAllConversations().then(setConversations);
        }, 5000); // Check for new chats every 5s
        return () => clearInterval(interval);
    }, []);

    // Fetch active conversation messages periodically
    useEffect(() => {
        let interval;
        if (selectedUser) {
            getAdminMessages(selectedUser).then(setMessages);
            interval = setInterval(() => {
                getAdminMessages(selectedUser).then(setMessages);
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [selectedUser]);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length]);

    const handleReply = async (e) => {
        e.preventDefault();
        if (!reply.trim()) return;

        setLoading(true);
        // Optimistic
        const tempMsg = {
            _id: "temp-" + Date.now(),
            content: reply,
            role: "admin",
            createdAt: new Date(),
        };
        setMessages(prev => [...prev, tempMsg]);
        const replyToSend = reply;
        setReply("");

        await adminReply(selectedUser, replyToSend);

        // Refresh
        const freshMsgs = await getAdminMessages(selectedUser);
        setMessages(freshMsgs);
        setLoading(false);
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-100px)] flex flex-col">
            <h1 className="text-3xl font-bold mb-6">Live Support Dashboard</h1>

            <div className="flex-1 flex border rounded-xl overflow-hidden shadow-xl bg-base-100 min-h-[600px]">
                {/* Sidebar: Conversations List */}
                <div className="w-1/3 border-r bg-base-200 overflow-y-auto">
                    {conversations.length === 0 && (
                        <div className="p-4 text-center text-gray-500">No active chats</div>
                    )}
                    {conversations.map((conv) => (
                        <div
                            key={conv.userId}
                            onClick={() => setSelectedUser(conv.userId)}
                            className={`p-4 border-b cursor-pointer hover:bg-base-100 transition-colors ${selectedUser === conv.userId ? "bg-white border-l-4 border-l-primary" : ""}`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold">{conv.userName || "Unknown User"}</span>
                                <span className="text-xs text-gray-500">
                                    {new Date(conv.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                        </div>
                    ))}
                </div>

                {/* Main Chat Area */}
                <div className="w-2/3 flex flex-col bg-white">
                    {selectedUser ? (
                        <>
                            <div className="p-4 border-b bg-base-100 font-bold">
                                Chatting with User ({messages.length} messages)
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                                {messages.map((msg) => (
                                    <div key={msg._id} className={`chat ${msg.role === 'admin' ? 'chat-end' : 'chat-start'}`}>
                                        <div className={`chat-header mb-1 text-xs opacity-50`}>
                                            {msg.role === 'admin' ? 'Support' : 'User'}
                                        </div>
                                        <div className={`chat-bubble ${msg.role === 'admin' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>
                                            {msg.content}
                                        </div>
                                        <div className="chat-footer opacity-50 text-[10px] mt-1">
                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            <form onSubmit={handleReply} className="p-4 border-t flex gap-2">
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Type a reply..."
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    disabled={loading}
                                />
                                <button type="submit" className="btn btn-primary" disabled={loading || !reply.trim()}>
                                    Send
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-400">
                            Select a conversation to start chatting
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
