import { useQuery, useSubscription } from "@apollo/client";
import React, { Fragment, useEffect, useState } from "react";
import { GET_POST } from "../../graphqls/querys";
import {
  ADD_POST_SUB,
  COMMENT_SUB,
  DELETE_COMMENT_SUB,
  LIKE_POST_SUB,
  UPDATE_COMMENT_SUB,
  LIKE_POST_NOTI_SUB,
  COMMENT_POST_NOTI_SUB,
  UPDATE_POST_SUB,
} from "../../graphqls/subscriptions";
import PostItem from "./PostItem";
import "./style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure({
  autoClose: 5000,
  draggable: false,
  limit: 5,
  closeOnClick: true,
  pauseOnHover: true,
  hideProgressBar: false,
});

function Posts(props) {
  const { loading, data, error, fetchMore, subscribeToMore } = useQuery(
    GET_POST,
    {
      variables: {
        limit: 5,
      },
    }
  );
  const { data: likePostNotiSub } = useSubscription(LIKE_POST_NOTI_SUB, {
    variables: {
      owner: props.infoUser.me.email,
    },
  });
  const { data: commentNotiSub } = useSubscription(COMMENT_POST_NOTI_SUB, {
    variables: {
      owner: props.infoUser.me.email,
    },
  });

  useEffect(() => {
    subscribeNewLike();
    subscribeNewComment();
    subscribeNewPost();
    subscribeUpdateComment();
    subscribeDeleteComment();
    subscribeUpdatePost();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollPostList);
    return () => {
      window.removeEventListener("scroll", scrollPostList);
    };
  }, [data]);

  useEffect(() => {
    if (likePostNotiSub) {
      if (
        likePostNotiSub.likePostNotiSub.userLike.email !==
        props.infoUser.me.email
      ) {
        toast.info(
          `🦄 ${likePostNotiSub.likePostNotiSub.userLike.profileName} like your post`
        );
      }
    }
  }, [likePostNotiSub]);

  useEffect(() => {
    if (commentNotiSub) {
      console.log(commentNotiSub.commentNotiSub.userComment.email);
      if (
        commentNotiSub.commentNotiSub.userComment.email !==
        props.infoUser.me.email
      ) {
        toast.info(
          `🦄 ${commentNotiSub.commentNotiSub.userComment.profileName} comment your post`
        );
      }
    }
  }, [commentNotiSub]);

  function scrollPostList() {
    const listPost = document.getElementById("post");
    // console.log("scrollY " + window.scrollY);
    // console.log(" innerHeight " + window.innerHeight);
    // console.log(listPost.clientHeight);
    // console.log(listPost.offsetTop);
    console.log(window.scrollY + window.innerHeight);
    console.log(listPost.clientHeight + listPost.offsetTop);
    if (
      window.scrollY + window.innerHeight ===
      listPost.clientHeight + listPost.offsetTop
    ) {
      if (data.getAllPost.data.length < data.getAllPost.totalPost) {
        var id = null;
        if (data) {
          id = data.getAllPost.data[data.getAllPost.data.length - 1]._id;
        }
        fetchMore({
          variables: {
            limit: 2,
            cursor: id,
            // cursor: data.getAllPost[data.getAllPost.length - 1]._id,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            console.log(prev);
            const afterConcat = {
              getAllPost: {
                data: [
                  ...prev.getAllPost.data,
                  ...fetchMoreResult.getAllPost.data,
                ],
                totalPost: fetchMoreResult.getAllPost.totalPost,
              },
            };
            if (!fetchMoreResult) return prev;
            else return afterConcat;
          },
        });
        props.setLoadingPage(true);
        console.log("loading");
      } else {
        props.setLoadingPage(false);
      }
    }
  }
  function subscribeUpdateComment() {
    subscribeToMore({
      document: UPDATE_COMMENT_SUB,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        else {
          var pageIndex = getItemByID(
            prev.getAllPost.data,
            subscriptionData.data.updateCommentSub.toPostId
          );
          var prevPost = JSON.parse(JSON.stringify(prev));
          var newComment = JSON.parse(JSON.stringify(subscriptionData));
          delete newComment.data.updateCommentSub.toPostId;
          if (pageIndex === -1) {
            return prev;
          } else {
            var commentIndex = getItemByID(
              prevPost.getAllPost.data[pageIndex].listOfComment,
              subscriptionData.data.updateCommentSub_id
            );
            prevPost.getAllPost.data[pageIndex].listOfComment[commentIndex] =
              newComment.data.commentSub;
            return { ...prevPost };
          }
        }
      },
    });
  }

  function subscribeDeleteComment() {
    subscribeToMore({
      document: DELETE_COMMENT_SUB,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        console.log(prev);
        console.log(subscriptionData);
        if (!subscriptionData.data) return prev;
        // return Object.assign({}, prev, {
        //   getAllPost: {},
        // });
        else {
          var pageIndex = getItemByID(
            prev.getAllPost.data,
            subscriptionData.data.deleteCommentSub._id
          );
          var prevPost = JSON.parse(JSON.stringify(prev));
          if (pageIndex === -1) {
            return prev;
          } else {
            prevPost.getAllPost.data[pageIndex].comments =
              subscriptionData.data.deleteCommentSub.comments;
            prevPost.getAllPost.data[pageIndex].listOfComment =
              subscriptionData.data.deleteCommentSub.listOfComment;
            return { ...prevPost };
          }
        }
      },
    });
  }

  function subscribeNewPost() {
    subscribeToMore({
      document: ADD_POST_SUB,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return Object.assign({}, prev, {
          getAllPost: {},
        });
      },
    });
  }

  function subscribeNewLike() {
    subscribeToMore({
      document: LIKE_POST_SUB,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        else {
          var indexPage = getItemByID(
            prev.getAllPost.data,
            subscriptionData.data.likePostSub._id
          );
          var prevPost = JSON.parse(JSON.stringify(prev));
          if (indexPage === -1) {
            return prev;
          } else {
            prevPost.getAllPost.data[indexPage].likes =
              subscriptionData.data.likePostSub.likes;
            prevPost.getAllPost.data[indexPage].listOfLike =
              subscriptionData.data.likePostSub.listOfLike;
            console.log(prev);
            return { ...prevPost };
          }
        }
      },
    });
  }

  function subscribeNewComment() {
    subscribeToMore({
      document: COMMENT_SUB,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        console.log(prev);
        console.log(subscriptionData);
        if (!subscriptionData.data) return prev;
        // return Object.assign({}, prev, {
        //   getAllPost: {},
        // });
        else {
          var indexPage = getItemByID(
            prev.getAllPost.data,
            subscriptionData.data.commentSub.toPostId
          );
          var prevPost = JSON.parse(JSON.stringify(prev));
          // var newComment = JSON.parse(JSON.stringify(subscriptionData));
          // delete newComment.data.commentSub.toPostId
          if (indexPage === -1) {
            return prev;
          } else {
            prevPost.getAllPost.data[indexPage].comments += 1;
            prevPost.getAllPost.data[indexPage].listOfComment.push(
              subscriptionData.data.commentSub
            );
            return { ...prevPost };
          }
        }
      },
    });
  }

  function subscribeUpdatePost() {
    subscribeToMore({
      document: UPDATE_POST_SUB,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        console.log(prev);
        console.log(subscriptionData);
        if (!subscriptionData.data) return prev;
        else {
          var pageIndex = getItemByID(
            prev.getAllPost.data,
            subscriptionData.data.updatePostSub._id
          );
          var prevPost = JSON.parse(JSON.stringify(prev));
          // var newComment = JSON.parse(JSON.stringify(subscriptionData));
          // delete newComment.data.commentSub.toPostId
          if (pageIndex === -1) {
            return prev;
          } else {
            prevPost.getAllPost.data[pageIndex] =
              subscriptionData.data.updatePostSub;
            return { ...prevPost };
          }
        }
      },
    });
  }

  function getItemByID(listPage, id) {
    var result = -1;
    listPage.forEach((page, index) => {
      if (page._id === id) {
        result = index;
      }
    });
    return result;
  }

  // if (loading) return <p>Loading</p>;
  // if (error) return <p>Error :(</p>;
  // if (data) console.log(data);
  // console.log(data);
  // console.log(data.getAllPost[data.getAllPost.length - 1]._id);
  // setIdLastPost(data.getAllPost[data.getAllPost.length - 1]._id);
  // if (likePostSub.data){
  //   console.log(likePostSub.data);
  //   data. =
  // }
  return (
    <Fragment>
      {data &&
        data.getAllPost.data.map((post, index) => (
          <PostItem
            // likePostSub={likePostSub.data}
            key={index}
            index={index}
            post={post}
            infoUser={props.infoUser}
            shouldOpenDialog={(postSelected) => {
              props.shouldOpenDialog(postSelected);
            }}
          ></PostItem>
        ))}
    </Fragment>
  );
}

export default Posts;
