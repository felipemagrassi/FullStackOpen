import React, { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import { useApolloClient } from '@apollo/client';
import Recommentations from './components/Recommendations';
import { useSubscription } from '@apollo/client';
import { FIND_BOOKS } from './utils/queries';
import { BOOK_ADDED } from './utils/mutations';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState('');

  const client = useApolloClient();
  const updateCache = (addedBook) => {
    const includedIn = (set, object) => {
      set.map((p) => p._id).includes(object._id);
    };
    const dataInStore = client.readQuery({ query: FIND_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: FIND_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) =>
      // console.log(subscriptionData.data.bookAdded)
      updateCache(subscriptionData.data.bookAdded),
  });
  const loggoutUser = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage('authors');
  };

  useEffect(() => {
    const token = localStorage.getItem('user-token');
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={loggoutUser}> loggout </button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors token={token} show={page === 'authors'} />

      <Books show={page === 'books'} />
      <Login setPage={setPage} setToken={setToken} show={page === 'login'} />
      <NewBook updateCache={updateCache} show={page === 'add'} />
      <Recommentations token={token} show={page === 'recommended'} />
    </div>
  );
};

export default App;
