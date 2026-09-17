import toast from 'react-hot-toast';
import Toast from '@/components/toast/Toast';

export function showToast(text, type = 'success', options={}) {
  toast.custom(
    (t) => <Toast text={text} type={type} isExiting={!t.visible} />,
    { duration: 1000, ...options },
  );
}
