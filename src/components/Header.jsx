import React, { useState } from 'react';
import logo from "..//img/header-logo.png";
import {BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSearch, setSearchText, clearItems} from '../actions/actionCreators';

function Header() {
    const [searchFieldvalue, setsearchFieldvalue] = useState('');
    const [searchWidgetVisability, setSearchWidgetVisability] = useState(false);
    const handleChange = (event) => {
        const {value} = event.target;
        setsearchFieldvalue(value);
    };
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state.cart);
    const history = useHistory();

  return (
    <header className="container">
        <div className="row">
            <div className="col">
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Bosa Noga" />
                    </Link>

                    <div className="collapase navbar-collapse" id="navbarMain">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Главная</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/catalog">Каталог</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">О магазине</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contacts">Контакты</Link>
                            </li>
                        </ul>
                        <div>
                        <div className="header-controls-pics">
                            <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={(event) => {
                                event.preventDefault();
                                if (searchFieldvalue === '') {
                                    searchWidgetVisability ? setSearchWidgetVisability(false) : setSearchWidgetVisability(true);
                                } else {  
                                    dispatch(setSearchText(searchFieldvalue));
                                    dispatch(fetchSearch(searchFieldvalue));
                                    setsearchFieldvalue('');
                                    dispatch(clearItems());
                                    history.push('/catalog');                                
                                }

                            }}></div>
                                <div className="header-controls-pic header-controls-cart">
                                    {cart.length > 0 && <div className="header-controls-cart-full">{cart.length}</div>}
                                    <div className="header-controls-cart-menu"></div>
                                    <Link className="cart_link" to="/cart"></Link>
                                </div>
                            </div>
                            <form data-id="search-form" className={searchWidgetVisability ? "header-controls-search-form form-inline" : "header-controls-search-form form-inline invisible"}
                            onSubmit={(event) => {
                                event.preventDefault();
                                if (searchFieldvalue === '') {
                                    searchWidgetVisability ? setSearchWidgetVisability(false) : setSearchWidgetVisability(true);
                                } else {
                                    dispatch(setSearchText(searchFieldvalue));
                                    dispatch(fetchSearch(searchFieldvalue));
                                    setsearchFieldvalue('');
                                    dispatch(clearItems());
                                    history.push('/catalog');                              
                                }
                            }}>
                                    <input className="form-control" placeholder="Поиск" value={searchFieldvalue} onChange={handleChange}/>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        </header>
  );
}

export default Header;