"use client";

import { useState, useEffect, useRef } from "react";
import { sendMessage, getMessages } from "@/actions/server/chatActions";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function ChatWidget() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Poll for messages when chat is open
    useEffect(() => {
        let interval;
        if (isOpen && session) {
            // Initial fetch
            getMessages().then(setMessages);

            // Poll every 3 seconds
            interval = setInterval(() => {
                getMessages().then(msgs => {
                    // Only update if different (naive check, usually simple replacement is fine for small chats)
                    setMessages(msgs);
                });
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isOpen, session]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setLoading(true);
        // Optimistic update
        const tempMsg = {
            _id: "temp-" + Date.now(),
            content: input,
            role: "user",
            createdAt: new Date(),
        };
        setMessages(prev => [...prev, tempMsg]);
        const msgToSend = input;
        setInput("");

        await sendMessage(msgToSend);

        // Refetch to sync real state
        const freshMsgs = await getMessages();
        setMessages(freshMsgs);
        setLoading(false);
    };

    const pathname = usePathname();

    if (!session || pathname.startsWith("/admin")) return null; // Only show for logged in users, not on admin pages

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Box */}
            {isOpen && (
                <div className="card w-80 h-96 bg-base-100 shadow-2xl border border-base-200 flex flex-col mb-4 overflow-hidden rounded-2xl">
                    <div className="bg-primary text-primary-content p-4 font-bold flex justify-between items-center">
                        <span>Live Support 💬</span>
                        <button onClick={() => setIsOpen(false)} className="btn btn-xs btn-circle btn-ghost text-white">✕</button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-400 text-sm mt-10">
                                How can we help you today?
                            </div>
                        )}
                        {messages.map((msg) => (
                            <div key={msg._id} className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}>
                                <div className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>
                                    {msg.content}
                                </div>
                                <div className="chat-footer opacity-50 text-[10px] mt-1">
                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSend} className="p-2 bg-white border-t flex gap-2">
                        <input
                            type="text"
                            className="input input-sm input-bordered w-full"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={loading}
                        />
                        <button type="submit" className="btn btn-sm btn-primary btn-circle" disabled={loading || !input.trim()}>
                            ➤
                        </button>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="btn btn-circle btn-primary btn-lg shadow-lg hover:scale-110 transition-transform"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </button>
            )}
        </div>
    );
}
