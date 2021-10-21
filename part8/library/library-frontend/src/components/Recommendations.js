import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { FAVORITE_GENRE_USER, FIND_BOOKS } from "../utils/queries";

const Recommentations = (props) => {
  const favoriteGenre = useQuery(FAVORITE_GENRE_USER, { skip: !props.token });
  const [getBooks, { loading, data, error }] = useLazyQuery(FIND_BOOKS);

  useEffect(() => {
    if (favoriteGenre.data) {
      getBooks({
        variables: { genre: favoriteGenre.data.me.favoriteGenre.toLowerCase() },
      });
    }
  }, [getBooks, favoriteGenre.data]);

  if (!props.token) {
    return null;
  }
  if (!props.show) {
    return null;
  }

  if (loading) return <p>loading...</p>;
  if (error) return <p>`error: ${error}`</p>;
  return (
    <div>
      <h2> recommendations </h2>
      <p>
        books that match your favorite genre:
        <b> {favoriteGenre.data.me.favoriteGenre.toLowerCase()} </b>
      </p>
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
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommentations;
