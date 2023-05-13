import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from '../../components/helper/Cookie';
import BackButton from '../components/backbutton';
import BottomNavbar from '../components/bottomnavbar';
import Select from 'react-select';
import apiEndpoints from '../../../config';
import MobileMenu from '../components/mobilemenu';

export default function Dashboard() {
  const router = useRouter();
  const [inputValues, setInputValues] = useState({
    author: '',
    nama_lengkap: '',
    jenis_kelamin: '',
    dilahirkan_di: '',
    kelahiran_ke: '',
    anak_ke: '',
    penolong_kelahiran: '',
    alamat_anak: '',
    nik: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});

  const handleChange = (event) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSelectChange = (option) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      jenis_kelamin: option.value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const token = getCookie('token');
      const author = dashboardData.email;
      const response = await fetch(apiEndpoints.dashboard.surat.kelahiran, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(inputValues),
      });

      if (response.status === 401) {
        setErrorMessage('Unauthorized.');
      }

      const { status } = await response.json();
      if (status === true) {
        setSuccessMessage('Success mengirim surat.');
        setTimeout(() => setSuccessMessage(null), 5000);
      } else if (status === '403') {
        setErrorMessage('Anda telah malakukan pengiriman surat.');
        setTimeout(() => setErrorMessage(null), 5000);
      }
    } catch (error) {
      setErrorMessage('Upps terjadi error. Silahkan coba lagi.');
      setTimeout(() => setErrorMessage(null), 5000);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const token = getCookie('token');
    if (!token) router.push('/');

    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${apiEndpoints.dashboard.myProfile}${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setDashboardData(data);
        setInputValues((prevValues) => ({
          ...prevValues,
          author: data.email,
        }));
        setIsLoading(false);
      } catch (error) {
        console.error('An error occurred:', error);
        setErrorMessage('Unable to fetch dashboard data. Please try again.');
      }
    };

    fetchDashboardData();
  }, []);

  const options = [
    { value: 'laki-laki', label: 'Laki-laki' },
    { value: 'perempuan', label: 'Perempuan' },
  ];
  
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
                <div className="bg-white rounded-t-[40px] flex-1 min-h-screen overflow-y-scrollp p-5 mb-20 w-full">
                <form onSubmit={handleFormSubmit} className="p-6 w-full">
                  <h2 className="text-xl font-bold mb-6">Surat Kelahiran</h2>
                  {errorMessage && (
                    <p className="bg-red-500 rounded-lg text-white text-center p-2 m-5 transition-opacity">
                      {errorMessage}
                    </p>
                  )}
                  {successMessage && (
                    <p className="animate-pulse bg-green-500 rounded-lg text-white text-center p-2 m-5 transition-opacity">
                      {successMessage}
                    </p>
                  )}
                  <div className="mb-2">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="input">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      name="nama_lengkap"
                      value={inputValues.nama_lengkap}
                      onChange={handleChange}
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
                      name="nik"
                      value={inputValues.nik}
                      onChange={handleChange}
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
                      name="jenis_kelamin"
                      value={inputValues.jenis_kelamin}
                      onChange={handleSelectChange}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="input">
                      Dilahirkan di
                    </label>
                    <textarea
                      type="text"
                      name="dilahirkan_di"
                      value={inputValues.dilahirkan_di}
                      onChange={handleChange}
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
                      name="kelahiran_ke"
                      value={inputValues.kelahiran_ke}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Kelahiran ke 1"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="input">
                      Penolong Kelahiran
                    </label>
                    <input
                      type="text"
                      name="penolong_kelahiran"
                      value={inputValues.penolong_kelahiran}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Penolong Kelahiran"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="input">
                      Alamat Anak
                    </label>
                    <textarea
                      type="text"
                      name="alamat_anak"
                      value={inputValues.alamat_anak}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Alamat"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-2">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                </form>
                </div>
                <BottomNavbar dashboardData={dashboardData}/>
            </div>
        </div>
    </div>
    </>
  );
}
