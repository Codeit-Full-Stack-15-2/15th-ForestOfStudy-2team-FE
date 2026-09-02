import arrowAright from '@/assets/ic_arrow_right.svg';
import point from '@/assets/ic_point.svg';
import smile from '@/assets/ic_smile.svg';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useState } from 'react';
import styles from './StudyDetailHeader.module.css';

function StudyDetailHeader() {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isAllBadgeOpen, setIsAllBadgeOpen] = useState(false);

  const handleSelectEmoji = (emoji) => {
    console.log('선택된 이모지:', emoji.native);
    // 활성화된 내부 포커스를 해제하여 부모 숨김 시 충돌 방지
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleTogglePicker = () => {
    setIsPickerOpen((prev) => !prev);
  };

  const handleToggleAllBadge = () => {
    setIsAllBadgeOpen((prev) => !prev);
  };
  return (
    <section className={styles.headerContainer}>
      <div className={styles.controllsContainer}>
        <div className={styles.controlls}>
          <button>공유하기</button>| <button>수정하기</button>|
          <button>스터디 삭제하기</button>
        </div>
        <div className={styles.reaction}>
          <div className={styles.badges}>
            <button className={styles.reactionBadge}>
              <span>👩</span> 37
            </button>
            <button className={styles.reactionBadge}>
              <span>👍🏻</span> 50
            </button>
            <button className={styles.reactionBadge}>
              <span>🤩</span> 50
            </button>
            <button
              className={`${styles.reactionBadge} ${styles.more}`}
              onClick={handleToggleAllBadge}
            >
              + 5..
            </button>
            {isAllBadgeOpen && (
              <div className={styles.allReactions}>
                <button className={styles.reactionBadge}>
                  <span>👩</span> 37
                </button>
                <button className={styles.reactionBadge}>
                  <span>👍🏻</span> 50
                </button>
                <button className={styles.reactionBadge}>
                  <span>🤩</span> 50
                </button>
                <button className={styles.reactionBadge}>
                  <span>🤩</span> 50
                </button>
                <button className={styles.reactionBadge}>
                  <span>🤩</span> 50
                </button>
                <button className={styles.reactionBadge}>
                  <span>🤩</span> 50
                </button>
                <button className={styles.reactionBadge}>
                  <span>🤩</span> 50
                </button>
              </div>
            )}
          </div>
          <div className={styles.addWrapper}>
            <button className={styles.add} onClick={handleTogglePicker}>
              <img src={smile} alt="스마일 아이콘" />
              <span>추가</span>
            </button>
            <div className={styles.emojiController}>
              {isPickerOpen && (
                <Picker
                  data={data}
                  locale="ko"
                  theme="light"
                  skinTonePosition="search"
                  onEmojiSelect={handleSelectEmoji}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>연우의 개발공장</h2>
        <div className={styles.titleButtons}>
          <button>
            <span>오늘의 습관</span>
            <img src={arrowAright} alt="우측 화살표 아이콘" />
          </button>
          <button>
            <span>오늘의 집중</span>
            <img src={arrowAright} alt="우측 화살표 아이콘" />
          </button>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <p className={styles.label}>소개</p>
        <p className={styles.description}>
          Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)
        </p>
      </div>
      <div className={styles.pointContainer}>
        <p className={styles.label}>현재까지 획득한 포인트</p>
        <div className={styles.badge}>
          <img src={point} alt="포인트 아이콘" />
          <span>310P 획득</span>
        </div>
      </div>
    </section>
  );
}

export default StudyDetailHeader;
