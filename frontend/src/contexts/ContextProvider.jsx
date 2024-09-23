import { createContext, setStateAction, useContext, useState } from 'react';

const StateContext = createContext({
    user: null,
    token: null,
    barang: [],
    ruangan: [],
    jurusan: [],
    lemari: [],
    penempatan: [],
    setUser: () => {},
    setToken: () => {},
    setBarang: () => {},
    setRuangan: () => {},
    setJurusan: () => {},
    setLemari: () => {},
    setPenempatan: () => {}
});

export const ContextProvider = ({ children }) => {
    const [user, _setUser] = useState(sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null);
    const [token, _setToken] = useState(sessionStorage.getItem('token'));
    const [barang, setBarang] = useState([]);
    const [ruangan, setRuangan] = useState([]);
    const [jurusan, setJurusan] = useState([]);
    const [lemari, setLemari] = useState([]);
    const [penempatan, setPenempatan] = useState([]);

    const setUser = (user) => {
        _setUser(user);
        if(user) {
            let User = {
                id: user.id,
                name: user.name,
                username: user.username,
                tipe_user: user.tipe_user,
                no_hp: user.no_hp,
                id_jurusan: user.id_jurusan
            }
            sessionStorage.setItem('user', JSON.stringify(User));
        } else {
            sessionStorage.removeItem('user');
        }
    }

    const setToken = (token) => {
        _setToken(token);
        if(token) {
            sessionStorage.setItem('token', token);
        } else {
            sessionStorage.removeItem('token');
        }
    }

    return (
        <StateContext.Provider value={{ user, token, barang, jurusan, ruangan, lemari, penempatan, setUser, setToken, setBarang, setJurusan, setRuangan, setLemari, setPenempatan }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);