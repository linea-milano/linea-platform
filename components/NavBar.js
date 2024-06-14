import Link from 'next/link';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/schedule">Schedule</Link></li>
        <li><Link href="/video">Video</Link></li>
        <li><Link href="/artists">Artists</Link></li>
        <li><Link href="/shop">Shop</Link></li>
        <li><Link href="/about">About</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;

