import toast from 'react-hot-toast';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

interface ToastOptions {
  duration?: number;
}

export const showToast = {
  success: (message: string, options?: ToastOptions) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md bg-background border border-primary/20 rounded-lg shadow-lg p-4 flex items-center gap-3`}
        >
          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
          <p className="text-sm text-foreground flex-1">{message}</p>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-foreground/60 hover:text-foreground"
          >
            ✕
          </button>
        </div>
      ),
      { duration: options?.duration || 4000 }
    );
  },

  error: (message: string, options?: ToastOptions) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md bg-background border border-accent/20 rounded-lg shadow-lg p-4 flex items-center gap-3`}
        >
          <XCircle className="h-5 w-5 text-accent flex-shrink-0" />
          <p className="text-sm text-foreground flex-1">{message}</p>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-foreground/60 hover:text-foreground"
          >
            ✕
          </button>
        </div>
      ),
      { duration: options?.duration || 5000 }
    );
  },

  warning: (message: string, options?: ToastOptions) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md bg-background border border-accent/20 rounded-lg shadow-lg p-4 flex items-center gap-3`}
        >
          <AlertCircle className="h-5 w-5 text-accent flex-shrink-0" />
          <p className="text-sm text-foreground flex-1">{message}</p>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-foreground/60 hover:text-foreground"
          >
            ✕
          </button>
        </div>
      ),
      { duration: options?.duration || 4000 }
    );
  },

  info: (message: string, options?: ToastOptions) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md bg-background border border-primary/20 rounded-lg shadow-lg p-4 flex items-center gap-3`}
        >
          <Info className="h-5 w-5 text-primary flex-shrink-0" />
          <p className="text-sm text-foreground flex-1">{message}</p>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-foreground/60 hover:text-foreground"
          >
            ✕
          </button>
        </div>
      ),
      { duration: options?.duration || 4000 }
    );
  },
};
