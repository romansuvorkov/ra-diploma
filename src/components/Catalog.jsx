import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchItems, fetchSearch} from '../actions/actionCreators';
import CatalogSearch from "./CatalogSearch";
import CategoryList from "./CategoryList";
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

function Catalog(props) {
    const { items, loading, error, itemsLength, stopRequest } = useSelector(state => state.itemList);
    const { searchText, searchLoading, searchError } = useSelector(state => state.searchReducer);
    const dispatch = useDispatch();
    const { activeCategoryID } = useSelector(state => state.categoryList);

    React.useEffect(() => {
        if(items.length === 0) {
            dispatch(fetchItems('/items'));           
        }
        // dispatch(fetchItems('/items'));
    }, [dispatch]);

    const handleClick = (event) => {
        event.preventDefault();
        let address = '/items';
        if (activeCategoryID != 999) {
            if (itemsLength >= 6) {
                address = `/items?categoryId=${activeCategoryID}&offset=${itemsLength}`;
            } else {
                address = `/items?categoryId=${activeCategoryID}`;
            }
        } else {
            if (itemsLength >= 6) {
                address = `/items?offset=${itemsLength}`
            } else {
                address = '/items';
            }
        }
        dispatch(fetchItems(address));
    }

    // if (error) {
    //     return <div>
    //                 <p>
    //                     Произошла ошибка во время загрузки каталога. Повторите загрузку
    //                 </p>
    //                 <button className="btn btn-outline-primary" onClick={handleClick}>Try again</button>
    //             </div>
    // }

  return (
        <section className="catalog">
                    <h2 className="text-center">Каталог</h2>

                    {props.catalogPage && <CatalogSearch />}

                    <CategoryList />

                    <div className="row">
                    {items.map(o => (
                        <div key={o.id} className="col-4">
                            <div className="card catalog-item-card">
                                <img src={o.images[0]} className="card-img-top img-fluid" alt={o.title} onError={(e) => {e.target.onerror = null; e.target.src = "https://www.ilmonte.ru/local/templates/ilmonte/img/no_photo.jpg"}}/>
                                <div className="card-body">
                                    <p className="card-text">{o.title}</p>
                                    <p className="card-text">{o.price}</p>
                                    <Link className="btn btn-outline-primary" to={`/catalog/${o.id}`}>Заказать</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                    {loading && <div className="preloader">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>}   
                    
                    {error && <div>
                                <p>
                                    Произошла ошибка во время загрузки каталога. Повторите загрузку
                                </p>
                                <button className="btn btn-outline-primary" onClick={handleClick}>Try again</button>
                              </div>}                       
                    
                    {searchLoading && <div className="preloader">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>}   
                    
                    {searchError && <div>
                                <p>
                                    Произошла ошибка во время поиска на сервере. Повторите попытку
                                </p>
                                <button className="btn btn-outline-primary" onClick={(event) => {
                                    event.preventDefault();
                                    dispatch(fetchSearch(searchText));
                                }}>Try again</button>
                              </div>}                       
                    </div>
                    
                    
                    {!stopRequest && <div className="text-center">
                        <button className="btn btn-outline-primary" onClick={handleClick}>Загрузить ещё</button>
                        {/* <button className="btn btn-outline-primary" onClick={(event) => {
                            event.preventDefault();
                            let address = '/items';
                            if (activeCategoryID != 999) {
                                if (itemsLength >= 6) {
                                    address = `/items?categoryId=${activeCategoryID}&offset=${itemsLength}`;
                                } else {
                                    address = `/items?categoryId=${activeCategoryID}`;
                                }
                            } else {
                                if (itemsLength >= 6) {
                                    address = `/items?offset=${itemsLength}`
                                } else {
                                    address = '/items';
                                }
                            }
                            dispatch(fetchItems(address))}}>Загрузить ещё</button> */}
                    </div>}
                </section>
  );
}

export default Catalog;