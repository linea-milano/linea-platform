// app/layout.jsx
import '../styles/globals.css';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
            </head>
            <body>
                <Header />
                <div className="container">
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    );
}
