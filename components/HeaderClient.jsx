'use client'; // Assicurati che questo componente sia un Client Component

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

export default function HeaderClient() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="flex flex-wrap items-center gap-4 pt-6 pb-12 sm:pt-12 md:pb-24">
            <Link href="/">
                <Image src={lineaLogo} alt="Linea logo" className="logo-menu" />
            </Link>
            <button className="lg:hidden" onClick={toggleMenu}>
                ☰
            </button>
            <ul className={`flex flex-wrap gap-x-4 gap-y-1 ${menuOpen ? 'block' : 'hidden'} lg:flex`}>
                {navItems.map((item, index) => (
                    <li key={index}>
                        <Link
                            href={item.href}
                            className="inline-block px-1.5 py-1 transition hover:opacity-80 sm:px-3 sm:py-2"
                        >
                            {item.linkText}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="flex-grow justify-end hidden lg:flex lg:mr-1">
                <Link
                    href="https://github.com/netlify-templates/next-platform-starter"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image src={githubLogo} alt="GitHub logo" className="w-7" />
                </Link>
            </div>
        </nav>
    );
}
