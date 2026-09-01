import { Outlet } from 'react-router';
import GlobalHeader from './GlobalHeader';

function Layout() {
  return (
    <>
      <GlobalHeader />
      <Outlet />
    </>
  );
}

export default Layout;
