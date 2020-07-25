import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {uploadOrederToServer} from '../actions/actionCreators';

function OrderForm() {

    const { cart } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const { orderLoading, orderError } = useSelector(state => state.cart);

    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [agreement, setAgreement] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const itemsForOrder = cart.map((o) => ({id: o.id, price: o.price, count: o.count}));
        const newOrder = {
            owner: {
                phone: phone,
                address: address,
            },
            items: itemsForOrder
        }

        dispatch(uploadOrederToServer(newOrder));
    }

    const handleChange = (event) => {
        if (event.target.id === 'phone') {
            setPhone(event.target.value);
        } else if (event.target.id === 'address') {
            setAddress(event.target.value);
        }else if (event.target.id === 'agreement') {
            setAgreement(event.target.checked);
        }
    }

    if (orderLoading) {
        return <div className="preloader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
    }

    if (orderError) {
        return <div>
            <p>
            Произошла ошибка во время заказа. Повторите попытку
            </p>
            <button className="btn btn-outline-primary" onClick={handleSubmit}>Try again</button>
        </div>
    }
    return (
        <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card" style={{maxWidth: 30 + 'rem', margin: 0 + ' auto'}}>
                <form className="card-body" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="phone">Телефон</label>
                        <input className="form-control" id="phone" placeholder="Ваш телефон" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Адрес доставки</label>
                        <input className="form-control" id="address" placeholder="Адрес доставки" onChange={handleChange} />
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="agreement" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                    </div>
                        {phone !== '' && address !== '' && agreement !== false && <button type="submit" className="btn btn-outline-secondary">Оформить</button>}
                </form>
            </div>
        </section>
    );
}

export default OrderForm;