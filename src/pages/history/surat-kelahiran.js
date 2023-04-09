import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from '../helper/Cookie';
import BackButton from '../components/backbutton';
import BottomNavbar from '../components/bottomnavbar';
import Item from '../components/item';
import API_BASE_URL from '../../../config';

const HISTORYSURATKELAHIRAN_API_URL = `${API_BASE_URL}/api/my-profile/`;
const HISTORYSURAT_KELAHIRAN = `${API_BASE_URL}/api/surat-kelahiran`;

export default function HistorySuratKelahiran() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({});
  const [kelahiranData, setKelahiranData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchHistorySuratKelahiran = async () => {
      try {
        const token = getCookie('token');
        const response = await fetch(HISTORYSURAT_KELAHIRAN, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
    
        const data = await response.json();
        if (Array.isArray(data)) {
          console.log(data);
          setKelahiranData(data);
        } else {
          console.error('Invalid response data:', data);
        }
      } catch (error) {
        console.error('An error occurred:', error);
        setErrorMessage('Unable to fetch historySuratKelahiran data. Please try again.');
      }
    };

    const fetchDashboardData = async () => {
      try {
        const token = getCookie('token');
        if (!token) {
          router.push('/');
          return;
        }
  
        const response = await fetch(`${HISTORYSURATKELAHIRAN_API_URL}${token}`, {
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
    fetchHistorySuratKelahiran();
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
                <div className="bg-white lg:min-h-screen rounded-t-[40px] flex-1 overflow-y-scrollp p-5 w-full">
                    <div className="flex flex-wrap px-4 py-2">
                      <h1 className="text-gray-900 font-semibold">Riwayat Surat Kelahiran</h1>
                      {kelahiranData.map((item) => (
                        <Item key={item.id} name={item.nama_lengkap} created_at={item.created_at} status={item.status_ttd} disposisi={item.disposisi_surat}/>
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
