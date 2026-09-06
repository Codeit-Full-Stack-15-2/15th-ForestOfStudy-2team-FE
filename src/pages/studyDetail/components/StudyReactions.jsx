import smile from '@/assets/ic_smile.svg';
import { getOrCreateUserId } from '@/utils/userAuth';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useEffect, useRef, useState } from 'react';
import ReactionBadge from './ReactionBadge';
import styles from './StudyReactions.module.css';

const VISIBLE_LIMIT = 3;

function StudyReactions({ studyId, initialReactions }) {
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState(false);
  const [isOpenReactionList, setIsOpenReactionList] = useState(false);
  const [reactions, setReactions] = useState(initialReactions);
  const currentUserId = getOrCreateUserId();

  const reactionListPopoverRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const handleSelectEmoji = (emoji) => {
    const selectedEmoji = emoji.native;

    setReactions((prev) => {
      const exist = prev.find((item) => item.emoji === selectedEmoji);
      if (exist) {
        return prev.map((item) =>
          item.emoji === selectedEmoji
            ? { ...item, count: item.count + 1 }
            : item,
        );
      }
      return [...prev, { emoji: selectedEmoji, count: 1, reactedUserIds: [] }];
    });

    // 활성화된 내부 포커스를 해제하여 부모 숨김 시 충돌 방지
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setIsOpenEmojiPicker(false);
  };

  const handleToggleEmojiPicker = () => {
    setIsOpenEmojiPicker((prev) => !prev);
  };

  const handleToggleReactionList = () => {
    setIsOpenReactionList((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        reactionListPopoverRef.current &&
        !reactionListPopoverRef.current.contains(event.target)
      ) {
        setIsOpenReactionList(false);
      }

      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setIsOpenEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.badges}>
        {reactions.slice(0, VISIBLE_LIMIT).map((reaction) => (
          <ReactionBadge
            key={reaction.emoji}
            emoji={reaction.emoji}
            count={reaction.count}
          />
        ))}
        {reactions.length > VISIBLE_LIMIT && (
          <button
            className={`${styles.reactionBadge} ${styles.more}`}
            onClick={handleToggleReactionList}
          >
            + {reactions.length - VISIBLE_LIMIT}..
          </button>
        )}
        {isOpenReactionList && (
          <div ref={reactionListPopoverRef} className={styles.allReactions}>
            {reactions.map((reaction) => (
              <ReactionBadge
                key={reaction.emoji}
                emoji={reaction.emoji}
                count={reaction.count}
              />
            ))}
          </div>
        )}
      </div>
      <div className={styles.addWrapper}>
        <button className={styles.add} onClick={handleToggleEmojiPicker}>
          <img src={smile} alt="스마일 아이콘" />
          <span>추가</span>
        </button>
        <div ref={emojiPickerRef} className={styles.emojiControler}>
          {isOpenEmojiPicker && (
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
