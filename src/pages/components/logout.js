import { setCookie } from '../helper/Cookie';

function LogoutPage() {
  setCookie('authToken', '', { expires: -1 });
  window.location.href = '/';

  return null;
}

export default LogoutPage;
