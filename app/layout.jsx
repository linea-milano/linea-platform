// app/layout.jsx
import '../styles/globals.css';
import { Header } from '../components/Header';

export const metadata = {
    title: {
        template: '%s | Linea',
        default: 'Linea Platform'
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
            </head>
            <body>
                <Header />
                <div>{children}</div>
            </body>
        </html>
    );
}
