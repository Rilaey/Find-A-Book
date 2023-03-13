import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation SaveBook($title: String, $authors: [String], $description: String, $bookId: ID, $image: String, $link: String) {
  saveBook(title: $title, authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link) {
    _id
  }
}
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $ID) {
      _id
      bookId
      authors
      description
      title
      image
      link
    }
  }
`;
