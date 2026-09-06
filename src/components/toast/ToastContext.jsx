import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import Toast from './Toast';
import containerStyles from './ToastContainer.module.css';

const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((text, type = 'warning') => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, text, type, isExiting: false }]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isExiting: true } : t)),
      );

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 3000);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className={containerStyles.container}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            text={toast.text}
            type={toast.type}
            isExiting={toast.isExiting}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast는 ToastProvider 안에서만 사용할 수 있어요');
  }
  return context;
}

export { ToastProvider, useToast };
