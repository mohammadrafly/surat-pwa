import React, { useState } from 'react';
import { getCookie } from '../helper/Cookie';
import Detail from './details';

const Item = ({ id, name, created_at, status, disposisi, nik, link}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemDetail, setItemDetail] = useState(null);

  const handleOpenModal = async () => {
    const token = getCookie('token');
    const response = await fetch(link + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    setItemDetail(data);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    
  }

  const handleCloseModal = () => {
    setItemDetail(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full w-1/2 p-2 bg-white shadow-md rounded-md p-4 my-4">
        <div className="flex items-center">
          <div className="ml-4">
            <h4 className="text-lg font-medium">{name}</h4>
            <h4 className="text-lg font-medium">{nik}</h4>
            <p className="text-gray-500">Date: {created_at}</p>
            {status && (
              <div className="mt-2">
                <p className="text-xs">
                  Status Tanda Tangan:
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      status === 'no'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    } mx-2`}
                  >
                    {status}
                  </span>
                </p>
                <p className="text-xs">
                  Disposisi:
                  <span className="items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-900 mx-2">
                    {disposisi}
                  </span>
                </p>
              </div>
            )}
          </div>
          <button className="ml-auto inline-block bg-gray-200 p-2 rounded-lg" onClick={handleOpenModal}>
            Detail
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {itemDetail ? (
                  <>
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center" >
                        <Detail itemDetail={itemDetail} />
                      </div>
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          onClick={handleSave}
                          className="bg-blue-500 mb-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="bg-red-500 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
      );
    };   
export default Item;