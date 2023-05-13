import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from '../../components/helper/Cookie';
import BackButton from '../components/backbutton';
import BottomNavbar from '../components/bottomnavbar';
import Item from '../components/item';
import API_BASE_URL from '../../../config';
import MobileMenu from '../components/mobilemenu';

const PROFILE = `${API_BASE_URL}/api/my-profile/`;
const RIWAYAT = `${API_BASE_URL}/api/surat-kematian`;

export default function HistorySurat() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({});
  const [Data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchHistorySurat = async () => {
      try {
        const token = getCookie('token');
        const response = await fetch(RIWAYAT, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
    
        const data = await response.json();
        if (Array.isArray(data)) {
          console.log(data);
          setData(data);
        } else {
          console.error('Invalid response data:', data);
        }
      } catch (error) {
        console.error('An error occurred:', error);
        setErrorMessage('Unable to fetch historySurat data. Please try again.');
      }
    };

    const fetchDashboardData = async () => {
      try {
        const token = getCookie('token');
        if (!token) {
          router.push('/');
          return;
        }
  
        const response = await fetch(`${PROFILE}${token}`, {
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
      }
    };
  
    fetchDashboardData();
    fetchHistorySurat();
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
                    <div className="flex flex-wrap px-4 py-2">
                      <h1 className="text-gray-900 font-semibold">Riwayat Surat Kematian</h1>
                      {Data.map((item) => (
                        <Item 
                          key={item.id} 
                          nik={item.nik} 
                          id={item.id} 
                          name={item.nama_lengkap} 
                          created_at={item.created_at} 
                          status={item.status_ttd} 
                          disposisi={item.disposisi_surat}
                          link={`${API_BASE_URL}/api/single/surat/kematian/`}
                        />
                      ))}
                      {errorMessage && (
                        <p className="text-red-500">{errorMessage}</p>
                      )}
                    </div>
                </div>
                <BottomNavbar dashboardData={dashboardData}/>
            </div>
        </div>
    </div>
    </>
  );
}
