// app/layout.jsx
import '../styles/globals.css';
import { Header } from '../components/header';

export const metadata = {
  title: 'My Site',
  description: 'This is my site',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
      </head>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
