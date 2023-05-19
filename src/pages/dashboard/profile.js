import { useState, useEffect } from 'react';
import BackButton from '../components/backbutton';
import MobileMenu from '../components/mobilemenu';
import BottomNavbar from '../components/BottomNavbarNoSSR';
import { getCookieByKey } from '../../components/helper/Cookie';

export default function Profile() {
  const [dashboardData, setDashboardData] = useState({});
  useEffect(() => {
    const fetchData = () => {
      const data = {
        name: getCookieByKey('name'),
        role: getCookieByKey('role'),
        email: getCookieByKey('email'),
      };
  
      setDashboardData(data);
    };
  
    fetchData();
  }, []);
  
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
