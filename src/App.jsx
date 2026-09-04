import { Route, Routes } from 'react-router';
import './App.css';
import Layout from '@/components/Layout';
import Home from '@/pages/home/Home';
import HabitPage from '@/pages/HabitPage/HabitPage';
import NotFound from '@/pages/notFound/NotFound';
import StudyDetail from '@/pages/studyDetail/StudyDetail';
import './reset.css';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
