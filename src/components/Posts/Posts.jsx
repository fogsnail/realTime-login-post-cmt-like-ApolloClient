import { useQuery } from "@apollo/client";
import React, { Fragment, useEffect } from "react";
import { GET_POST } from "../../graphqls/querys";
import {
  COMMENT_SUB,
  LIKE_POST_SUB,
  ADD_POST_SUB,
  UPDATE_COMMENT_SUB,
  DELETE_COMMENT_SUB,
} from "../../graphqls/subscriptions";
import PostItem from "./PostItem";
import "./style.css";

function Posts(props) {
  const { data, loading, error } = useQuery(GET_POST);
  const { subscribeToMore } = useQuery(GET_POST);

  useEffect(() => {
    subscribeNewLike();
    subscribeNewComment();
    subscribeNewPost();
    subscribeUpdateComment();
    subscribeDeleteComment();
    // test()
  }, []);

  // function test(){
  //   // $(document).ready(function($){    
  //   //   $(window).scroll(function(){
  //   //           console.log("Scroll Fired");
  //   //       });
  //   //   });
    
  //   window.addEventListener('scroll', function() {
  //     var x = document.getElementById("root").style.height;
  //     console.log(x);
  //     console.log(window.pageYOffset + 'px') 
  //   });
  // }

  function subscribeUpdateComment() {
    subscribeToMore({
      document: UPDATE_COMMENT_SUB,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return Object.assign({}, prev, {
          getAllPost: {},
        });
      },
    });
  }

  function subscribeDeleteComment() {
    subscribeToMore({
      document: DELETE_COMMENT_SUB,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return Object.assign({}, prev, {
          getAllPost: {},
        });
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
        return Object.assign({}, prev, {
          getAllPost: {},
        });
      },
    });
  }

  function subscribeNewComment() {
    subscribeToMore({
      document: COMMENT_SUB,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return Object.assign({}, prev, {
          getAllPost: {},
        });
      },
    });
  }

  if (loading) return <p></p>;
  if (error) return <p>Error :(</p>;
  // console.log(data.getAllPost);
  // console.log(data.getAllPost);
  return (
    <Fragment>
      {data.getAllPost.map((post, index) => (
        <PostItem key={index} index={index} post={post} infoUser={props.infoUser}></PostItem>
      ))}
    </Fragment>
  );
}

export default Posts;
