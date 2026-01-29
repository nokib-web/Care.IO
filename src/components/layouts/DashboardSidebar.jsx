"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function DashboardSidebar({ title, links, user, children }) {
    const pathname = usePathname();

    return (
        <div className="drawer lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col">
                {/* Mobile Header */}
                <div className="w-full navbar bg-base-100 lg:hidden border-b">
                    <div className="flex-none">
                        <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 font-bold text-lg">{title}</div>
                </div>

                {/* Main Page Content */}
                <main className="flex-1 bg-base-50 min-h-screen">
                    {children}
                </main>
            </div>

            <div className="drawer-side z-40">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-100 border-r text-base-content flex flex-col">
                    {/* Sidebar Header */}
                    <div className="mb-6 px-4 pt-2">
                        <h2 className="text-2xl font-bold text-primary">{title}</h2>
                        {user && (
                            <div className="mt-4 flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                                <div className="avatar placeholder">
                                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                                        <span>{user.name?.charAt(0).toUpperCase()}</span>
                                    </div>
                                </div>
                                <div className="overflow-hidden">
                                    <p className="font-bold truncate">{user.name}</p>
                                    <p className="text-xs text-gray-500 truncate capitalize">{user.role}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-1 space-y-1">
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`${isActive ? "active bg-primary text-white" : ""}`}
                                    >
                                        {link.icon && <span className="text-lg">{link.icon}</span>}
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </div>

                    {/* Footer / Logout */}
                    <div className="mt-auto pt-4 border-t">
                        <li>
                            <Link href="/">
                                Return Home
                            </Link>
                        </li>
                        <li>
                            <button onClick={() => signOut({ callbackUrl: '/' })} className="text-error hover:bg-error/10">
                                Logout
                            </button>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    );
}
