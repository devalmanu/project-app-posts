import React, {useEffect, useState} from 'react';
import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/UI/navbar/Navbar";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";


function App() {
    const [isAuth, setIsAuth] = useState(false);
    /* состояние с индикацией о том закончился запрос или нет*/
    const [isLoading, setLoading] = useState(true);

    /* при первом запуске приложения будем проверять автоизован/неавторизован пользователь*/
    useEffect(() => {
        /* сохраняем в localStorage и проверяем по ключу auth */
        if (localStorage.getItem('auth')) {
            /* меняем состояние по умолчанию false на true*/
            setIsAuth(true)
        }
        /* убираем индикацию загрузки */
        setLoading(false);
    }, [])


    return  (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;
