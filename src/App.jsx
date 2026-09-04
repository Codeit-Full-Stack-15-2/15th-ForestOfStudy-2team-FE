import Layout from '@/components/Layout';
import HabitPage from '@/pages/HabitPage/HabitPage';
import FocusPage from '@/pages/focusPage/FocusPage';
import Home from '@/pages/home/Home';
import NotFound from '@/pages/notFound/NotFound';
import StudyDetail from '@/pages/studyDetail/StudyDetail';
import { Route, Routes } from 'react-router';
import './App.css';
import './reset.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="studies/:studyId" element={<StudyDetail />} />
          <Route path="studies/:studyId/habits" element={<HabitPage />} />
          <Route path="studies/:studyId/focus" element={<FocusPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
