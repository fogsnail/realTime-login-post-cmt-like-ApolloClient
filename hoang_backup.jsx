import { useQuery, useSubscription } from "@apollo/client";
import React, { Fragment, useEffect, useState } from "react";
import { GET_POST } from "../../graphqls/querys";
import {
  ADD_POST_SUB,
  COMMENT_SUB,
  DELETE_COMMENT_SUB,
  LIKE_POST_SUB,
  UPDATE_COMMENT_SUB,
} from "../../graphqls/subscriptions";
import PostItem from "./PostItem";
import "./style.css";

function Posts(props) {
  const { loading, data, error, fetchMore, subscribeToMore } = useQuery(
    GET_POST,
    {
      variables: {
        limit: 2,
        // cursor: null,
      },
    }
  );

  // const { subscribeToMore } = useQuery(GET_POST);
  const [idLastPost, setIdLastPost] = useState(null);
  const likePostSub = useSubscription(LIKE_POST_SUB);
  // const {
  //   data: { likePostSub },
  // } = useSubscription(LIKE_POST_SUB);

  useEffect(() => {
    subscribeNewLike();
    subscribeNewComment();
    subscribeNewPost();
    subscribeUpdateComment();
    subscribeDeleteComment();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollPostList);
    return () => {
      window.removeEventListener("scroll", scrollPostList);
    };
  }, [data]);

  function scrollPostList() {
    const listPost = document.getElementById("post");
    // console.log("scrollY " + window.scrollY);
    // console.log(" innerHeight " + window.innerHeight);
    // console.log(listPost.clientHeight);
    // console.log(listPost.offsetTop);
    // console.log(window.scrollY + window.innerHeight);
    // console.log(listPost.clientHeight + listPost.offsetTop);
    if (
      window.scrollY + window.innerHeight + 8 ===
      listPost.clientHeight + listPost.offsetTop
    ) {
      var id = null;
      if (data) {
        id = data.getAllPost.data[data.getAllPost.data.length - 1]._id;
      }
      console.log(id);
      fetchMore({
        variables: {
          limit: 5,
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
      // props.setLoadingPage();
      console.log("loading");
    }
  }

  function subscribeUpdateComment() {
    subscribeToMore({
      document: UPDATE_COMMENT_SUB,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        console.log(prev);
        console.log(subscriptionData);
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
        console.log(prev);
        console.log(subscriptionData);

        if (!subscriptionData.data) return prev;
        return Object.assign({}, prev, {
          // getAllPost: {},
        });

        // else {
        //   var indexPage = getItemByID(
        //     prev.getAllPost.data,
        //     subscriptionData.data.likePostSub._id
        //   );
        //   var prevPost = JSON.parse(JSON.stringify(prev));
        //   prevPost.getAllPost.data[indexPage].likes =
        //     subscriptionData.data.likePostSub.likes;
        //   prevPost.getAllPost.data[indexPage].listOfLike =
        //     subscriptionData.data.likePostSub.listOfLike;
        //   console.log(prev);
        //   console.log(prevPost);

        //   return { ...prevPost };
        // }
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
        return Object.assign({}, prev, {
          getAllPost: {},
        });
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
  // console.log(data);
  return (
    <Fragment>
      {data &&
        data.getAllPost.data.map((post, index) => (
          <PostItem
            likePostSub={likePostSub.data}
            key={index}
            index={index}
            post={post}
            infoUser={props.infoUser}
          ></PostItem>
        ))}
    </Fragment>
  );
}

export default Posts;
