import toast from 'react-hot-toast';
import Toast from '@/components/toast/Toast';

export function showToast(text, type = 'success') {
  toast.custom(
    (t) => <Toast text={text} type={type} isExiting={!t.visible} />,
    { duration: 1000 },
  );
}
