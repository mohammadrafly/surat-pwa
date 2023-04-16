import React, { useState } from 'react';
import { getCookie } from '../helper/Cookie';
import axios from 'axios';
import API_BASE_URL from '../../../config';

const Detail = ({ itemDetail }) => {
  const [statusTtd, setStatusTtd] = useState(itemDetail.status_ttd);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusTtdChange = async () => {
    setIsUpdating(true);
    const newStatusTtd = statusTtd === 'yes' ? 'no' : 'yes';
    setStatusTtd(newStatusTtd);
    try {
        const token = getCookie('token');
        const response = await axios.post(`${API_BASE_URL}/api/single/surat/update`, {
            id: itemDetail.id,
            status_ttd: newStatusTtd,
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        setIsUpdating(false);
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
  };


  return (
    <div className="bg-white p-4">
      <div className="flex items-center">
        <div className="flex-1">
          <h3 className="text-2xl leading-6 font-medium text-gray-900">
            {itemDetail.nik}
          </h3>
          <h3 className="text-2xl leading-6 font-medium text-gray-900">
            {itemDetail.nama_lengkap}
          </h3>
          <div className="mt-2 text-sm text-gray-500">
            Date: {itemDetail.created_at}
          </div>
          {itemDetail.status_ttd && (
            <div className="mt-2 text-lg">
              <p>
                Dilahirkan di:{' '}
                <span className="inline-block bg-gray-100 rounded-full px-2 py-1 font-medium text-gray-900 mx-2">
                  {itemDetail.dilahirkan_di}
                </span>
              </p>
              <p>
                Kelahiran ke:{' '}
                <span className="inline-block bg-gray-100 rounded-full px-2 py-1 font-medium text-gray-900 mx-2">
                  {itemDetail.kelahiran_ke}
                </span>
              </p>
              <p>
                Anak ke:{' '}
                <span className="inline-block bg-gray-100 rounded-full px-2 py-1 font-medium text-gray-900 mx-2">
                  {itemDetail.anak_ke}
                </span>
              </p>
              <p>
                Penolong Kelahiran:{' '}
                <span className="inline-block bg-gray-100 rounded-full px-2 py-1 font-medium text-gray-900 mx-2">
                  {itemDetail.penolong_kelahiran}
                </span>
              </p>
              <p>
                Alamat:{' '}
                <span className="inline-block bg-gray-100 rounded-full px-2 py-1 font-medium text-gray-900 mx-2">
                  {itemDetail.alamat_anak}
                </span>
              </p>
              <p>
                Jenis Kelamin:{' '}
                <span className="inline-block bg-gray-100 rounded-full px-2 py-1 font-medium text-gray-900 mx-2">
                  {itemDetail.jenis_kelamin}
                </span>
              </p>
              <p>
                Disposisi:{' '}
                <span className="inline-block bg-gray-100 rounded-full px-2 py-1 font-medium text-gray-900 mx-2">
                  {itemDetail.disposisi_surat}
                </span>
              </p>
              <p>
                Status Tanda Tangan:{' '}
                {isUpdating ? (
                  <span className="">
                    Updating...
                  </span>
                  ) : (
                  <button
                    className={`${statusTtd === 'yes' ? 'bg-green-500' : 'bg-red-500' } text-white font-bold py-2 px-4 rounded`}
                    onClick={handleStatusTtdChange}
                  >
                    {statusTtd === 'yes' ? 'Signed' : 'Not Signed'}
                  </button>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export default Detail;
