import React from 'react';
import { useRouter } from 'next/router';

function BackButton() {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };
  return (
    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg" onClick={handleClick}>Back</button>
  );
}

export default BackButton;
