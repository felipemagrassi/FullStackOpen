import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { FIND_AUTHORS } from '../utils/queries';
import { CHANGE_BIRTHDATE } from '../utils/mutations';

const Authors = (props) => {
  const { loading, error, data } = useQuery(FIND_AUTHORS);
  const [changeBirthDate] = useMutation(CHANGE_BIRTHDATE);
  const [author, setAuthor] = useState('');
  const [born, setBorn] = useState('');

  if (!props.show) {
    return null;
  }

  if (loading) return <p> Loading.... </p>;

  if (error) return `Error! ${error}`;

  const handleBirthYear = (e) => {
    e.preventDefault();
    changeBirthDate({ variables: { name: author, setBornTo: Number(born) } });

    setBorn('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleBirthYear}>
        <select
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        >
          <option value=''></option>
          {data.allAuthors.map((a) => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          born
          <input
            value={born}
            type='number'
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>Change Author</button>
      </form>
    </div>
  );
};

export default Authors;
