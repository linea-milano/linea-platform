import './globals.css';
import Header from '../components/header';

export const metadata = {
  title: 'Linea Media',
  description: 'Linea Media Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
