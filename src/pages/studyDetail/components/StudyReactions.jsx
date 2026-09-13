import smile from '@/assets/studyDetailPage/ic_smile.svg';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useStudyReactions } from '../hooks/useStudyReactions';
import ReactionBadge from './ReactionBadge';
import styles from './StudyReactions.module.css';

const VISIBLE_LIMIT = 3;

function StudyReactions({ studyId, initialReactions }) {
  const {
    reactions,
    currentUserId,
    isOpenEmojiPicker,
    isOpenReactionList,
    reactionListPopoverRef,
    emojiPickerRef,
    handleSelectEmojiFromBadge,
    handleSelectEmojiFromPicker,
    handleToggleEmojiPicker,
    handleToggleReactionList,
  } = useStudyReactions(studyId, initialReactions);
  return (
    <div className={styles.container}>
      <div className={styles.badges}>
        {reactions.slice(0, VISIBLE_LIMIT).map((reaction) => {
          const isSelected = reaction.guestUuids.includes(currentUserId);
          return (
            <ReactionBadge
              key={reaction.emoji}
              emoji={reaction.emoji}
              count={reaction.totalCount}
              onClick={() => {
                handleSelectEmojiFromBadge(reaction.emoji);
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
              const isSelected = reaction.guestUuids.includes(currentUserId);
              return (
                <ReactionBadge
                  key={reaction.emoji}
                  emoji={reaction.emoji}
                  count={reaction.totalCount}
                  onClick={() => {
                    handleSelectEmojiFromBadge(reaction.emoji);
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
        {isOpenEmojiPicker && (
          <div ref={emojiPickerRef} className={styles.emojiControler}>
            {
              <Picker
                data={data}
                locale="ko"
                theme="light"
                skinTonePosition="search"
                onEmojiSelect={handleSelectEmojiFromPicker}
              />
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default StudyReactions;
