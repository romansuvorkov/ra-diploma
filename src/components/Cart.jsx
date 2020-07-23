import React, { useState } from 'react';
import OrderForm from "./OrderForm";
import {useSelector, useDispatch} from 'react-redux';
import {removeItemFromCart} from '../actions/actionCreators';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

function Cart() {

    const { cart } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [ totalPrice, setTotalPrice ] = useState(0);

    let priceSum = 0;

    React.useEffect(() => {
        for (let item of cart) {
            priceSum += item.totalPrice;
            setTotalPrice(priceSum);
        }
    }, [setTotalPrice]);




    return (
        <>
            <section className="cart">
                <h2 className="text-center">Корзина</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                            <th scope="col">Размер</th>
                            <th scope="col">Кол-во</th>
                            <th scope="col">Стоимость</th>
                            <th scope="col">Итого</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(o => (
                            <tr key={o.id}>
                                <th scope="row">1</th>
                                <td><Link to={`/catalog/${o.id}`}>{o.title}</Link></td>
                                <td>{o.size}</td>
                                <td>{o.count}</td>
                                <td>{o.price}</td>
                                <td>{o.totalPrice}</td>
                                <td><button className="btn btn-outline-danger btn-sm" onClick={() => {
                                    dispatch(removeItemFromCart(o.id));
                                    const newSum = totalPrice - o.totalPrice;
                                    setTotalPrice(newSum);
                                }}>Удалить</button></td>
                            </tr>
                        ))}

                        <tr>
                            
                        </tr>
                        <tr>
                            <td colSpan="5" className="text-right">Общая стоимость</td>
                            <td>{totalPrice} руб.</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <OrderForm />
        </>
  );
}

export default Cart;
