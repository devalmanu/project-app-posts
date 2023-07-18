import React, {useContext} from 'react';
import classes from './Navbar.module.css';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    /* при клике на кнопку Выйти удалять запить из localStorage*/
    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }

    return (
        <header className="header">
            <div className="header__container">
                <MyButton onClick={logout}>
                    Выйти
                </MyButton>
                <div className={classes.navbar}>
                    <div className={classes.navbar__links}>
                        <Link to="/about">О нас</Link>
                        <Link to="/posts">Посты</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;