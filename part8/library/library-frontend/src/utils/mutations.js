import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`;

export const CHANGE_BIRTHDATE = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
      id
    }
  }
`;

export const LOGIN = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
