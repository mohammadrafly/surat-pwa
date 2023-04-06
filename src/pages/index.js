import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const API_URL = 'https://api.pupakindonesia.xyz/api/login';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setErrorMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.status === 401) {
        setErrorMessage('Invalid login credentials.');
      }
  
      const data = await response.json();
  
      if (data.token) {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      } else {
        setErrorMessage('Unable to log in. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage(error.message || 'Unable to log in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <div className="bg-gray-900 bg-cover flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <img
              className="h-16 w-auto"
              src=""
              alt="Logo"
            />
            <h1 className="text-4xl text-white font-bold mt-2">Surat App</h1>
          </div>
          <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6">Sign In</h2>
            {errorMessage && (
              <p
                className={`bg-red-700 rounded-lg text-white text-center p-2 m-5 transition-opacity ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                onAnimationEnd={() => setIsVisible(false)}
              >
                {errorMessage}
              </p>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="********"
              />
            </div>
            <div className="flex space-x-4">
              <button
                className={`rounded-lg w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  isLoading ? 'opacity-50 cursor-wait' : ''
                }`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 inline-block text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v-4a4 4 0 004-4h4zm-2-5.291A7.962 7.962 0 0120 12h4c0-3.042-1.135-5.824-3-7.938l-3 2.647z"
                    ></path>
                  </svg>
                ) : (
                  'Sign In'
                )}
              </button>
              <a
                href="/register"
                className="rounded-lg text-center w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
