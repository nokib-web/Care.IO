"use server";

import { dbconnect } from "@/lib/dbconnect";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key-change-this-in-prod";
const key = new TextEncoder().encode(SECRET_KEY);

export const registerUser = async (formData) => {
    const nid = formData.get("nid");
    const name = formData.get("name");
    const email = formData.get("email");
    const contact = formData.get("contact");
    const password = formData.get("password");

    // 1. Validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!password || !passwordRegex.test(password)) {
        return {
            success: false,
            message: "Password must be at least 6 characters long and contain at least one uppercase and one lowercase letter."
        };
    }

    try {
        const db = await dbconnect();
        const usersCollection = db.collection("users");

        // 2. Check if user exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return { success: false, message: "User with this email already exists." };
        }

        // 3. Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Save User
        const newUser = {
            nid,
            name,
            email,
            contact,
            password: hashedPassword,
            role: "user",
            createdAt: new Date(),
        };

        await usersCollection.insertOne(newUser);
        return { success: true, message: "Registration successful! Please login." };

    } catch (error) {
        console.error("Registration Error:", error);
        return { success: false, message: "Failed to register. Please try again." };
    }
};

export const loginUser = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const db = await dbconnect();
        const usersCollection = db.collection("users");

        // 1. Find User
        const user = await usersCollection.findOne({ email });
        if (!user) {
            return { success: false, message: "Invalid email or password." };
        }

        // 2. Verify Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { success: false, message: "Invalid email or password." };
        }

        // 3. Generate JWT
        const payload = {
            userId: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role
        };

        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("7d") // 7 days session
            .sign(key);

        // 4. Set Cookie
        (await cookies()).set("session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60, // 7 days
        });

        return { success: true, message: "Login successful!" };

    } catch (error) {
        console.error("Login Error:", error);
        return { success: false, message: "Something went wrong. Please try again." };
    }
};

export const logoutUser = async () => {
    (await cookies()).delete("session");
    redirect("/login");
};

export const getSession = async () => {
    const session = (await cookies()).get("session")?.value;
    if (!session) return null;

    try {
        const { payload } = await jwtVerify(session, key);
        return payload;
    } catch (error) {
        console.error("Session Verify Error:", error);
        return null;
    }
};
