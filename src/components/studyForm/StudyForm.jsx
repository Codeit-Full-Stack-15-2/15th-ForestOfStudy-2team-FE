import clsx from 'clsx';
import styles from './StudyForm.module.css';
import BaseButton from '@/components/baseButton/BaseButton';
import selectedIcon from '@/assets/common/ic_bg_selected.svg';

const backgroundOptions = [
  { id: 'first', className: styles.backgroundOptionFirst },
  { id: 'second', className: styles.backgroundOptionSecond },
  { id: 'third', className: styles.backgroundOptionThird },
  { id: 'fourth', className: styles.backgroundOptionFourth },
  { id: 'fifth', className: styles.backgroundOptionFifth },
  { id: 'sixth', className: styles.backgroundOptionSixth },
  { id: 'seventh', className: styles.backgroundOptionSeventh },
  { id: 'eighth', className: styles.backgroundOptionEighth },
];

function StudyForm({
  formData,
  onChange,
  nicknameCheckStatus,
  onNicknameCheck,
  selectedBackground,
  onBackgroundSelect,
  errors = {},
}) {
  return (
    <div className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="nickname">
          닉네임
        </label>
        <div className={styles.fieldArea}>
          <div className={styles.nicknameInputBox}>
            <input
              className={clsx(styles.input, styles.nicknameInput)}
              id="nickname"
              name="nickname"
              type="text"
              placeholder="닉네임을 입력해 주세요"
              value={formData.nickname}
              onChange={onChange}
              maxLength={10}
            />
            <BaseButton
              type="button"
              size="none"
              variant="primary"
              className={styles.nicknameCheckButton}
              onClick={onNicknameCheck}
              disabled={!formData.nickname.trim()}
            >
              중복 확인
            </BaseButton>
          </div>

          {errors.nickname && (
            <p className={styles.errorMessage}>{errors.nickname}</p>
          )}
          {!errors.nickname && nicknameCheckStatus === 'available' && (
            <p>사용 가능한 닉네임입니다.</p>
          )}
          {!errors.nickname && nicknameCheckStatus === 'duplicate' && (
            <p>이미 사용 중인 닉네임입니다.</p>
          )}
        </div>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="studyName">
          스터디 이름
        </label>
        <div className={styles.fieldArea}>
          <input
            className={styles.input}
            id="studyName"
            name="studyName"
            type="text"
            placeholder="스터디 이름을 입력해 주세요"
            value={formData.studyName}
            onChange={onChange}
            maxLength={10}
          />

          {errors.studyName && (
            <p className={styles.errorMessage}>{errors.studyName}</p>
          )}
        </div>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="description">
          소개
        </label>
        <textarea
          className={styles.textarea}
          id="description"
          name="description"
          placeholder="소개 멘트를 작성해 주세요"
          value={formData.description}
          onChange={onChange}
          maxLength={100}
        />
      </div>
      <div className={styles.backgroundGroup}>
        <p className={styles.label}>배경을 선택해주세요</p>

        <div className={styles.backgroundOptions}>
          {backgroundOptions.map((option) => (
            <button
              key={option.id}
              className={clsx(styles.backgroundOption, option.className, {
                [styles.selected]: selectedBackground === option.id,
              })}
              type="button"
              onClick={() => onBackgroundSelect(option.id)}
              aria-pressed={selectedBackground === option.id}
            >
              {selectedBackground === option.id && (
                <img
                  className={styles.selectedIcon}
                  src={selectedIcon}
                  alt=""
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudyForm;
