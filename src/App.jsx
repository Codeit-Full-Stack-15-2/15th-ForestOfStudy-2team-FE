import { Route, Routes } from 'react-router';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/home/Home';
import NotFound from './pages/notFound/NotFound';
import StudyDetail from './pages/studyDetail/StudyDetail';
import './reset.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<Home />} />
          <Route path="study-detail" element={<StudyDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
