import dynamic from 'next/dynamic';

// Importa il componente HeaderClient dinamicamente senza SSR
const HeaderClient = dynamic(() => import('./HeaderClient'), {
  ssr: false,
});

export default function Header() {
  return <HeaderClient />;
}
