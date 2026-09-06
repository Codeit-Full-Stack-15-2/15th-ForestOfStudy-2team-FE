import Layout from '@/components/Layout';
import HabitPage from '@/pages/HabitPage/HabitPage';
import FocusPage from '@/pages/focusPage/FocusPage';
import Home from '@/pages/home/Home';
import NotFound from '@/pages/notFound/NotFound';
import StudyCreate from '@/pages/studyCreate/StudyCreate';
import StudyDetail from '@/pages/studyDetail/StudyDetail';
import StudyEdit from '@/pages/studyEdit/StudyEdit';
import { Route, Routes } from 'react-router';
import './App.css';
import './reset.css';
import { ToastProvider } from './components/toast/ToastContext';

function App() {
  return (
    <>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="studies/new" element={<StudyCreate />} />
            <Route path="studies/:studyId" element={<StudyDetail />} />
            <Route path="studies/:studyId/edit" element={<StudyEdit />} />
            <Route path="studies/:studyId/habits" element={<HabitPage />} />
            <Route path="studies/:studyId/focus" element={<FocusPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ToastProvider>
    </>
  );
}

export default App;
