import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BackButton from './backbutton';
import MobileMenu from './mobilemenu';
import Select from 'react-select'


const DASHBOARD_API_URL = 'http://localhost:8080/api/my-profile/';
const API_URL = 'http://localhost:8080/api/surat-kelahiran/';

export default function Dashboard() {
  const router = useRouter();
  const [namaLengkap, setNamaLengkap] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [dilahirkanDi, setDilahirkanDi] = useState('');
  const [kelahiranKe, setKelahiranKe] = useState('');
  const [anakKe, setAnakKe] = useState('');
  const [penolongKelahiran, setPenolongKelahiran] = useState('');
  const [alamatAnak, setAlamatAnak] = useState('');
  const [nik, setNik] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const author = dashboardData.email;
      const formData = new FormData();
      formData.append('nama_lengkap', namaLengkap);
      formData.append('jenis_kelamin', jenisKelamin);
      formData.append('dilahirkan_di', dilahirkanDi);
      formData.append('kelahiran_ke', kelahiranKe);
      formData.append('anak_ke', anakKe);
      formData.append('penolong_kelahiran', penolongKelahiran);
      formData.append('alamat_anak', alamatAnak);
      formData.append('nik', nik);
      formData.append('author', author);
  
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
  
      if (response.status === 401) {
        setErrorMessage('Unauthorized.');
      }
  
      const data = await response.json();
      console.log(data.status)
      if (data.status == '201') {
        setSuccessMessage('Success mengirim surat.');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else if (data.status == '403') {
        setErrorMessage('Anda telah malakukan pengiriman surat.');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    } catch (error) {
      setErrorMessage('Upps terjadi error. Silahkan coba lagi.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };  

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
    fetchDashboardData();
  }, [router]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => { 
      localStorage.removeItem('token');
      router.push('/');
    }, 3000);
  };

  const options = [
    { value: 'laki-laki', label: 'Laki-laki' },
    { value: 'perempuan', label: 'Perempuan' },
  ]

  const handleSelectChange = (option) => {
    setJenisKelamin(option.value)
  }
  return (
    <>
      <div className="flex justify-center items-center bg-gray-300">
        <div className="bg-gray-900 bg-cover flex justify-center items-center w-full max-w-md">
            <div className="w-full max-w-md">
                <div className="flex items-center justify-between py-10 px-4">
                    <h1 className="text-white text-4xl font-bold">Surat App</h1>
                    <div className="flex justify-center">
                      <BackButton color={'text-white'}/>
                      <MobileMenu Logout={handleLogout}/>
                    </div>
                </div>
                <div className="bg-white rounded-t-[40px] flex-1 min-h-screen overflow-y-scrollp p-5 w-full">
                    <form onSubmit={handleFormSubmit} className="p-6 w-full">
                      <h2 className="text-xl font-bold mb-6">Surat Kelahiran</h2>
                      {errorMessage && <p className="bg-red-500 rounded-lg text-white text-center p-2 m-5 transition-opacity">{errorMessage}</p>}
                      {successMessage && <p className="animate-pulse bg-green-500 rounded-lg text-white text-center p-2 m-5 transition-opacity">{successMessage}</p>}
                      <div className="mb-2">
                          <label className="block text-gray-700 font-bold mb-2" htmlFor="input">
                              Nama Lengkap
                          </label>
                          <input
                              type="text"
                              value={namaLengkap}
                              onChange={(event) => setNamaLengkap(event.target.value)}
                              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              placeholder="Nama Lengkap"
                              required
                          />
                      </div>
                      <div className="mb-2">
                          <label className="block text-gray-700 font-bold mb-2" htmlFor="input">
                              NIK
                          </label>
                          <input
                              type="number"
                              value={nik}
                              onChange={(event) => setNik(event.target.value)}
                              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              placeholder="NIK"
                              required
                          />
                      </div>
                      <div className="mb-2">
                          <label className="block text-gray-700 font-bold mb-2" htmlFor="select">
                              Jenis Kelamin
                          </label>
                          <Select 
                            options={options} 
                            value={jenisKelamin} 
                            onChange={handleSelectChange} 
                          />
                      </div>
                      <div className="mb-2">
                          <label className="block text-gray-700 font-bold mb-2" htmlFor="input">
                              Dilahirkan di
                          </label>
                          <textarea
                              type="text"
                              value={dilahirkanDi}
                              onChange={(event) => setDilahirkanDi(event.target.value)}
                              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              placeholder="Dilahirkan di rumah sakit"
                              required
                          ></textarea>
                      </div>
                      <div className="mb-2">
                          <label className="block text-gray-700 font-bold mb-2" htmlFor="input">
                              Kelahiran ke
                          </label>
                          <input
                              type="number"
                              value={kelahiranKe}
                              onChange={(event) => setKelahiranKe(event.target.value)}
                              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              placeholder="Kelahiran ke 1"
                              required
                          />
                      </div>
                      <div className="mb-2">
                          <label className="block text-gray-700 font-bold mb-2" htmlFor="input">
                              Anak ke
                          </label>
                          <input
                              type="number"
                              value={anakKe}
                              onChange={(event) => setAnakKe(event.target.value)}
                              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              placeholder="Anak ke 1"
                              required
                          />
                      </div>
                      <div className="mb-2">
                          <label className="block text-gray-700 font-bold mb-2" htmlFor="input">
                              Penolong Kelahiran
                          </label>
                          <input
                              type="text"
                              value={penolongKelahiran}
                              onChange={(event) => setPenolongKelahiran(event.target.value)}
                              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              placeholder="Bidan Ajeng"
                              required
                          />
                      </div>
                      <div className="mb-2">
                          <label className="block text-gray-700 font-bold mb-2" htmlFor="input">
                              Alamat
                          </label>
                          <textarea
                              type="text"
                              value={alamatAnak}
                              onChange={(event) => setAlamatAnak(event.target.value)}
                              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              placeholder="Jl. Tempat tinggal"
                              required
                          ></textarea>
                      </div>
                      <div className="flex justify-between items-center">
                          <button
                              className={`rounded-lg w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                              isLoading ? 'opacity-50 cursor-wait' : ''
                              }`}
                              type="submit"
                              disabled={isLoading}
                          >
                              {isLoading ? (
                              <svg
                                  className="animate-spin h-5 w-5 mr-3 inline-block text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                              >
                                  <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  ></circle>
                                  <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v-4a4 4 0 004-4h4zm-2-5.291A7.962 7.962 0 0120 12h4c0-3.042-1.135-5.824-3-7.938l-3 2.647z"
                                  ></path>
                              </svg>
                              ) : (
                              'Buat Surat'
                              )}
                          </button>
                      </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}
