import { toggleStudyReaction } from '@/api/studyApi';
import { getOrCreateUserId } from '@/utils/userAuth';
import { useEffect, useRef, useState } from 'react';

export function useStudyReactions(studyId, initialReactions) {
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState(false);
  const [isOpenReactionList, setIsOpenReactionList] = useState(false);
  const [reactions, setReactions] = useState(initialReactions);
  const reactionQueueRef = useRef({});

  const reactionListPopoverRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const currentUserId = getOrCreateUserId();

  const applyOptimisticUpdate = (targetEmoji, currentUserId) => {
    setReactions((prev) => {
      const target = prev.find((item) => item.emoji === targetEmoji);
      if (target) {
        const hasReacted = target.guestUuids.includes(currentUserId);

        const filterdReactions = prev
          .map((item) => {
            if (item.emoji !== targetEmoji) return item;

            return {
              ...item,
              totalCount: hasReacted
                ? item.totalCount - 1
                : item.totalCount + 1,
              guestUuids: hasReacted
                ? item.guestUuids.filter((id) => id !== currentUserId)
                : [...item.guestUuids, currentUserId],
            };
          })
          .filter((item) => item.totalCount > 0);

        return filterdReactions;
      }
      return [
        ...prev,
        {
          id: Date.now(),
          emoji: targetEmoji,
          totalCount: 1,
          guestUuids: [currentUserId],
        },
      ];
    });
  };

  const handleToggleReaction = (targetEmoji) => {
    const previousReactions = [...reactions];
    applyOptimisticUpdate(targetEmoji, currentUserId);

    const processQueue = async () => {
      try {
        if (reactionQueueRef.current[targetEmoji]) {
          await reactionQueueRef.current[targetEmoji];
        }

        await toggleStudyReaction(studyId, targetEmoji, currentUserId);
      } catch (error) {
        console.error(`${targetEmoji} 서버 동기화 실패, 롤백 실행`, error);
        setReactions(previousReactions);
      }
    };

    reactionQueueRef.current[targetEmoji] = processQueue();
  };

  const handleSelectEmojiFromPicker = (emoji) => {
    handleToggleReaction(emoji.native);
  };

  const handleSelectEmojiFromBadge = (emoji) => {
    handleToggleReaction(emoji);
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

  return {
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
  };
}
