import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSearch, setSearchText, clearItems} from '../actions/actionCreators';

function CatalogSearch() {

  const { searchText } = useSelector(state => state.searchReducer);
  const dispatch = useDispatch();
  const [searchFieldvalue, setsearchFieldvalue] = useState(searchText);

    const handleChange = (event) => {
        const {value} = event.target;
        console.log(value);
        setsearchFieldvalue(value);
    };

  return (
    <>
        <form className="catalog-search-form form-inline" onSubmit={(event) => {
          event.preventDefault();
          dispatch(setSearchText(searchFieldvalue));
          dispatch(fetchSearch(searchFieldvalue));
          dispatch(clearItems());          
        }}>
            <input className="form-control" placeholder="Поиск" value={searchFieldvalue} onChange={handleChange}/>
        </form>
    </>
  );
}

export default CatalogSearch;