import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MobileMenu from './mobilemenu';

const DASHBOARD_API_URL = 'https://api.pupakindonesia.xyz/api/my-profile/';

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/');
          return;
        }
  
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
    }, 3000);
  
    return () => clearTimeout(timeoutId);
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
                        <MobileMenu Logout={handleLogout}/>
                    </div>
                </div>
                <div className="p-5 text-white">
                {isLoggingOut ? (
                    <p className="animate-pulse">Logging out...</p>
                ) : (
                    <>
                    </>
                )}
                {isLoading ? (
                    <p className="animate-pulse">Loading...</p>
                ) : (
                    <>
                    <div className="flex items-center">
                        <h1 className="text-2xl pb-2">Welcome, {dashboardData.name} 👋!</h1>
                    </div>
                    <div className="inline-block bg-green-500 px-2 py-0.5 rounded-lg item-center">
                        <p className="font-bold">{dashboardData.role}</p>
                    </div>
                    {errorMessage && <p>{errorMessage}</p>}
                    </>
                )}
                </div>
                <div className="bg-white rounded-t-[40px] flex-1 min-h-screen overflow-y-scrollp p-5 w-full">
                    <div className="flex flex-wrap px-4 py-2">
                        <a href="/surat-kelahiran" className="w-full w-1/2 p-2">
                            <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
                                <span className="text-blue-500 mr-2">
                                    <svg className="h-24 w-24 text-gray-900"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />  <line x1="8" y1="8" x2="12" y2="8" />  <line x1="8" y1="12" x2="12" y2="12" />  <line x1="8" y1="16" x2="12" y2="16" /></svg>
                                </span>
                                <div>
                                    <h2 className="text-gray-800 text-lg font-medium">Surat Kelahiran</h2>
                                    <p className="text-gray-500 mt-2">Permohonan untuk surat kelahiran.</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}
