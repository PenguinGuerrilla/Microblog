import React, { useContext, useEffect } from 'react';
import UserAvatar from './UserAvatar';
import { NavigationContext } from '../Contexts/NavigationContext';
import { AppContext } from '../Contexts/AppContext';
import { toast } from 'react-toastify';
import { CircleUserRound } from 'lucide-react';

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 ml-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const Header = ({ showAuthControls = false }) => {
  const { navigate } = useContext(NavigationContext);
  const { token, setToken } = useContext(AppContext);


  async function handleLogout() {
    try {
      await fetch('/api/logout', {
        method: 'post',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": 'Application-json'
        }
      });

      toast.success('Sessão encerrada.');
      setToken(null);
      navigate('/login');
    } catch (error) {
      toast.error(error.toString());
    }
  }

  return (
    <header className="p-4 md:p-6 flex justify-between items-center border-b border-[#1a382e]">
      <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
        <span className="font-semibold text-lg md:text-xl">Microblog</span>
        <ChevronDownIcon />
      </div>
      {showAuthControls && (
        <div className="flex items-center space-x-4">
          <button
            onClick={token ? handleLogout : () => navigate('/login')}
            className="px-4 py-2 bg-[#1a382e] hover:bg-[#2a4a3e] rounded-full text-[#e0f2e9] text-sm font-medium transition-colors duration-300"
          >
            {token ? "Logout" : "Login"}
          </button>
          <CircleUserRound/>
          {/* <UserAvatar src="https://via.placeholder.com/150/6ee7b7/122a21?text=ME" alt="Your Avatar" size="md" /> */}
        </div>
      )}
    </header>
  );
};

export default Header;
