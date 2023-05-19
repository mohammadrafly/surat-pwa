import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookieByKey } from '../../components/helper/Cookie';
import BackButton from '../components/backbutton';
import BottomNavbar from '../components/BottomNavbarNoSSR';
import Item from '../components/item';
import apiEndpoints from '../../../config';
import MobileMenu from '../components/mobilemenu';

export default function HistorySuratKelahiran() {
  const router = useRouter();
  const [kelahiranData, setKelahiranData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchHistorySuratKelahiran = async () => {
      try {
        const role = getCookieByKey('role');
        const token = getCookieByKey('token');
        let url = '';
  
        if (role === 'admin') {
          url = `${apiEndpoints.dashboard.surat.kelahiran}`;
        } else {
          const email = getCookieByKey('email');
          url = `${apiEndpoints.dashboard.surat.kelahiran}${email}`;
        }
  
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        setKelahiranData(data);
      } catch (error) {
        console.error('An error occurred:', error);
        setErrorMessage('Unable to fetch kelahiran data. Please try again.');
      }
    };
  
    fetchHistorySuratKelahiran();
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
                      <h1 className="text-gray-900 font-semibold">Riwayat Surat Kelahiran</h1>
                      {kelahiranData.map((item) => (
                        <Item 
                          key={item.id} 
                          nik={item.nik} 
                          id={item.id} 
                          name={item.nama_lengkap} 
                          created_at={item.created_at} 
                          status={item.status_ttd} 
                          disposisi={item.disposisi_surat}
                          link={apiEndpoints.dashboard.surat.kelahiranSingle}
                        />
                      ))}
                      {errorMessage && (
                        <p className="text-red-500">{errorMessage}</p>
                      )}
                    </div>
                </div>
                <BottomNavbar/>
            </div>
        </div>
    </div>
    </>
  );
}
