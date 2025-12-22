'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

// Notice the { } around the props
const NavLink = ({ href, children }) => {
    const path = usePathname();
    
    // Logic to handle active state correctly
    // If href is '/', it must be an exact match. Otherwise, check if it starts with href.
    const isActive = href === '/' ? path === '/' : path.startsWith(href);

    return (
        <Link 
            href={href} 
            className={`${isActive ? "text-primary font-bold" : "text-gray-600"}`}
        >
            {children}
        </Link>
    );
};

export default NavLink;