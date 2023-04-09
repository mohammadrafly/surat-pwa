import React from 'react';

const Item = ({ name, created_at, status, disposisi }) => {
  return (
    <div className="w-full w-1/2 p-2 bg-white shadow-md rounded-md p-4 my-4">
      <div className="flex items-center">
        <div className="ml-4">
          <h4 className="text-lg font-medium">{name}</h4>
          <p className="text-gray-500">Date: {created_at}</p>
          {status && (
            <div className="mt-2">
              <p className="text-xs">Status Tanda Tangan:
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status === 'no' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'} mx-2`}>
                    {status}
                </span> 
              </p>
              <p className="text-xs">Disposisi:
                <span className="items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-900 mx-2">
                    {disposisi}
                </span> 
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
