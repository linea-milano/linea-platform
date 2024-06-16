// app/layout.jsx
import '../styles/globals.css';
import { Header, MobileHeader } from '../components/header';

function RootLayout({ children }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <MobileHeader />
        </>
    );
}

export default RootLayout;
