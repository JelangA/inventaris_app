import { createContext, setStateAction, useContext, useState } from 'react';

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        nama: 'Rio Agasta',
        tipe_user: 'admin'  
    });
    const [token, _setToken] = useState(sessionStorage.getItem('token'));

    const setToken = (token) => {
        _setToken(token);
        if(token) {
            sessionStorage.setItem('token', token);
        } else {
            sessionStorage.removeItem('token');
        }
    }

    return (
        <StateContext.Provider value={{ user, token, setUser, setToken}}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);