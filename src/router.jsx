import { createBrowserRouter } from 'react-router';
import Layout from '@/components/Layout';
import Home from '@/pages/home/Home';
import StudyCreate from '@/pages/studyCreate/StudyCreate';
import StudyDetail from '@/pages/studyDetail/StudyDetail';
import StudyEdit from '@/pages/studyEdit/StudyEdit';
import HabitPage from '@/pages/HabitPage/HabitPage';
import FocusPage from '@/pages/focusPage/FocusPage';
import NotFound from '@/pages/notFound/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'studies/new',
        element: <StudyCreate />,
      },
      {
        path: 'studies/:studyId',
        element: <StudyDetail />,
      },
      {
        path: 'studies/:studyId/edit',
        element: <StudyEdit />,
      },
      {
        path: 'studies/:studyId/habits',
        element: <HabitPage />,
      },
      {
        path: 'studies/:studyId/focus',
        element: <FocusPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
