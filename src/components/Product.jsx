import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

function Product() {

const { itemInfo, itemInfoLoading, itemInfoError } = useSelector(state => state.itemInfo);
const dispatch = useDispatch();

if (itemInfoLoading) {
    return <div>Loading...</div>
}

if (itemInfoError) {
    return <div>Something went wrong. Try again</div>
}

  return (
    <section className="catalog-item">
                    <h2 className="text-center">{itemInfo.title}</h2>
                    <div className="row">
                        <div className="col-5">
                            <img src={itemInfo.images[0]}
                                className="img-fluid" alt={itemInfo.title} />
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
                                    {itemInfo.sizes.map(o => (
                                        o.avalible && <span className="catalog-item-size">{o.size}</span>
                                    ))}
                                </p>
                                <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                        <button className="btn btn-secondary">-</button>
                                        <span className="btn btn-outline-primary">1</span>
                                        <button className="btn btn-secondary">+</button>
                                    </span>
                                </p>
                            </div>
                            <button className="btn btn-danger btn-block btn-lg">В корзину</button>
                        </div>
                    </div>
                </section>
  );
}

export default Product;