import Cookies from 'js-cookie';

const setCookie = (key, value, options = {}) => {
  if (typeof window !== 'undefined') {
    Cookies.set(key, value, {
      expires: 7, // Cookie will expire in 7 days
      secure: true, // Cookie will only be sent over HTTPS if your app is served over HTTPS
      sameSite: 'lax', 
      ...options, // Cookie will be sent on cross-site requests with a safe HTTP method (GET, POST)
    });
  }
};

const getCookie = () => Cookies.get();

const getCookieByKey = (key) => (typeof window !== 'undefined' ? Cookies.get(key) : undefined);

export { setCookie, getCookie, getCookieByKey };