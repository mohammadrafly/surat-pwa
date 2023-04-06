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
        <svg class="h-10 w-10 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="4" width="6" height="6" rx="1" />  <rect x="14" y="4" width="6" height="6" rx="1" />  <rect x="4" y="14" width="6" height="6" rx="1" />  <rect x="14" y="14" width="6" height="6" rx="1" /></svg>
      </button>

      <div
        className={`${
          isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
        } md:hidden bg-gray-800 fixed top-0 left-0 w-1/2 h-full z-10 transition-transform duration-300`}
      >
        <div className="flex flex-col h-full justify-center items-center">
          <button onClick={Logout} className="flex items-center justify-center">
            <svg class="h-7 w-7 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
            <p className="text-white font-medium text-xl">Logout</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
