import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie, getCookieByKey } from '../helper/Cookie';
import BackButton from '../components/backbutton';
import BottomNavbar from '../components/BottomNavbarNoSSR';
import apiEndpoints from '../../../config';
import MobileMenu from '../components/mobilemenu';

export default function RiwayatSurat() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({});

  const items = [
    {
      id: 1,
      title: 'Surat Kelahiran',
      link: '/history/surat-kelahiran',
    },
    {
      id: 2,
      title: 'Surat Kematian',
      link: '/history/surat-kematian',
    },
    {
      id: 3,
      title: 'Surat Keterangan Belum Pernah Menikah',
      link: '/history/surat-keterangan-bpm',
    },
    {
      id: 4,
      title: 'Surat Keterangan Penghasilan',
      link: '/history/surat-keterangan-penghasilan',
    },
    {
      id: 5,
      title: 'Surat Keterangan SKCK',
      link: '/history/surat-keterangan-skck',
    },
    {
      id: 6,
      title: 'Surat Keterangan Tidak Mampu',
      link: '/history/surat-keterangan-tm',
    },
    {
      id: 7,
      title: 'Surat Keterangan Wali',
      link: '/history/surat-keterangan-wali',
    },
    {
      id: 8,
      title: 'Surat Pengantar Nikah',
      link: '/history/surat-pengantar-nikah',
    },
    {
      id: 9,
      title: 'Surat Pengantar Permohonan KTP',
      link: '/history/surat-pengantar-permohonan-ktp',
    },
    {
      id: 10,
      title: 'Surat Permohonan KK',
      link: '/history/surat-permohonan-kk',
    },
    {
      id: 11,
      title: 'Surat Permohonan KTP',
      link: '/history/surat-permohonan-ktp',
    },
    {
      id: 12,
      title: 'Surat Pernyataan',
      link: '/history/surat-pernyataan',
    },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = getCookieByKey('token');
        if (!token) {
          router.push('/');
          return;
        }
  
        const response = await fetch(`${apiEndpoints.dashboard.myProfile}${token}`, {
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
        setErrorMessage('Unable to fetch data. Please try again.');
      } finally {

      }
    };
  
    const timeoutId = setTimeout(() => {
      fetchDashboardData();
    }, 0);
  
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
                    <div className="flex flex-wrap px-4 py-2">
                      <h1 className="font-bold"> Riwayat Surat</h1>
                        {items.map((item) => (
                            <a key={item.id} href={item.link} className="w-full w-1/2 p-2">
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
