import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from './helper/Cookie';
import MobileMenu from './components/mobilemenu';
import BottomNavbar from './components/bottomnavbar';
import API_BASE_URL from '../../config';

const DASHBOARD_API_URL = `${API_BASE_URL}/api/my-profile/`;

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = getCookie('token');
      if (!token) {
        router.push('/');
        return;
      }

      try {
        const response = await fetch(`${DASHBOARD_API_URL}${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('An error occurred:', error);
        setErrorMessage('Unable to fetch dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
  
    const timeoutId = setTimeout(() => {
      fetchDashboardData();
    }, 0);
  
    return () => clearTimeout(timeoutId);
  }, [router]);  

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => { 
      setCookie('token', '', { expires: -1 });
      window.location.href = '/';
      return null;
    }, 3000);
  };

  return (
    <>
    <div className="flex justify-center items-center bg-gray-300">
        <div className="bg-gray-900 bg-cover flex justify-center items-center">
            <div className="w-full max-w-md">
                <div className="flex items-center justify-between py-10 px-4">
                    <h1 className="text-white text-4xl font-bold">Surat App</h1>
                    <div className="flex justify-center">
                        <MobileMenu Logout={handleLogout}/>
                    </div>
                </div>
                <div className="m-5 p-5 rounded-[30px] shadow-lg text-gray-900 bg-yellow-400">
                  {isLoggingOut ? (
                    <p className="animate-pulse">Logging out...</p>
                  ) : (
                    <>
                      {errorMessage && <p>{errorMessage}</p>}
                    </>
                  )}
                  {isLoading ? (
                      <p className="animate-pulse">Loading...</p>
                  ) : (
                    <>
                      <div className="flex items-center">
                        <h1 className="text-2xl pb-2">Welcome, <span className="font-bold">{dashboardData.name}</span> 👋!</h1>
                      </div>
                      <div className="inline-block bg-white px-2 py-0.5 rounded-lg item-center mb-4">
                        <div className="font-bold">
                          {dashboardData.role === 'warga' && (
                            <p>Warga</p>
                          )}
                          {dashboardData.role === 'kepala_desa' && (
                            <p>Kepala Desa</p>
                          )}
                          {dashboardData.role === 'administrator' && (
                            <p>Administrator</p>
                          )}
                        </div>
                      </div>
                      {errorMessage && <p>{errorMessage}</p>}
                    </>
                    )}
                </div>
                <div className="bg-white md:min-h-screen lg:min-h-screen rounded-t-[40px] flex-1 overflow-y-scrollp p-5 w-full">
                {dashboardData.role === 'warga' && (
                      <div className="flex flex-wrap px-4 py-2">
                        <a href="/dashboard/create-surat" className="w-full p-2">
                            <div className="bg-white rounded-[20px] shadow-md p-4 flex items-center">
                                <span className="text-blue-500 mr-2">
                                    <svg className="h-24 w-24 text-gray-900"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />  <line x1="8" y1="8" x2="12" y2="8" />  <line x1="8" y1="12" x2="12" y2="12" />  <line x1="8" y1="16" x2="12" y2="16" /></svg>
                                </span>
                                <div>
                                    <h2 className="text-gray-800 text-lg font-medium">Buat Surat</h2>
                                    <p className="text-gray-500 mt-2">Permohonan untuk surat.</p>
                                </div>
                            </div>
                        </a>
                        <a href="/dashboard/history-surat" className="w-full p-2">
                            <div className="bg-white rounded-[20px] shadow-md p-4 flex items-center">
                                <span className="text-blue-500 mr-2">
                                  <svg className="h-24 w-24 text-gray-900"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <line x1="8" y1="6" x2="21" y2="6" />  <line x1="8" y1="12" x2="21" y2="12" />  <line x1="8" y1="18" x2="21" y2="18" />  <line x1="3" y1="6" x2="3.01" y2="6" />  <line x1="3" y1="12" x2="3.01" y2="12" />  <line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                                </span>
                                <div>
                                    <h2 className="text-gray-800 text-lg font-medium">Riwayat Surat</h2>
                                    <p className="text-gray-500 mt-2">Riwayat surat saya.</p>
                                </div>
                            </div>
                        </a>
                      </div>
                )}
                {dashboardData.role !== 'warga' && (
                    <div className="flex flex-wrap px-4 py-2">
                        <a href="/dashboard/history-surat" className="w-full p-2">
                            <div className="bg-white rounded-[20px] shadow-md p-10 m-5 flex items-center">
                                <span className="text-blue-500 mr-2">
                                  <svg className="h-24 w-24 text-gray-900"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <line x1="8" y1="6" x2="21" y2="6" />  <line x1="8" y1="12" x2="21" y2="12" />  <line x1="8" y1="18" x2="21" y2="18" />  <line x1="3" y1="6" x2="3.01" y2="6" />  <line x1="3" y1="12" x2="3.01" y2="12" />  <line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                                </span>
                                <div>
                                    <h2 className="text-gray-800 text-lg font-medium">Surat Masuk</h2>
                                    <p className="text-gray-500 mt-2">Riwayat jenis surat.</p>
                                </div>
                            </div>
                        </a>
                    </div>
                )}
                </div>
                <BottomNavbar dashboardData={dashboardData}/>
            </div>
        </div>
    </div>
    </>
  );
}
