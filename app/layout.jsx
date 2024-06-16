// app/layout.jsx
import '../styles/globals.css';
import { Header } from '../components/header';

function RootLayout({ children }) {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
}

export default RootLayout;
