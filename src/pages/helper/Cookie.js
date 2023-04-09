import Cookies from 'js-cookie';

export function setCookie(key, value, options = {}) {
  if (process.browser) {
    Cookies.set(key, value, {
      expires: 7, // Cookie will expire in 7 days
      secure: true, // Cookie will only be sent over HTTPS if your app is served over HTTPS
      sameSite: 'lax', 
      ...options, // Cookie will be sent on cross-site requests with a safe HTTP method (GET, POST)
    });
  }
}

export function getCookie(key) {
  return process.browser ? Cookies.get(key) : undefined;
}
