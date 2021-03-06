import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchCategories, setActiveCategory} from '../actions/actionCreators';
import {fetchItems, clearItems} from '../actions/actionCreators';


function CategoryList() {

    const { categories, categoryLoading, categoryError, activeCategoryID } = useSelector(state => state.categoryList);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    if (categoryLoading) {
        return <div className="preloader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
    }

    if (categoryError) {
        return <div>
            <p>
            Произошла ошибка во время загрузки категорий. Повторите загрузку
            </p>
            <button className="btn btn-outline-primary" onClick={() => {dispatch(fetchCategories())}}>Try again</button>
        </div>
    }


  return (
    <>
        <ul className="catalog-categories nav justify-content-center">
        {categories.map(o => (
                        <li key={o.id} className="nav-item">
                            <a className={o.id !== activeCategoryID ? "nav-link" : "nav-link active"} href="#" onClick={(event) => {
                                event.preventDefault();
                                if (o.id !== activeCategoryID) {
                                    dispatch(setActiveCategory(o.id))
                                    dispatch(clearItems());
                                    if (o.id !== 999) {
                                        dispatch(fetchItems(`/items?categoryId=${o.id}`));    
                                    } else {
                                        dispatch(fetchItems(`/items`));                                             
                                    }                                    
                                }
                            }}>{o.title}</a>
                        </li>
        ))}
        </ul>

    </>
  );
}

export default CategoryList;