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
mutation SaveBook($link: String, $image: String, $bookId: ID, $title: String, $description: String, $authors: [String]) {
  saveBook(link: $link, image: $image, bookId: $bookId, title: $title, description: $description, authors: $authors) {
    _id
    bookCount
    email
    username
    savedBooks {
      title
      link
      description
      image
      bookId
      authors
    }
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
