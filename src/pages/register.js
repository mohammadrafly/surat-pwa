import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import BackButton from './components/backbutton';
import apiEndpoints from '../../config';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
      try {
        const response = await fetch(`${apiEndpoints.auth.signUp}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });

        if (response.status === 401) {
            setErrorMessage('Invalid login credentials.');
        }
        const data = await response.json();
        if (data) {
            setSuccessMessage('Success registering. redirecting to login..')
        } else {
            setErrorMessage('Unable to register. Please try again.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        setErrorMessage('Unable to register. Please try again.');
      }
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  };
  
  useEffect(() => {
    if (successMessage) {
      const timeoutId = setTimeout(() => {
        router.push('/');
      }, 2000); 
      return () => clearTimeout(timeoutId);
    }
  }, [successMessage, router]);

  return (
    <>
    <div className="flex justify-center items-center bg-gray-300">
      <div className="bg-gray-900 bg-cover flex justify-center items-center w-full max-w-md pt-[50px]">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <Image
              width={150}
              height={150}
              src="/assets/logo.svg"
              alt="Logo"
            />
            <h1 className="text-4xl text-white font-bold mt-2">Surat App</h1>
          </div>
          <form onSubmit={handleFormSubmit} className="bg-white rounded-t-[40px] flex-1 overflow-y-scrollp p-5 w-full">
            <h2 className="text-xl font-bold mb-6">Sign Up</h2>
            {errorMessage && <p className="bg-red-500 rounded-lg text-white text-center p-2 m-5 transition-opacity">{errorMessage}</p>}
            {successMessage && <p className="animate-pulse bg-green-500 rounded-lg text-white text-center p-2 m-5 transition-opacity">{successMessage}</p>}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="shadow appearance-none border rounded-[15px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="shadow appearance-none border rounded-[15px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email"
                required
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
                className="shadow appearance-none border rounded-[15px] w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="********"
                required
              />
            </div>
            <div className="flex-2 flex flex-col justify-center items-center">
              <button
                className={`rounded-[15px] w-full bg-yellow-400 hover:bg-yellow-500 text-white text-xl font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline ${
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0" />
                      </svg>
                      ) : (
                        'Sign Up'
                      )}
              </button>
              <div className="mt-5">
                <BackButton color={'text-gray-900'}/>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
