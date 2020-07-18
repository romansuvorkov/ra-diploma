import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchItems} from '../actions/actionCreators';
import CatalogSearch from "./CatalogSearch";
import CategoryList from "./CategoryList";

function Catalog() {
    const { items, loading, error, itemsLength, stopRequest } = useSelector(state => state.itemList);
    const dispatch = useDispatch();
    const { activeCategoryID } = useSelector(state => state.categoryList);

    React.useEffect(() => {
        dispatch(fetchItems('/items'));
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Something went wrong. Try again</div>
    }

  return (
    <>
        <section className="catalog">
                    <h2 className="text-center">Каталог</h2>

                    <CatalogSearch />

                    <CategoryList />

                    <div className="catalog-item-wrapper">
                    {items.map(o => (
                        <div key={o.id} className="col-4">
                            <div className="card catalog-item-card">
                                <img src={o.images[0]} className="card-img-top img-fluid" alt={o.title} />
                                <div className="card-body">
                                    <p className="card-text">{o.title}</p>
                                    <p className="card-text">{o.price}</p>
                                    <a href="#" className="btn btn-outline-primary">Заказать</a>
                                </div>
                            </div>
                        </div>
                    ))}
                       
                    </div>
                    {!stopRequest && <div className="text-center">
                        <button className="btn btn-outline-primary" onClick={(event) => {
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
                            dispatch(fetchItems(address))}}>Загрузить ещё</button>
                    </div>}
                </section>
    </>
  );
}

export default Catalog;