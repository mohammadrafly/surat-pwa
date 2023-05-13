import dynamic from 'next/dynamic';

const BottomNavbar = dynamic(() => import('./bottomnavbar'), {
  ssr: false
});

export default BottomNavbar;
