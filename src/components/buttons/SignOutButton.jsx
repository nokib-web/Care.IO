"use client";

import { signOut } from "next-auth/react";

const SignOutButton = () => {
    return (
        <button onClick={() => signOut({ callbackUrl: "/login" })} className="w-full text-left">
            Logout
        </button>
    );
};

export default SignOutButton;
