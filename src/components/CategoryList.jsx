import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchCategories} from '../actions/actionCreators';


function CategoryList() {

    const { categories, categoryLoading, categoryError } = useSelector(state => state.categoryList);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    if (categoryLoading) {
        return <div>Loading...</div>
    }

    if (categoryError) {
        return <div>Something went wrong. Try again</div>
    }


  return (
    <>
        <ul className="catalog-categories nav justify-content-center">
        {categories.map(o => (
                        <li className="nav-item">
                            <a className="nav-link active" href="#">{o.title}</a>
                        </li>
        ))}
        </ul>

    </>
  );
}

export default CategoryList;