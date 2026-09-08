import { Outlet } from 'react-router';
import GlobalHeader from '@/components/globalHeader/GlobalHeader';

function Layout() {
  return (
    <>
      <GlobalHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
