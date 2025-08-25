const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_data';

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

function setCookie(name: string, value: string, days: number = 1): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
}

function removeCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

class StorageUtils {
  setAccessToken(token: string, days: number = 7): void {
    setCookie(TOKEN_KEY, token, days);
  }

  getAccessToken(): string | null {
    return getCookie(TOKEN_KEY);
  }

  removeAccessToken(): void {
    removeCookie(TOKEN_KEY);
  }

  setRefreshToken(token: string, days: number = 30): void {
    setCookie(REFRESH_TOKEN_KEY, token, days);
  }

  getRefreshToken(): string | null {
    return getCookie(REFRESH_TOKEN_KEY);
  }

  removeRefreshToken(): void {
    removeCookie(REFRESH_TOKEN_KEY);
  }

  setUser(user: any, days: number = 7): void {
    setCookie(USER_KEY, JSON.stringify(user), days);
  }

  getUser(): any | null {
    const user = getCookie(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  removeUser(): void {
    removeCookie(USER_KEY);
  }

  clearTokens(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
    this.removeUser();
  }

  clearAll(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
    this.removeUser();
  }
}

export const storageUtils = new StorageUtils();


