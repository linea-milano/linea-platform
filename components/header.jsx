// components/header.jsx
'use client'; // Aggiungi questa riga per indicare che questo componente è un Client Component

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import lineaLogo from 'public/linea-logo.png';
import githubLogo from 'public/images/github-mark-white.svg';

const navItems = [
    { linkText: 'Home', href: '/' },
    { linkText: 'Schedule', href: '/schedule' },
    { linkText: 'Video', href: '/image-cdn' },
    { linkText: 'Audio', href: '/audio' },
    { linkText: 'About', href: '/about' },
    { linkText: 'Test', href: '/classics' }
];

export function Header() {
    return (
        <nav className="flex items-center justify-between py-6 px-4 border-b border-white">
            <Link href="/">
                <Image src={lineaLogo} alt="Linea logo" className="logo-menu" />
            </Link>
            <ul className="flex gap-4">
                {navItems.map((item, index) => (
                    <li key={index}>
                        <Link href={item.href} className="text-white hover:text-gray-400 transition">
                            {item.linkText}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="flex items-center gap-4">
                <button className="text-white hover:text-gray-400 transition">Search</button>
                <Link href="https://github.com/netlify-templates/next-platform-starter" target="_blank" rel="noopener noreferrer">
                    <Image src={githubLogo} alt="GitHub logo" className="w-6" />
                </Link>
            </div>
        </nav>
    );
}
