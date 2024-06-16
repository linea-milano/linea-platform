import Image from 'next/image';
import Link from 'next/link';
import lineaLogo from 'public/linea-logo.png';

const navItems = [
    { linkText: 'Home', href: '/' },
    { linkText: 'Schedule', href: '/schedule' },
    { linkText: 'Video', href: '/video' },
    { linkText: 'Audio', href: '/audio' },
    { linkText: 'About', href: '/about' }
];

export function Header() {
    return (
        <nav className="flex flex-wrap items-center gap-4 pt-6 pb-12 sm:pt-12 md:pb-24">
            <Link href="/">
                <Image src={lineaLogo} alt="Linea logo" width={50} height={50} />
            </Link>
            {!!navItems?.length && (
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link href={item.href} className="inline-block px-1.5 py-1 transition hover:opacity-80 sm:px-3 sm:py-2">
                                {item.linkText}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}
