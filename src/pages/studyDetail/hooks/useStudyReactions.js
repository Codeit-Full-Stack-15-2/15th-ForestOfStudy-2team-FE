import { toggleStudyReaction } from '@/api/studyApi';
import { getOrCreateUserId } from '@/utils/userAuth';
import { useEffect, useRef, useState } from 'react';

export function useStudyReactions(studyId, initialReactions) {
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
                : [...item.reactedUserIds, currentUserId],
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

  const handleToggleReaction = async (targetEmoji) => {
    if (isSubmitting) return;

    const previousReactions = [...reactions];
    applyOptimisticUpdate(targetEmoji, currentUserId);

    try {
      setIsSubmitting(true);
      await toggleStudyReaction(studyId, targetEmoji, currentUserId);
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
