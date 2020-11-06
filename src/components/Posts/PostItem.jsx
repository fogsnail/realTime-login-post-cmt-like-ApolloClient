import { gql, useMutation } from "@apollo/client";
import React, { useState, useRef, useEffect } from "react";
import Moment from "react-moment";
import { ADD_COMMENT, LIKE_POST } from "../../graphqls/mutations";
import Comment from "./Comment";

function PostItem(props) {
  const [addComment] = useMutation(ADD_COMMENT);
  const [setLikePost] = useMutation(LIKE_POST);
  const [commentContent, setCommentContent] = useState("");

  const [postID, setPostID] = useState("");
  const infoUserPost = props.post.owner.email;

  // const [isLiked, setIsLiked] = useState(false);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  function addComments(e) {
    e.preventDefault();
    addComment({
      variables: { commentContent: commentContent, postID: postID },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    setCommentContent("");
  }

  function handleChange(event) {
    setPostID(props.post._id);
    setCommentContent(event.target.value);
  }

  function handleSetLike() {
    setLikePost({ variables: { postID: props.post._id } }).then((res) =>
      console.log(res)
    );
  }

  // function checkDeleteComment(){
  //   var result = false;

  //   props.post.listOfLike.forEach((list, index) => {
  //     // console.log(list._id);
  //     if (list.email === props.infoUser.me.email) return (result = true);
  //   });
  //   return result;
  // }

  function checkLiked() {
    var result = false;
    props.post.listOfLike.forEach((list, index) => {
      // console.log(list._id);
      if (list.email === props.infoUser.me.email) return (result = true);
    });
    return result;
  }

  // console.log(infoUserPost);
  // console.log(props);

  return (
    <div>
      <h6 style={{ marginBottom: "1em" }}>
        {/* Comment Box */}
        <small className="text-muted">
          {/* with Material Design Guidelines */}
        </small>
      </h6>

      <div className="card paper">
        <div>
          <span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/User_icon_1.svg"
              alt="Alps"
              className="post__img-user"
            />
            <span className="post__title">{props.post.owner.profileName}</span>
            <Moment
              className="post__title-time "
              format="h:mm:ss a, dddd, MMMM"
            >
              {props.post.createdAt}
            </Moment>
          </span>
        </div>
        <div className="post__content">
          <h6>{props.post.content}</h6>
        </div>
        <hr></hr>
        <details>
          <summary style={{ padding: "1em" }}>
            {props.post.comments} comments
          </summary>

          <ul className="list-group">
            {props.post.listOfComment.map((comment, index) => (
              <Comment
                key={index}
                comment={comment}
                infoUser={props.infoUser}
                infoUserPost={infoUserPost}
                postID={props.post._id}
              ></Comment>
            ))}
          </ul>
        </details>

        {/* <ul id="lastComment" className="list-group">
            <li className="list-group-item">
              <span className="circle">
                <img
                  src="http://bigbeehive.com/demo/orientplay-angular/img/user/vector4.png"
                  alt="user"
                />
              </span>
              <span className="title">
                <a>
                  Sandra Adams
                  {
                    // props.post.listOfComment[0].owner.profileName
                    // props.post.listOfComment[props.post.comments - 1].owner.profileName
                  }
                </a>
                <time> 6:00 PM</time>
                <p>
                  <a href="#">Peter </a> This is without doubt the
                  greatest  i’ve ever seen.
                </p>
              </span>
              <ul className="list-inline actions" href="#">
                <li>
                  <a className="edit" href="#" title="Edit comment">
                    Edit
                  </a>
                </li>
                <li className="">
                  <a className="delete" href="#" title="Delete comment" />
                </li>
              </ul>
            </li>
          </ul> */}
        <form
          onSubmit={(event) => {
            addComments(event);
          }}
        >
          <fieldset className="form-group">
            <input
              value={commentContent}
              name="comment"
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Add a comment"
              onChange={(event) => handleChange(event)}
            />
          </fieldset>
          <button
            type="submit"
            // onClick={() => addComments()}
            className="btn btn-sm btn-success mr-2"
          >
            Comment
          </button>
          {/* <button type="button" className="btn btn-sm btn-secondary">
            Cancel
          </button> */}
          <span className="post__action" onClick={() => handleSetLike()}>
            <span>{props.post.likes} likes</span>
            {!checkLiked() ? (
              <i className="post__like-icon-empty far fa-heart"></i>
            ) : (
              <i className="post__like-icon-fill fas fa-heart"></i>
            )}
          </span>
        </form>
      </div>
    </div>
  );
}

export default PostItem;
