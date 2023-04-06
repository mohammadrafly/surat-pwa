import React from 'react';
import { useRouter } from 'next/router';

function BackButton() {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };
  return (
    <div className="mr-3">
      <button className="text-white font-bold rounded-lg" onClick={handleClick}>
        <svg class="h-10 w-10 text-gray-100"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="15 18 9 12 15 6" /></svg>
      </button>
    </div>
  );
}

export default BackButton;
