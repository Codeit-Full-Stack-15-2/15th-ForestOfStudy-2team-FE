import smile from '@/assets/ic_smile.svg';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useState } from 'react';
import ReactionBadge from './ReactionBadge';
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
        {[
          { id: 1, emoji: '👱‍♀️', count: 37 },
          { id: 2, emoji: '👍🏻', count: 50 },
          { id: 3, emoji: '🤩', count: 50 },
          // 더보기(+5..) 클릭 시 펼쳐질 추가 이모지들
          { id: 4, emoji: '🔥', count: 12 },
          { id: 5, emoji: '🎉', count: 8 },
          { id: 6, emoji: '💻', count: 15 },
          { id: 7, emoji: '☕', count: 20 },
          { id: 8, emoji: '💪', count: 9 },
        ].map((i) => (
          <ReactionBadge emoji={i.emoji} count={i.count} />
        ))}
        <button
          className={`${styles.reactionBadge} ${styles.more}`}
          onClick={handleToggleAllBadge}
        >
          + 5..
        </button>
        {isAllBadgeOpen && (
          <div className={styles.allReactions}>
            {[
              { id: 1, emoji: '👱‍♀️', count: 37 },
              { id: 2, emoji: '👍🏻', count: 50 },
              { id: 3, emoji: '🤩', count: 50 },
              // 더보기(+5..) 클릭 시 펼쳐질 추가 이모지들
              { id: 4, emoji: '🔥', count: 12 },
              { id: 5, emoji: '🎉', count: 8 },
              { id: 6, emoji: '💻', count: 15 },
              { id: 7, emoji: '☕', count: 20 },
              { id: 8, emoji: '💪', count: 9 },
            ].map((i) => (
              <ReactionBadge emoji={i.emoji} count={i.count} />
            ))}
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
