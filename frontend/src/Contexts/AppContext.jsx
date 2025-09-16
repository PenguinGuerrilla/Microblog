import { createContext, useState } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [token, setTokenState] = useState(localStorage.getItem('token'));
    const [user, setUserState] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [theme, setTheme] = useState('dark');

    const setToken = (newToken) => {
        setTokenState(newToken);
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
            setUser(null); // Clear user when token is removed
        }
    };

    const setUser = (newUser) => {
        setUserState(newUser);
        if (newUser) {
            localStorage.setItem('user', JSON.stringify(newUser));
        } else {
            localStorage.removeItem('user');
        }
    }

    return (
        <AppContext.Provider value={{ token, setToken, user, setUser, theme, setTheme }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;