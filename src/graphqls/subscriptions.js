import { gql } from "@apollo/client";

export const LIKE_POST_SUB = gql`
  subscription {
    likePostSub {
      likes
      _id
      userLike {
        _id
        profileName
        email
      }
      owner {
        _id
        profileName
        email
      }
      listOfLike {
        _id
        profileName
        email
      }
    }
  }
`;

export const COMMENT_SUB = gql`
  subscription {
    commentSub {
      toPostId
      _id
      owner {
        email
        _id
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
      _id
      owner {
        _id
        profileName
        email
      }
      content
      createdAt
      toPostId
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


export const LIKE_POST_NOTI_SUB = gql`
  subscription LikePostNotiSub($owner: String!){
    likePostNotiSub(owner:$owner){
      userLike{
        _id
        profileName
        email
      }
      owner{
        _id
        profileName
        email
      }
      _id
      likes
      listOfLike{
        _id
        profileName
        email
      }
    }
  } 
`;

export const COMMENT_POST_NOTI_SUB = gql`
  subscription CommentNotiSub($owner: String!){
    commentNotiSub(owner:$owner){
      userComment{
        _id
        profileName
        email
      }
      postID
    }
  } 
`;

export const UPDATE_POST_SUB = gql`
  subscription {
    updatePostSub {
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
`
