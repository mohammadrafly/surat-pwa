import React from 'react';
import { useRouter } from 'next/router';

function BackButton({ color }) {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };
  
  return (
    <div className="item-center text-center">
      <button className={`font-bold ${color}`} onClick={handleClick} type="button">
        <svg className={`h-10 w-10 ${color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
    </div>
  );
}

export default BackButton;
