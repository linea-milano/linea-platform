// app/layout.jsx
import '../styles/globals.css';
import { Header, MobileHeader } from '../components/header';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Header />
            <Component {...pageProps} />
            <MobileHeader />
        </>
    );
}

export default MyApp;
