import { gql } from "@apollo/client";

export const LIKE_POST_SUB = gql`
  subscription {
    likePostSub {
      likes
      _id
    }
  }
`;

export const COMMENT_SUB = gql`
  subscription {
    commentSub {
      owner {
        email
      }
      content
      createdAt
    }
  }
`;

export const UPDATE_COMMENT_SUB = gql`
  subscription {
    updateCommentSub {
      owner {
        _id
        profileName
      }
    }
  }
`;

export const DELETE_COMMENT_SUB = gql`
  subscription {
    deleteCommentSub {
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
        _id
        owner {
          _id
          profileName
          email
        }
        content
        createdAt
      }
    }
  }
`;

export const ADD_POST_SUB = gql`
  subscription {
    createPostSub {
      _id
      owner {
        _id
        profileName
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
        _id
        owner {
          _id
          profileName
          email
        }
        content
        createdAt
      }
    }
  }
`;
