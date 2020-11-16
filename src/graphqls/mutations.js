import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LogIn($email: String!, $password: String!) {
    logIn(data: { email: $email, password: $password }) {
      isSuccess
      jwt
      message
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation {
    logout {
      isSuccess
      message
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      data: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      isSuccess
      message
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($post: String!) {
    createPost(data: { postContent: $post }) {
      isSuccess
      message
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($commentContent: String!, $postID: String!) {
    addComment(data: { commentContent: $commentContent, postID: $postID }) {
      isSuccess
      message
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment(
    $commentID: String!
    $newCommentContent: String!
    $postID: String!
  ) {
    updateComment(
      data: {
        commentID: $commentID
        newCommentContent: $newCommentContent
        postID: $postID
      }
    ) {
      isSuccess
      message
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($commentID: String!, $postID: String!) {
    deleteComment(data: { commentID: $commentID, postID: $postID }) {
      isSuccess
      message
    }
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($postID: String!) {
    likePost(postID: $postID) {
      isSuccess
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($postID: String!, $newPostContent: String!){
    updatePost(data:{postID:$postID,newPostContent:$newPostContent}){
      isSuccess
      message
    }
  }
`
