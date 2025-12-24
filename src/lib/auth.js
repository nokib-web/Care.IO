import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbconnect } from "@/lib/dbconnect";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const db = await dbconnect();
                const user = await db.collection("users").findOne({ email: credentials.email });

                if (user && (await bcrypt.compare(credentials.password, user.password))) {
                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        image: user.image
                    };
                }
                return null;
            }
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "google") {
                const db = await dbconnect();
                const usersCollection = db.collection("users");

                const existingUser = await usersCollection.findOne({ email: user.email });

                if (!existingUser) {
                    // Create new user for Google login
                    await usersCollection.insertOne({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        role: "user", // Default role
                        createdAt: new Date(),
                        provider: "google"
                    });
                }
                return true;
            }
            return true;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.role = user.role || "user";
                // If the user signed in with database credentials, role is directly available.
                // If google, we might need to fetch it if we want persistent roles from DB.
                // For now, assuming standard flow.
            }

            // If it's a google sign in, we might want to fetch role from DB to ensure it's up to date
            if (account?.provider === "google") {
                const db = await dbconnect();
                const dbUser = await db.collection("users").findOne({ email: token.email });
                if (dbUser) {
                    token.role = dbUser.role;
                    token.id = dbUser._id.toString();
                }
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
