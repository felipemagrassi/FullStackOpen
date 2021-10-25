import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_BOOKS } from '../utils/queries';
const Books = (props) => {
  const { loading, error, data } = useQuery(FIND_BOOKS);
  const [filter, setFilter] = useState('');
  const uniqueGenres = data
    ? [
        ...new Set(
          []
            .concat(...data.allBooks.map((items) => items.genres))
            .map((a) => a.toLowerCase())
        ),
      ]
    : null;
  if (!props.show) {
    return null;
  }

  if (loading) return <p> Loading </p>;
  if (error) return `Error: ${error}`;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks
            .filter((b) => (filter === '' ? b : b.genres.includes(filter)))
            .map((a) => (
              <tr key={a._id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {uniqueGenres.map((a, idx) => (
          <button key={idx} onClick={() => setFilter(a)}>
            {a}
          </button>
        ))}
        <button onClick={() => setFilter('')}> all genres </button>
      </div>
    </div>
  );
};

export default Books;
