import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from '../helper/Cookie';
import BackButton from '../components/backbutton';
import BottomNavbar from '../components/bottomnavbar';
import API_BASE_URL from '../../../config';

const CREATESURAT_API_URL = `${API_BASE_URL}/api/my-profile/`;

export default function CreateSurat() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});
  const [isLoggingOut, setIsLoggingOut] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = getCookie('token');
        if (!token) {
          router.push('/');
          return;
        }
  
        const response = await fetch(`${CREATESURAT_API_URL}${token}`, {
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
        setErrorMessage('Unable to fetch createSurat data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
  
    const timeoutId = setTimeout(() => {
      fetchDashboardData();
    }, 3000);
  
    return () => clearTimeout(timeoutId);
  }, [router]);  

  return (
    <>
    <div className="flex justify-center items-center bg-gray-300">
        <div className="bg-gray-900 bg-cover flex justify-center items-center w-full max-w-md">
            <div className="w-full max-w-md">
                <div className="flex items-center justify-between py-10 px-4">
                    <h1 className="text-white text-4xl font-bold">Surat App</h1>
                    <div className="flex justify-center">
                        <BackButton color={'text-white'}/>
                    </div>
                </div>
                <div className="p-5 text-white">
                {isLoggingOut ? (
                    <p className="animate-pulse">Logging out...</p>
                ) : (
                    <>
                    </>
                )}
                </div>
                <div className="bg-white lg:min-h-screen rounded-t-[40px] flex-1 overflow-y-scrollp p-5 w-full">
                    <div className="flex flex-wrap px-4 py-2">
                        <a href="/create/surat-kelahiran" className="w-full w-1/2 p-2">
                            <div className="bg-white rounded-[20px] shadow-md p-4 flex items-center">
                                <span className="text-blue-500 mr-2">
                                    <svg className="h-24 w-24 text-gray-900"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />  <line x1="8" y1="8" x2="12" y2="8" />  <line x1="8" y1="12" x2="12" y2="12" />  <line x1="8" y1="16" x2="12" y2="16" /></svg>
                                </span>
                                <div>
                                    <h2 className="text-gray-800 text-lg font-medium">Surat Kelahiran</h2>
                                    <p className="text-gray-500 mt-2">Permohonan untuk surat kelahiran.</p>
                                </div>
                            </div>
                        </a>
                        <a href="/create/surat-kematian" className="w-full w-1/2 p-2">
                            <div className="bg-white rounded-[20px] shadow-md p-4 flex items-center">
                                <span className="text-blue-500 mr-2">
                                    <svg className="h-24 w-24 text-gray-900"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />  <line x1="8" y1="8" x2="12" y2="8" />  <line x1="8" y1="12" x2="12" y2="12" />  <line x1="8" y1="16" x2="12" y2="16" /></svg>
                                </span>
                                <div>
                                    <h2 className="text-gray-800 text-lg font-medium">Surat Kematian</h2>
                                    <p className="text-gray-500 mt-2">Permohonan untuk surat kematian.</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <BottomNavbar dashboardData={dashboardData}/>
            </div>
        </div>
    </div>
    </>
  );
}
