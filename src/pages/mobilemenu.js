import { useState } from 'react'

const MobileMenu = ({ Logout }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
      >
        <svg class="h-10 w-10 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="4" width="6" height="6" rx="1" />  <rect x="14" y="4" width="6" height="6" rx="1" />  <rect x="4" y="14" width="6" height="6" rx="1" />  <rect x="14" y="14" width="6" height="6" rx="1" /></svg>
      </button>

      <div
        className={`${
          isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
        } md:hidden bg-blue-500 fixed top-0 left-0 w-1/2 h-full z-10 transition-transform duration-300`}
      >
        <div className="flex flex-col h-full justify-center items-center">
          <button onClick={Logout}>
            <p className="text-white font-medium text-xl mb-4">Logout</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
