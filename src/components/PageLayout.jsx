import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navber';

export default function PageLayout({ children }) {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isDarkPage = location.pathname === '/studio';
  const navVariant = isDarkPage ? 'dark' : 'light';

  return (
    <div className="min-h-screen">
      <Navbar variant={navVariant} />
      <main>{children}</main>
    </div>
  );
}
