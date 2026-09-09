import { RouterProvider } from 'react-router';
import { router } from '@/router';
import { Toaster } from 'react-hot-toast';
import './App.css';
import './reset.css';

function App() {
  return (
    <>
      <Toaster position="bottom-center" toastOptions={{ duration: 1000 }} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
