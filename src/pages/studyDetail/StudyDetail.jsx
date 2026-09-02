import styles from '@/pages/studyDetail/StudyDetail.module.css';
import StudyDetailBody from './components/StudyDetailBody';
import StudyDetailHeader from './components/StudyDetailHeader';

function StudyDetail() {
  return (
    <article className={styles.container}>
      <StudyDetailHeader />
      <StudyDetailBody />
    </article>
  );
}
export default StudyDetail;
