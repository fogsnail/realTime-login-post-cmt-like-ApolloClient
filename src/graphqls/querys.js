const { gql } = require("@apollo/client");

export const USER = gql`
  {
    me {
      email
      profileName
    }
  }
`;

export const GET_POST_1 = gql`
  query {
    getAllPost {
      data {
        _id
        owner {
          profileName
          _id
          email
        }
        content
        likes
        listOfLike {
          _id
          profileName
          email
        }
        createdAt
        comments
        listOfComment {
          owner {
            _id
            profileName
            email
          }
          content
          createdAt
          _id
        }
      }
      totalPost
    }
  }
`;

export const GET_POST = gql`
  query getAllPost($limit: Float!, $cursor: String) {
    getAllPost(paginationInput: { limit: $limit, cursor: $cursor }) {
      data {
        _id
        owner {
          profileName
          _id
          email
        }
        content
        likes
        listOfLike {
          _id
          profileName
          email
        }
        createdAt
        comments
        listOfComment {
          owner {
            _id
            profileName
            email
          }
          content
          createdAt
          _id
        }
      }
      totalPost
    }
  }
`;
