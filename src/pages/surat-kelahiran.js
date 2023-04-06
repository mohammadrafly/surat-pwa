import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import BackButton from './backbutton';
import MobileMenu from './mobilemenu';

const DASHBOARD_API_URL = 'http://localhost:8080/api/my-profile/';
const API_URL = 'http://localhost:8080/api/surat-kelahiran/';

export default function Dashboard() {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const [namaLengkap, setNamaLengkap] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [diLahirkanDi, setDiLahirkanDi] = useState('');
  const [kelahiranKe, setKelahiranKe] = useState('');
  const [anakKe, setAnakKe] = useState('');
  const [penolongKelahiran, setPenolongKelahiran] = useState('');
  const [alamatAnak, setAlamatAnak] = useState('');
  const [nik, setNik] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ name, email, password })
        });

        if (response.status === 401) {
            setErrorMessage('Invalid login credentials.');
        }
        const data = await response.json();
        if (data) {
            setSuccessMessage('Success create user')
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
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/');
        }

        const response = await fetch(DASHBOARD_API_URL + token, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setDashboardData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('An error occurred:', error);
        setErrorMessage('Unable to fetch dashboard data. Please try again.');
      }
    };
    fetchDashboardData();
  }, [router]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => { 
      localStorage.removeItem('token');
      router.push('/');
    }, 3000);
  };

  return (
    <>
      <div className="flex justify-center items-center bg-gray-300">
        <div className="bg-gray-900 bg-cover flex justify-center items-center w-full max-w-md">
            <div className="w-full max-w-md">
                <div className="flex items-center justify-between py-10 px-4">
                    <h1 className="text-white text-4xl font-bold">Surat App</h1>
                    <div className="flex justify-center">
                      <BackButton />
                      <MobileMenu Logout={handleLogout}/>
                    </div>
                </div>
                <div className="bg-white rounded-t-[40px] flex-1 min-h-screen overflow-y-scrollp p-5 w-full">
                    <form onSubmit={handleFormSubmit} className="p-6 w-full">
                      <h2 className="text-xl font-bold mb-6">Surat Kelahiran</h2>
                      {errorMessage && <p className="bg-red-500 rounded-lg text-white text-center p-2 m-5 transition-opacity">{errorMessage}</p>}
                      {successMessage && <p className="animate-pulse bg-green-500 rounded-lg text-white text-center p-2 m-5 transition-opacity">{successMessage}</p>}
                      <div className="mb-4">
                          <label className="block text-gray-700 font-bold mb-2" htmlFor="namaLengkap">
                              Nama Lengkap
                          </label>
                          <input
                              type="text"
                              value={namaLengkap}
                              onChange={(event) => setNamaLengkap(event.target.value)}
                              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              placeholder="Nama Lengkap"
                              required
                          />
                      </div>
                      <div className="mb-4">
                          <label className="block text-gray-700 font-bold mb-2" htmlFor="jenis Kelamin">
                              Jenis Kelamin
                          </label>
                          <select 
                            class="select shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={jenisKelamin}
                            onChange={(event) => setJenisKelamin(event.target.value)}
                            required
                          >
                            <option value="laki-laki">Laki-laki</option>
                            <option value="perempuan">Perempuan</option>
                          </select>
                      </div>
                      <div className="mb-6">
                          <label className="block text-gray-700 font-bold mb-2" htmlFor="diLahirkanDi">
                              Dilahirkan di
                          </label>
                          <input
                              type="text"
                              value={diLahirkanDi}
                              onChange={(event) => setDiLahirkanDi(event.target.value)}
                              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                              placeholder="Dilahirkan di"
                              required
                          />
                          </div>
                      <div className="flex justify-between items-center">
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
                              'Sign Up'
                              )}
                          </button>
                      </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}
