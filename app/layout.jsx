// app/layout.jsx
import '../styles/globals.css';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head />
            <body className="antialiased text-white bg-black">
                <Header />
                <div className="main-content">{children}</div>
                <Footer />
            </body>
        </html>
    );
}
