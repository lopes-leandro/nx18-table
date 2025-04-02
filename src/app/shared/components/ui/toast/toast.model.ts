export interface ToastModel {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
}
