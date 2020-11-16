import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import Moment from "react-moment";
import { ADD_COMMENT, LIKE_POST } from "../../graphqls/mutations";
import Comment from "./Comment";

const lengthPost = 60;

function PostItem(props) {
  const [addComment] = useMutation(ADD_COMMENT);
  const [setLikePost] = useMutation(LIKE_POST);
  const [commentContent, setCommentContent] = useState("");
  // const [openComment,setOpenComment] = useState(true)
  const [isAction, setIsAction] = useState(false);
  const [postID, setPostID] = useState("");
  const [isReadMore, setIsReadMore] = useState(false);
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

  function showContent() {
    var contentArr = props.post.content.split(" ");
    var result = {};
    result.content = "";
    result.showMore = false;
    var i;
    for (i = 0; i < contentArr.length; i++) {
      result.content += contentArr[i] + " ";
      if (i === lengthPost) {
        result.showMore = true;
        result.content = result.content + "...";
        break;
      }
    }

    return result;
  }

  function checkEditPost() {
    var result = false;
    // props.me && console.log(props.me.email);
    if (props.infoUser.me.email === props.post.owner.email)
      return (result = true);
    // console.log(result);
    return result;
  }

  // function handleEditPost(id) {
  //   updateComment({
  //     variables: {
  //       commentID: id,
  //       newCommentContent: updateCommentContent,
  //       postID: props.postID,
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  //   props.shouldOpenDialog(id);
  //   console.log(id);
  // }

  return (
    <div>
      <h6 style={{ marginBottom: "1em" }}>
        {/* Comment Box */}
        <small className="text-muted">
          {/* with Material Design Guidelines */}
        </small>
      </h6>

      <div className="card paper">
        <div className="post__header">
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
          <span
            className="header__action"
            onClick={() => setIsAction(!isAction)}
          >
            ...
          </span>

          <div
            className={isAction ? "action__group--show" : "action__group--hide"}
          >
            {checkEditPost() ? (
              <div
                className="action__edit"
                onClick={() => {
                  props.shouldOpenDialog(props.post);
                  setIsAction(!isAction);
                }}
              >
                Edit
              </div>
            ) : (
              ""
            )}
            {checkEditPost() ? <div className="action__edit">Delete</div> : ""}
          </div>
        </div>
        <div className={"post__content"}>
          {!isReadMore ? showContent().content : props.post.content}
        </div>
        <span
          className="content__read-more"
          onClick={() => setIsReadMore(!isReadMore)}
        >
          {showContent().showMore && (!isReadMore ? "Read more" : "Read less")}
        </span>
        <hr></hr>
        <details id={`details-${props.index}`}>
          <summary style={{ padding: "1em" }}>
            {props.post.comments} Comments
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
              onClick={() =>
                (document.getElementById(`details-${props.index}`).open = true)
              }
              // onFocus={()=>
              //   document.getElementById("details").open = true
              // }
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
