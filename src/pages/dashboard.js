import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import MobileMenu from './mobilemenu';

const DASHBOARD_API_URL = 'http://localhost:8080/api/my-profile/';

export default function Dashboard() {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

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

    const handleSwipe = () => {
        fetchDashboardData();
      };
    
      window.addEventListener('touchstart', handleSwipe);
    
      return () => {
        window.removeEventListener('touchstart', handleSwipe);
      };
  }, [router, onRefresh]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <>
    <div className="flex flex-col h-screen bg-gray-800">
        <div className="flex items-center justify-between bg-gray-800 py-10 px-4">
            <h1 className="text-white text-4xl font-bold">Surat App</h1>
            <div className="flex justify-center">
                <MobileMenu Logout={handleLogout}/>
            </div>
        </div>
        <div className="p-5 text-white">
            {refreshing && <div>Refreshing...</div>}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                <div className="flex items-center">
                    <svg class="h-7 w-7 text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>

                    <h1 className="text-2xl">{dashboardData.name}</h1>
                </div>
                <div className="inline-block bg-green-500 px-2 py-0.5 rounded-lg item-center">
                    <p className="font-bold">{dashboardData.role}</p>
                </div>
                
                {errorMessage && <p>{errorMessage}</p>}
                </>
            )}
        </div>
        <div className="bg-white rounded-t-[40px] flex-1 overflow-y-scrollp p-5">
            <div className="flex flex-wrap px-4 py-2">
                <a href="/surat-kelahiran" className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                    <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
                        <span className="text-blue-500 mr-2">
                            <svg class="h-24 w-24 text-gray-900"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />  <line x1="8" y1="8" x2="12" y2="8" />  <line x1="8" y1="12" x2="12" y2="12" />  <line x1="8" y1="16" x2="12" y2="16" /></svg>
                        </span>
                        <div>
                            <h2 className="text-gray-800 text-lg font-medium">Surat Kelahiran</h2>
                            <p className="text-gray-500 mt-2">Permohonan untuk surat kelahiran.</p>
                        </div>
                    </div>
                </a>
                <a href="/surat-kelahiran" className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                    <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
                        <span className="text-blue-500 mr-2">
                            <svg class="h-24 w-24 text-gray-900"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />  <line x1="8" y1="8" x2="12" y2="8" />  <line x1="8" y1="12" x2="12" y2="12" />  <line x1="8" y1="16" x2="12" y2="16" /></svg>
                        </span>
                        <div>
                            <h2 className="text-gray-800 text-lg font-medium">Surat Kelahiran</h2>
                            <p className="text-gray-500 mt-2">Permohonan untuk surat kelahiran.</p>
                        </div>
                    </div>
                </a>
                <a href="/surat-kelahiran" className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                    <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
                        <span className="text-blue-500 mr-2">
                            <svg class="h-24 w-24 text-gray-900"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />  <line x1="8" y1="8" x2="12" y2="8" />  <line x1="8" y1="12" x2="12" y2="12" />  <line x1="8" y1="16" x2="12" y2="16" /></svg>
                        </span>
                        <div>
                            <h2 className="text-gray-800 text-lg font-medium">Surat Kelahiran</h2>
                            <p className="text-gray-500 mt-2">Permohonan untuk surat kelahiran.</p>
                        </div>
                    </div>
                </a>
                <a href="/surat-kelahiran" className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                    <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
                        <span className="text-blue-500 mr-2">
                            <svg class="h-24 w-24 text-gray-900"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />  <line x1="8" y1="8" x2="12" y2="8" />  <line x1="8" y1="12" x2="12" y2="12" />  <line x1="8" y1="16" x2="12" y2="16" /></svg>
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
    </>
  );
}
