import smile from '@/assets/ic_smile.svg';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useState } from 'react';
import styles from './StudyReactions.module.css';

function StudyReactions() {
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
    <div className={styles.container}>
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
        <div className={styles.emojiControler}>
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
  );
}

export default StudyReactions;
