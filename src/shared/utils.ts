export const getAuthCookie = () => document.cookie.split(';').find((cookie) => cookie.trim().startsWith('task_app_token'))?.split('=')[1] || '';
