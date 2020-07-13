import React, { useState, useEffect } from 'react';
// import PostsContext from './PostsContext';

export default function DataContext(props) {
    const [items, setItems] = useState([]);
    const [topSales, setTopSales] = useState([]);
    const [category, setCategory] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(null);
    const { REACT_APP_POSTS_URL } = process.env;

    const loadFromServer = () => {
        fetch(`${REACT_APP_POSTS_URL}/posts`)
        .then(response => response.json())
        .then(posts => {
          setPosts(posts);
        });
    };

    useEffect(loadFromServer, []);

    const uploadToServer = ({ id = 0, content }) => {
        fetch(`${REACT_APP_POSTS_URL}/posts`, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          method: 'POST',
          body: JSON.stringify({ id, content }),
        })
        .then(loadFromServer);
    }

    const deleteFromServer = (id) => {
      fetch(`${REACT_APP_POSTS_URL}/posts/${id}`, {
        method: 'DELETE'
      })
      .then(loadFromServer);
  }

    return (
        <DataContext.Provider value={{posts, uploadToServer, deleteFromServer }}>
            {props.children}
        </DataContext.Provider>
    )
}