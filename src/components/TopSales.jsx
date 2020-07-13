import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchTopSales} from '../actions/actionCreators';

function TopSales() {

  const { items, loading, error } = useSelector(state => state.topSalesList);
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
                  {items.map(o => (
                        <div key={o.id} className="col-4">
                            <div className="card catalog-item-card">
                                <img src={o.images[0]} className="card-img-top img-fluid" alt={o.title} />
                                <div className="card-body">
                                    <p className="card-text">{o.title}</p>
                                    <p className="card-text">{o.price}</p>
                                    <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
                                </div>
                            </div>
                        </div>
                  ))}
                </section>
    </>
  );
}

export default TopSales;
