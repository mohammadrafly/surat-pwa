import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from '../helper/Cookie';
import BackButton from '../components/backbutton';
import BottomNavbar from '../components/bottomnavbar';
import API_BASE_URL from '../../../config';
import MobileMenu from '../components/mobilemenu';

const PROFILE_API_URL = `${API_BASE_URL}/api/my-profile/`;

export default function CreateSurat() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({});

  const items = [
    {
      id: 1,
      title: 'Surat Kelahiran',
      link: '/create/surat-kelahiran',
    },
    {
      id: 2,
      title: 'Surat Kematian',
      link: '/create/surat-kematian',
    },
    {
      id: 3,
      title: 'Surat Keterangan Belum Pernah Menikah',
      link: '/create/surat-keterangan-bpm',
    },
    {
      id: 4,
      title: 'Surat Keterangan Penghasilan',
      link: '/create/surat-keterangan-penghasilan',
    },
    {
      id: 5,
      title: 'Surat Keterangan SKCK',
      link: '/create/surat-keterangan-skck',
    },
    {
      id: 6,
      title: 'Surat Keterangan Tidak Mampu',
      link: '/create/surat-keterangan-tm',
    },
    {
      id: 7,
      title: 'Surat Keterangan Wali',
      link: '/create/surat-keterangan-wali',
    },
    {
      id: 8,
      title: 'Surat Pengantar Nikah',
      link: '/create/surat-pengantar-nikah',
    },
    {
      id: 9,
      title: 'Surat Pengantar Permohonan KTP',
      link: '/create/surat-pengantar-permohonan-ktp',
    },
    {
      id: 10,
      title: 'Surat Permohonan KK',
      link: '/create/surat-permohonan-kk',
    },
    {
      id: 11,
      title: 'Surat Permohonan KTP',
      link: '/create/surat-permohonan-ktp',
    },
    {
      id: 12,
      title: 'Surat Pernyataan',
      link: '/create/surat-pernyataan',
    },
  ];

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
        setErrorMessage('Unable to fetch createSurat data. Please try again.');
      } finally {
        
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
                    <div className="flex flex-wrap px-4 py-2 mb-5">
                      <h1 className="font-bold">Buat Surat</h1>
                      {items.map((item) => (
                          <a key={item.id} href={item.link} className="w-full w-1/2 p-2 mb-3">
                            <div className="bg-white rounded-[20px] shadow-md p-4 flex items-center">
                                <span className="text-blue-500 mr-2">
                                    <svg className="h-24 w-24 text-gray-900"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />  <line x1="8" y1="8" x2="12" y2="8" />  <line x1="8" y1="12" x2="12" y2="12" />  <line x1="8" y1="16" x2="12" y2="16" /></svg>
                                </span>
                                <div>
                                    <h2 className="text-gray-800 text-lg font-medium">{item.title}</h2>
                                </div>
                            </div>
                          </a>
                      ))} 
                    </div>
                </div>
                <BottomNavbar dashboardData={dashboardData}/>
            </div>
        </div>
    </div>
    </>
  );
}
