import React from 'react';
import Logo from './Logo';
import NavLink from '../buttons/NavLink';
import Link from 'next/link';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignOutButton from '../buttons/SignOutButton';

const Navbar = async () => {
    try {
        const session = await getServerSession(authOptions);

        const navLinks = (
            <>
                <li><NavLink href="/">Home</NavLink></li>
                <li><NavLink href="/all-services">All Services</NavLink></li>
                <li><NavLink href="/about">About</NavLink></li>
                <li><NavLink href="/contact">Contact</NavLink></li>
                {session && (
                    <li><NavLink href="/dashboard">Dashboard</NavLink></li>
                )}
            </>
        );

        return (
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <Logo></Logo>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal text-black px-1 gap-2">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end gap-2">
                    {session ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder">
                                <div className="bg-neutral text-neutral-content rounded-full w-10">
                                    <span className="text-xl">{session.user?.name?.charAt(0).toUpperCase() || "U"}</span>
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li><div className="font-bold">{session.user?.name}</div></li>
                                <li><NavLink href="/dashboard">Dashboard</NavLink></li>
                                {session.user?.role === 'admin' && (
                                    <li><NavLink href="/admin/dashboard">Admin Panel</NavLink></li>
                                )}
                                <li className="text-error">
                                    <SignOutButton />
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Link href={'/login'} className="btn btn-primary btn-outline btn-sm">Login</Link>
                            <Link href={'/register'} className="btn btn-primary btn-sm">Register</Link>
                        </>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Navbar Error:", error);
        return <div className="navbar bg-base-100 text-red-500">Error loading navbar</div>;
    }
};

export default Navbar;