import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {uploadOrederToServer} from '../actions/actionCreators';

function OrderForm() {

    const { cart } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    // {
    //     "owner": {
    //       "phone": "+7xxxxxxxxxxx",
    //       "address": "Moscow City",
    //     },
    //     "items": [
    //       {
    //         "id": 1,
    //         "price": 34000,
    //         "count": 1
    //       }
    //     ]
    //   }


    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [agreement, setAgreement] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const itemsForOrder = cart.map((o) => ({id: o.id, price: o.price, count: o.count}));
        const newOrder = {
            owner: {
                phone: phone,
                address: address
            },
            items: itemsForOrder
        }
        console.log(newOrder);
        console.log(JSON.stringify(newOrder));

        dispatch(uploadOrederToServer(newOrder));
    }

    const handleChange = (event) => {
        if (event.target.id === 'phone') {
            // console.log(event.target.id);
            setPhone(event.target.value);
            // console.log(phone);
        } else if (event.target.id === 'address') {
            // console.log(event.target.id);
            setAddress(event.target.value);
            // console.log(address);
        }else if (event.target.id === 'agreement') {
            // console.log(event.target.id);
            setAgreement(event.target.checked);
            // console.log(agreement);
        }
    }

    // const { searchText } = useSelector(state => state.searchReducer);
    // const dispatch = useDispatch();


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