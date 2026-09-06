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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reactionListPopoverRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const currentUserId = getOrCreateUserId();

  const applyOptimisticUpdate = (targetEmoji, currentUserId) => {
    setReactions((prev) => {
      const target = prev.find((item) => item.emoji === targetEmoji);
      if (target) {
        const hasReacted = target.reactedUserIds.includes(currentUserId);

        return prev
          .map((item) => {
            if (item.emoji !== targetEmoji) return item;

            return {
              ...item,
              count: hasReacted ? item.count - 1 : item.count + 1,
              reactedUserIds: hasReacted
                ? item.reactedUserIds.filter((id) => id !== currentUserId)
                : [...item.reactedUserIds, currentUserId],
            };
          })
          .filter((item) => item.count > 0);
      }
      return [
        ...prev,
        {
          id: Date.now(),
          emoji: targetEmoji,
          count: 1,
          reactedUserIds: [currentUserId],
        },
      ];
    });
  };

  const handleToggleReaction = async (targetEmoji) => {
    if (isSubmitting) return;

    const previousReactions = [...reactions];
    applyOptimisticUpdate(targetEmoji, currentUserId);

    try {
      setIsSubmitting(true);
      // const serverUpdateData = await toggleStudyReaction(studyId, selectedEmoji, currentUserId)
    } catch (error) {
      console.error('서버 동기화 실패, 롤백 실행', error);
      setReactions(previousReactions);
      alert('네트워크 연결이 원활하지 않습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectEmojiFromPicker = (emoji) => {
    handleToggleReaction(emoji.native);

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

  const handleSelectEmojiFromBadge = (reaction) => {
    handleToggleReaction(reaction.emoji);
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
        {reactions.slice(0, VISIBLE_LIMIT).map((reaction) => {
          const isSelected = reaction.reactedUserIds.includes(currentUserId);
          return (
            <ReactionBadge
              key={reaction.emoji}
              emoji={reaction.emoji}
              count={reaction.count}
              onClick={() => {
                handleSelectEmojiFromBadge(reaction);
              }}
              isSelected={isSelected}
            />
          );
        })}
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
            {reactions.map((reaction) => {
              const isSelected =
                reaction.reactedUserIds.includes(currentUserId);
              return (
                <ReactionBadge
                  key={reaction.emoji}
                  emoji={reaction.emoji}
                  count={reaction.count}
                  onClick={() => {
                    handleSelectEmojiFromBadge(reaction);
                  }}
                  isSelected={isSelected}
                />
              );
            })}
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
              onEmojiSelect={handleSelectEmojiFromPicker}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default StudyReactions;
