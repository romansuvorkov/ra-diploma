import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchTopSales, fetchCatalogItem} from '../actions/actionCreators';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

function TopSales() {

  const { topSales, loading, error } = useSelector(state => state.topSalesList);
  const dispatch = useDispatch();

  React.useEffect(() => {
      dispatch(fetchTopSales());
  }, [dispatch]);

  if (loading) {
      return <div className="preloader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
  }

  if (error) {
      return <div>Something went wrong. Try again</div>
  }

  return (
    <>
                <section className="top-sales">
                  <h2 className="text-center">Хиты продаж!</h2>
                  <div className="row">
                    {topSales.map(o => (
                          <div key={o.id} className="col-4">
                              <div className="card catalog-item-card">
                                  <img src={o.images[0]} className="card-img-top img-fluid" alt={o.title} />
                                  <div className="card-body">
                                      <p className="card-text">{o.title}</p>
                                      <p className="card-text">{o.price}</p>
                                      <Link className="btn btn-outline-primary" to={`/catalog/${o.id}`}>Заказать</Link>
                                  </div>
                              </div>
                          </div>
                    ))}  
                  </div>
                  
                </section>
    </>
  );
}

export default TopSales;
