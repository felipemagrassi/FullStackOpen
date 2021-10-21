import { gql } from "@apollo/client";

export const BOOK_COUNT = gql`
  query BookCount {
    bookCount
  }
`;

export const AUTHOR_COUNT = gql`
  query AuthorCount {
    authorCount
  }
`;

export const FIND_BOOKS = gql`
  query findBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      author {
        name
        born
        bookCount
        id
      }
      published
      genres
      id
    }
  }
`;
export const FAVORITE_GENRE_USER = gql`
  query findFavoriteGenre {
    me {
      favoriteGenre
    }
  }
`;
export const FIND_AUTHORS = gql`
  query findAuthors {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;
