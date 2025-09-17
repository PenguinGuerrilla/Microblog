import React, { useContext, useState } from 'react';
import { NavigationContext } from '../Contexts/NavigationContext';
import { AppContext } from '../Contexts/AppContext';
import LoaderPages from './LoaderPages/LoaderPages';
import handleLogout from '../Utils/handleLogout';

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
  const { user, token, setToken } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  return (
    <>
    {loading && <LoaderPages/>}
    <header className="p-4 md:p-6 flex justify-between items-center border-b border-[#1a382e]">
      <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
        <img
          src={"/logo.svg"}
          className="w-5 h-5 rounded-full mt-2 mr-3"
        />
        <span className="font-semibold text-lg md:text-xl">Microblog</span>
      </div>
      {showAuthControls && (
        <div className="flex items-center space-x-4">
          <button
            onClick={token ? () => handleLogout(setLoading,token,setToken,navigate) : () => navigate('/login')}
            className="px-4 py-2 bg-[#1a382e] hover:bg-[#2a4a3e] rounded-full text-[#e0f2e9] text-sm font-medium transition-colors duration-300"
          >
            {token ? "Logout" : "Login"}
          </button>
          {user &&
            <div className="flex items-center space-x-4 ">
              <img
                src={user.gravatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
            </div>
          }
        </div>
      )}
    </header>
    </>

  );
};

export default Header;
