import { createContext, useState } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [token, setTokenState] = useState(localStorage.getItem('token'));
    const [theme, setTheme] = useState('dark');

    const setToken = (newToken) => {
        setTokenState(newToken);
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
        }
    };

    return (
        <AppContext.Provider value={{ token, setToken, theme, setTheme }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
