import { toast } from 'react-toastify';

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default';

export function showToast(type: ToastType = 'default', message?: string) {
  toast(message, { type });
}
