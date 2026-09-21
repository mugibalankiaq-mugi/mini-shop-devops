import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '../utils/utils';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ title, description, type = 'info', duration = 3000 }) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, description, type }]);
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={cn(
              "flex items-start gap-3 w-80 p-4 bg-white rounded-lg shadow-lg border border-border animate-in slide-in-from-right-5",
              toast.type === 'success' && "border-l-4 border-l-green-500",
              toast.type === 'error' && "border-l-4 border-l-destructive",
              toast.type === 'info' && "border-l-4 border-l-primary"
            )}
          >
            <div className="flex-shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-destructive" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-primary" />}
            </div>
            <div className="flex-1">
              {toast.title && <h4 className="text-sm font-semibold text-foreground">{toast.title}</h4>}
              {toast.description && <p className="text-sm text-muted-foreground mt-1">{toast.description}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
