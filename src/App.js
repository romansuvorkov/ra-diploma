import React, { useState } from 'react';
import logo from ".//img/header-logo.png";
import Banner from "./components/Banner";
import MainPage from "./components/MainPage";
import Catalog from "./components/Catalog";
import About from "./components/About";
import Contacts from "./components/Contacts";
import Product from "./components/Product";
import Cart from "./components/Cart";
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import './App.css';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSearch, setSearchText, clearItems} from './actions/actionCreators';

function App() {

    const [searchFieldvalue, setsearchFieldvalue] = useState('');

    const handleChange = (event) => {
        const {value} = event.target;
        console.log(value);
        setsearchFieldvalue(value);
    };
    
    const dispatch = useDispatch();

  return (
    <>
        <Router>
        <header className="container">
        <div className="row">
            <div className="col">
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Bosa Noga" />
                    </Link>

                    <div className="collapase navbar-collapse" id="navbarMain">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
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
                                <form data-id="search-form" className="header-controls-search-form form-inline invisible">
                                    <input className="form-control" placeholder="Поиск" value={searchFieldvalue} onChange={handleChange}/>
                                </form>
                            <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={() => {
                                dispatch(setSearchText(searchFieldvalue));
                                dispatch(fetchSearch(searchFieldvalue));
                                setsearchFieldvalue('');
                                dispatch(clearItems());
                            }}></div>
                                <div className="header-controls-pic header-controls-cart">
                                    <div className="header-controls-cart-full">1</div>
                                    <div className="header-controls-cart-menu"></div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </nav>

            </div>
        </div>
        </header>

    <main className="container">
        <div className="row">
            <div className="col">
                <Banner />
                <Switch>
                    <Route path="/" exact>
                        <MainPage />
                    </Route>
                    {/* <Route exact path="/catalog">
                        <Catalog />
                    </Route> */}
                    <Route exact path="/catalog" component={Catalog} />
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/contacts">
                        <Contacts />
                    </Route>
                    <Route path="/catalog/:id" component={Product} />
                        {/* <Product /> */}
                    {/* </Route> */}
                    <Route path="/cart">
                        <Cart />
                    </Route>
                </Switch>

            </div>
        </div>
    </main>

    <footer className="container bg-light footer">
        <div className="row">
            <div className="col">
                <section>
                    <h5>Информация</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item"><Link to="/about" className="nav-link">О магазине</Link></li>
                        <li className="nav-item"><Link to="/catalog" className="nav-link">Каталог</Link></li>
                        <li className="nav-item"><Link to="/contacts" className="nav-link">Контакты</Link></li>
                    </ul>
                </section>
            </div>
            <div className="col">
                <section>
                    <h5>Принимаем к оплате:</h5>
                        <div className="footer-pay">
                            <div className="footer-pay-systems footer-pay-systems-paypal"></div>
                            <div className="footer-pay-systems footer-pay-systems-master-card"></div>
                            <div className="footer-pay-systems footer-pay-systems-visa"></div>
                            <div className="footer-pay-systems footer-pay-systems-yandex"></div>
                            <div className="footer-pay-systems footer-pay-systems-webmoney"></div>
                            <div className="footer-pay-systems footer-pay-systems-qiwi"></div>
                        </div>
                </section>
                <section>
                    <div className="footer-copyright">2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров.
                        Все права защищены.<br />Доставка по всей России!</div>
                </section>
            </div>
            <div className="col text-right">
                <section className="footer-contacts">
                    <h5>Контакты:</h5>
                        <a className="footer-contacts-phone" href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
                        <span className="footer-contacts-working-hours">Ежедневно: с 09-00 до 21-00</span>
                        <a className="footer-contacts-email" href="mailto:office@bosanoga.ru">office@bosanoga.ru</a>
                        <div className="footer-social-links">
                            <div className="footer-social-link footer-social-link-twitter"></div>
                            <div className="footer-social-link footer-social-link-vk"></div>
                        </div>
                </section>
            </div>
        </div>
    </footer>
    </Router>
    </>
  );
}

export default App;
