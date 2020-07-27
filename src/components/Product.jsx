import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchCatalogItem, addItemToCart} from '../actions/actionCreators';

function Product({ match, history }) {
const { itemInfo, itemInfoLoading, itemInfoError, itemsizes, itemImages } = useSelector(state => state.itemInfo);
const dispatch = useDispatch();
const [count, setCount] = useState(1);
const [selectedSize, setSelectedSize] = useState(null);

React.useEffect(() => {
    dispatch(fetchCatalogItem(match.params.id));
}, [dispatch]);

if (itemInfoLoading) {
    return <div className="preloader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
}

if (itemInfoError) {
    return <div>
                    <p>
                        Произошла ошибка во время загрузки товара. Повторите загрузку
                    </p>
                    <button className="btn btn-outline-primary" onClick={() => {dispatch(fetchCatalogItem(match.params.id))}}>Try again</button>
            </div>
}

const countHandler = (event) => {
    const value = event.target.innerHTML;
    let newCount;
    if (value == '+' && count < 10) {
        newCount = count + 1;
        setCount(newCount);
    } else if (value == '-' && count > 1) {
        newCount = count - 1;
        setCount(newCount);
    }
}

const addToCart = () => {
    const objForCart = {
        id: itemInfo.id,
        title: itemInfo.title,
        size: selectedSize,
        price: itemInfo.price,          
        count: count
    }
    dispatch(addItemToCart(objForCart));
    history.push('/cart');
}

  return (
    <section className="catalog-item">
                    <h2 className="text-center">{itemInfo.title}</h2>
                    <div className="row">
                        <div className="col-5">
                            <img src={itemImages[0]} className="img-fluid" alt={itemInfo.title} onError={(e) => {e.target.onerror = null; e.target.src = "https://www.ilmonte.ru/local/templates/ilmonte/img/no_photo.jpg"}} />
                        </div>
                        <div className="col-7">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>Артикул</td>
                                        <td>{itemInfo.sku}</td>
                                    </tr>
                                    <tr>
                                        <td>Производитель</td>
                                        <td>{itemInfo.manufacturer}</td>
                                    </tr>
                                    <tr>
                                        <td>Цвет</td>
                                        <td>{itemInfo.color}</td>
                                    </tr>
                                    <tr>
                                        <td>Материалы</td>
                                        <td>{itemInfo.material}</td>
                                    </tr>
                                    <tr>
                                        <td>Сезон</td>
                                        <td>{itemInfo.season}</td>
                                    </tr>
                                    <tr>
                                        <td>Повод</td>
                                        <td>{itemInfo.reason}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center">
                                <p>Размеры в наличии: 
                                    {itemsizes.map(o => (
                                        o.avalible && selectedSize === o.size && <span className="catalog-item-size selected" key={o.size} onClick={() => 
                                            {setSelectedSize(o.size)}
                                        }>{o.size}</span>
                                        ||
                                        o.avalible && selectedSize !== o.size && <span className="catalog-item-size" key={o.size} onClick={() => 
                                            {setSelectedSize(o.size)}
                                        }>{o.size}</span>
                                    ))}
                                </p>
                                <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                        <button className="btn btn-secondary" onClick={countHandler}>-</button>
                                        <span className="btn btn-outline-primary">{count}</span>
                                        <button className="btn btn-secondary" onClick={countHandler}>+</button>
                                    </span>
                                </p>
                            </div>
                            {selectedSize && <button className="btn btn-danger btn-block btn-lg" onClick={addToCart}>В корзину</button>}
                        </div>
                    </div>
                </section>
  );
}

export default Product;