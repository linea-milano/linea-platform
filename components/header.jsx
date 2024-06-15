'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import lineaLogo from 'public/linea-logo.png';
import githubLogo from 'public/images/github-mark-white.svg';
import menuIcon from 'public/images/menu-icon.svg';

const navItems = [
    { linkText: 'Home', href: '/' },
    { linkText: 'Schedule', href: '/schedule' },
    { linkText: 'Video', href: '/image-cdn' },
    { linkText: 'Audio', href: '/audio' },
    { linkText: 'About', href: '/about' },
    { linkText: 'Test', href: '/classics' }
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between p-6 bg-black">
            <Link href="/">
                <Image src={lineaLogo} alt="Linea logo" className="logo-menu" />
            </Link>
            <div className="block lg:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <Image src={menuIcon} alt="Menu icon" />
                </button>
            </div>
            <div className={`${isOpen ? 'block' : 'hidden'} w-full lg:flex lg:items-center lg:w-auto`}>
                <ul className="nav-items">
                    {navItems.map((item, index) => (
                        <li key={index} className="nav-item">
                            <Link href={item.href}>
                                {item.linkText}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="flex-grow justify-end hidden lg:flex lg:mr-1">
                    <Link href="https://github.com/netlify-templates/next-platform-starter" target="_blank" rel="noopener noreferrer">
                        <Image src={githubLogo} alt="GitHub logo" className="w-7" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
