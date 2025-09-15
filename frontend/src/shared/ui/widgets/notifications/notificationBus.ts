// Simple pub/sub bus for app-wide notifications (no React context)
type Notification = {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration: number;
};
const listeners = new Set<(item: Notification) => void>();

/**
 * @param {{ type?: 'success' | 'error' | 'warning' | 'info', title?: string, message: string, duration?: number }} payload
 */
export function notify(payload) {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const item = {
    id,
    type: payload.type || "info",
    title: payload.title || "",
    message: payload.message || "",
    duration: typeof payload.duration === "number" ? payload.duration : 4000,
  };
  listeners.forEach((fn) => fn(item));
  return id;
}

export function subscribe(handler) {
  listeners.add(handler);
  return () => listeners.delete(handler);
}

// Convenience helpers
export const notifySuccess = (message, opts = {}) => notify({ type: "success", message, ...opts });
export const notifyError = (message, opts = {}) => notify({ type: "error", message, ...opts });
export const notifyWarning = (message, opts = {}) => notify({ type: "warning", message, ...opts });
export const notifyInfo = (message, opts = {}) => notify({ type: "info", message, ...opts });