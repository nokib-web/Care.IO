"use server";

import { dbconnect } from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function sendMessage(content) {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    try {
        const db = await dbconnect();
        const messagesCollection = db.collection("messages");

        const newMessage = {
            senderId: new ObjectId(session.user.id),
            senderName: session.user.name,
            content,
            role: "user",
            createdAt: new Date(),
            isRead: false,
        };

        await messagesCollection.insertOne(newMessage);
        return { success: true };
    } catch (error) {
        console.error("Send Message Error:", error);
        return { error: "Failed to send message" };
    }
}

export async function getMessages() {
    const session = await getServerSession(authOptions);
    if (!session) return [];

    try {
        const db = await dbconnect();
        const messagesCollection = db.collection("messages");

        const messages = await messagesCollection
            .find({
                $or: [
                    { senderId: new ObjectId(session.user.id) },
                    { receiverId: new ObjectId(session.user.id) } // Messages sent TO this user (replies)
                ]
            })
            .sort({ createdAt: 1 }) // Oldest first
            .toArray();

        return messages.map(m => ({
            ...m,
            _id: m._id.toString(),
            senderId: m.senderId.toString(),
            receiverId: m.receiverId ? m.receiverId.toString() : null
        }));
    } catch (error) {
        console.error("Get Messages Error:", error);
        return [];
    }
}

// ADMIN FUNCTIONS

export async function getAllConversations() {
    // In a real app, verify Admin role here
    const session = await getServerSession(authOptions);
    if (!session) return [];

    try {
        const db = await dbconnect();
        const messagesCollection = db.collection("messages");

        // Aggregation to get unique conversations with last message details
        const rawConversations = await messagesCollection.aggregate([
            { $match: { role: "user" } }, // Only consider messages from users
            { $sort: { createdAt: -1 } },
            {
                $group: {
                    _id: "$senderId",
                    lastMessage: { $first: "$content" },
                    userName: { $first: "$senderName" },
                    lastActive: { $first: "$createdAt" }
                }
            },
            { $sort: { lastActive: -1 } }
        ]).toArray();

        return rawConversations.map(c => ({
            userId: c._id.toString(),
            userName: c.userName || "Unknown User",
            lastMessage: c.lastMessage,
            lastActive: c.lastActive,
        }));

    } catch (error) {
        console.error("Get All Conversations Error:", error);
        return [];
    }
}

export async function getAdminMessages(userId) {
    // Admin fetching chat with a specific user
    try {
        const db = await dbconnect();
        const messagesCollection = db.collection("messages");

        const messages = await messagesCollection
            .find({
                $or: [
                    { senderId: new ObjectId(userId) },
                    { receiverId: new ObjectId(userId) }
                ]
            })
            .sort({ createdAt: 1 })
            .toArray();

        return messages.map(m => ({
            ...m,
            _id: m._id.toString(),
            senderId: m.senderId.toString(),
            receiverId: m.receiverId ? m.receiverId.toString() : null
        }));
    } catch (error) {
        console.error("Admin Get Messages Error:", error);
        return [];
    }
}

export async function adminReply(userId, content) {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Unauthorized" };

    try {
        const db = await dbconnect();
        const messagesCollection = db.collection("messages");

        const newMessage = {
            senderId: new ObjectId(session.user.id), // Admin ID
            senderName: "Support Team",
            receiverId: new ObjectId(userId), // Target User
            content,
            role: "admin",
            createdAt: new Date(),
            isRead: false,
        };

        await messagesCollection.insertOne(newMessage);
        return { success: true };
    } catch (error) {
        console.error("Admin Reply Error:", error);
        return { error: "Failed to send reply" };
    }
}
