import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from '../helper/Cookie';
import BackButton from '../components/backbutton';
import BottomNavbar from '../components/bottomnavbar';
import API_BASE_URL from '../../../config';
import MobileMenu from '../components/mobilemenu';

const PROFILE_API_URL = `${API_BASE_URL}/api/my-profile/`;

export default function Profile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = getCookie('token');
        if (!token) {
          router.push('/');
          return;
        }
  
        const response = await fetch(`${PROFILE_API_URL}${token}`, {
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
        setErrorMessage('Unable to fetch profile data. Please try again.');
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
                    <div className="flex justify-center">
                        <BackButton color={'text-white'}/>
                    </div>
                    <div className="flex justify-center">
                        <MobileMenu />
                    </div>
                </div>
                <div className="bg-white lg:min-h-screen rounded-t-[40px] flex-1 overflow-y-scrollp p-5 w-full">
                    <div className="px-4 py-2">
                      <div className="flex-2 items-center">
                      {isLoading ? (
                        <div className="animate-pulse">
                          <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center justify-center">
                              <img className="h-24 w-24 rounded-full" src="https://via.placeholder.com/150" alt="Profile Picture" />
                            </div>
                            <div className="mt-5 text-center sm:mt-6">
                              <h3 className="text-lg leading-6 font-medium text-gray-900">{dashboardData.name}</h3>
                              <p className="mt-2 text-sm rounded-lg text-white inline-block bg-gray-900 px-2 py-0.5 ">{dashboardData.role}</p>
                              <p className="mt-2 text-sm text-gray-500">{dashboardData.email}</p>
                            </div>
                          </div>
                          <div className="border-t border-gray-200">
                            <dl>
                              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Joined</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">-</dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                      ) : (
                        <>
                        <div className="px-4 py-5 sm:p-6">
                          <div className="flex items-center justify-center">
                            <img className="h-24 w-24 rounded-full" src="https://via.placeholder.com/150" alt="Profile Picture" />
                          </div>
                          <div className="mt-5 text-center sm:mt-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{dashboardData.name}</h3>
                            <p className="mt-2 text-sm rounded-lg text-white inline-block bg-gray-900 px-2 py-0.5 ">{dashboardData.role}</p>
                            <p className="mt-2 text-sm text-gray-500">{dashboardData.email}</p>
                          </div>
                        </div>
                        <div className="border-t border-gray-200">
                          <dl>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">Joined</dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">-</dd>
                            </div>
                          </dl>
                        </div>
                        {errorMessage && <p>{errorMessage}</p>}
                        </>
                      )}
                      </div>
                    </div>
                </div>
                <BottomNavbar dashboardData={dashboardData}/>
            </div>
        </div>
    </div>
    </>
  );
}
