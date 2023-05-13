import { useState } from 'react'
import { setCookie } from '../helper/Cookie';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      const cookiesToExpire = ['token', 'frontend', 'name', 'email', 'role', 'created_at'];
      cookiesToExpire.forEach(cookie => setCookie(cookie, '', { expires: -1 }));
      window.location.href = '/';
    }, 3000);
  };
  
  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
      >
        <svg className="h-10 w-10 text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
        </svg>
      </button>

      <div
        className={`${
          isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
        }  md:bg-white bg-gray-800 fixed top-0 left-0 w-1/2 md:w-1/4 h-full z-10 transition-transform duration-300`}
      >
        <div className="flex flex-col h-full justify-center items-center">
          <button onClick={handleLogout} disabled={isLoggingOut} className="flex items-center justify-center bg-yellow-400 p-2 rounded-lg">
            <svg className="h-7 w-7 text-black"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
            <p className="text-black font-medium text-xl">{isLoggingOut ? 'Logging Out...' : 'Logout'}</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
