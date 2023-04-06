import { useEffect, useState, useCallback } from 'react';
import { useSession, getSession } from "next-auth/client";
import { useRouter } from 'next/router';
import BackButton from './backbutton';
import MobileMenu from './mobilemenu';

const DASHBOARD_API_URL = 'http://localhost:8080/api/my-profile/';

export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  
    return {
      props: {},
    };
  }

function Dashboard() {
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
            <h1 className="text-white text-lg font-bold">Surat App</h1>
            <div className="flex justify-center">
                <BackButton />
                <MobileMenu Logout={handleLogout}/>
            </div>
        </div>
        <div className="p-5 text-white">
            {refreshing && <div>Refreshing...</div>}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                <h1 className="text-2xl font-semibold mb-6">{dashboardData.name}</h1>
                {errorMessage && <p>{errorMessage}</p>}
                </>
            )}
        </div>
        <div className="bg-white rounded-t-[40px] flex-1 overflow-y-scrollp p-5">
            <div className="flex flex-wrap px-4 py-2">
                <a href="/surat-kelahiran" className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-gray-800 text-lg font-medium">Surat Kelahiran</h2>
                        <p className="text-gray-500 mt-2">Permohonan untuk surat kelahiran.</p>
                    </div>
                </a>

                <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                    <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-gray-800 text-lg font-medium">Card 2</h2>
                    <p className="text-gray-500 mt-2">This is the content for Card 2.</p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                    <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-gray-800 text-lg font-medium">Card 3</h2>
                    <p className="text-gray-500 mt-2">This is the content for Card 3.</p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                    <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-gray-800 text-lg font-medium">Card 4</h2>
                    <p className="text-gray-500 mt-2">This is the content for Card 4.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default Dashboard;