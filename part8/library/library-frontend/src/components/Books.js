import React from 'react';
import { useQuery } from '@apollo/client';
import { FIND_BOOKS } from '../utils/queries';

const Books = (props) => {
  const { loading, error, data } = useQuery(FIND_BOOKS);

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
          {data.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
